'''
API that makes it possible to interact
with Wekinator.
'''
from sense_hat import SenseHat
from flask import Flask, request, jsonify
from flask_cors import CORS
import tests

sense = SenseHat()
app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Server Online."

@app.route('/test')
def run_tests():
	tests.matrix()
	return "Running tests"

@app.route('/clear')
def clear():
    sense.clear()
    return "Cleared sense hat"

@app.route('/settings')
def settings():
    if request.args:
        low_light = request.args.get('low_light')
        sense.low_light = bool(low_light)
        return "Set light mode."
    else:
        return "No query string received. I want a boolean, ex: 'http://192.168.0.24/settings?low_light=1'", 200

@app.route('/color')
def set_color():
    if request.args:
        args = request.args.to_dict()
        sense.clear(int(args["r"]), int(args["g"]), int(args["b"]))
        return args
    else:
        return "No query string received. Try something like 'http://192.168.0.24/color?r=120&g=120&b=255'.", 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=443, ssl_context=('cert.pem', 'key.pem')) # port 443 for https
