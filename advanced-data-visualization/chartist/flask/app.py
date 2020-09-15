import werkzeug
werkzeug.cached_property = werkzeug.utils.cached_property

from flask import Flask, jsonify, request, render_template
import matplotlib.pyplot as plt
from functools import reduce
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('timeline.csv', skiprows=1)
df.columns = ['month', 'diet', 'gym', 'finance']

@app.route('/getdata', methods=['GET'])
def getdata():
    ls_year = request.args.getlist('years')
    ls_col = request.args.getlist('columns')

    print(f'Years: {ls_year}')
    print(f'Columns: {ls_col}')

    df_new = df[(reduce(lambda a, b: a | b, (df['month'].str.contains(s) for s in ls_year)))][['month'] + ls_col]

    df_new['month'] = pd.to_datetime(df_new['month'])
    df_new = df_new.sort_values(by=['month'])

    return jsonify(df_new.to_json())

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)