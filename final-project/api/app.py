# Import python modules
from flask import Flask, jsonify, request
import os
import json
import uuid
from flask_cors import CORS, cross_origin
import pandas

# Define app
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

# DEFINE CONSTANTS
STATIC_DIR = "static"
CURRENT_DATASET = 'titanic.csv'
MAX_BOUND_OFFSET = 10

df = pandas.read_csv(os.path.join('static', 'datasets', CURRENT_DATASET))

@cross_origin()
@app.route("/dataset/columns", methods=['GET'])
def get_dataset_columns():
    columns = list(df.columns)

    res = {
        'columns': columns
    }

    return jsonify(res)


@cross_origin()
@app.route("/dataset/generate/data/counts/bar", methods=['GET'])
def get_dataset_bar_counts_data():
    column_of_interest = request.args.get('column')

    column_df = df[column_of_interest]
    vc = column_df.value_counts()
    labels = convert_list_to_strings(list(vc.keys()))
    series = get_series_from_value_counts(vc)


    res = {
        "graphData": {
            "filename": CURRENT_DATASET,
            "columnOfInterest": column_of_interest,
            "labels": labels,
            "series": series
        },
        "maxBound": max(series[0]) + MAX_BOUND_OFFSET,
        "minBound": 0
    }

    return jsonify(res)

@cross_origin()
@app.route("/dataset/generate/data/counts/pie", methods=['GET'])
def get_dataset_pie_counts_data():
    column_of_interest = request.args.get('column')

    column_df = df[column_of_interest]
    vc = column_df.value_counts()
    # labels = convert_list_to_strings(list(vc.keys()))
    series = get_pie_series_from_value_counts(vc)


    res = {
        "graphData": {
            "filename": CURRENT_DATASET,
            "columnOfInterest": column_of_interest,
            "series": series
        }
    }

    return jsonify(res)

@cross_origin()
@app.route("/dataset/generate/data/bar", methods=['GET'])
def get_dataset_bar_data():
    data = request.json

    columns_of_interest = list(data['columns'])

    column_df = df[columns_of_interest]



    print(column_df[:3])

    res = {
        "data": "test"
    }

    return jsonify(res)

@cross_origin()
@app.route("/", methods=['POST'])
def index():
    file = request.files['file']
    # filename = request.json['filename']

    message = {
        "Message": f'Recieved file: {file.filename}'
    }

    return jsonify(message)


def convert_list_to_strings(ls):
    new_ls = []
    for item in ls:
        new_ls.append(str(item))

    return new_ls

def get_series_from_value_counts(vc):
    series = []
    for key in vc.keys():
        series.append(int(vc[key]))

    return [series]

def get_pie_series_from_value_counts(vc):
    series = []

    vals = list(vc.values)

    value_sum = sum(vals)

    for key in vc.keys():
        series.append({
            "value": round((vc[key]/value_sum)*10),
            "name": key
        })

    return series

if __name__ == "__main__":
    app.run(host="0.0.0.0")
