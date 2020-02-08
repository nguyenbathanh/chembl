import json
import os.path
from flask import render_template, jsonify
from flask import Flask

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/activities')
def activities():
    file_path = 'data/activities.json'
    if not os.path.isfile(file_path):
        return jsonify([])

    data = json.load(open(file_path))
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5009, threaded=True)
