from flask import Flask, render_template, request
from wtforms import Form, FloatField, validators
import math

app = Flask(__name__)

def compute(num):
	return math.sin(num)

# Model
class InputForm(Form):
    r = FloatField(validators=[validators.InputRequired()])

# View
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = InputForm(request.form)
    if request.method == 'POST' and form.validate():
        r = form.r.data
        s = compute(r)
        return render_template("index.html", form=form, s=s)
    else:
        return render_template("index.html", form=form)

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == "__main__":
	app.run(debug=True)