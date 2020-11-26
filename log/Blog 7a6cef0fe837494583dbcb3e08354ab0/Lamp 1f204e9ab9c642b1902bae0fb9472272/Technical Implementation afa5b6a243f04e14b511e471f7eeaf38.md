# Technical Implementation

![Technical%20Implementation%20afa5b6a243f04e14b511e471f7eeaf38/Artboard.png](Technical%20Implementation%20afa5b6a243f04e14b511e471f7eeaf38/Artboard.png)

![Technical%20Implementation%20afa5b6a243f04e14b511e471f7eeaf38/Artboard_Copy.png](Technical%20Implementation%20afa5b6a243f04e14b511e471f7eeaf38/Artboard_Copy.png)

## Raspberry Pi

> Raspberry Pi is a series of small single-board computers developed in the United Kingdom by the Raspberry Pi Foundation in association with Broadcom. Early on, the Raspberry Pi project leaned towards the promotion of teaching basic computer science in schools and in developing countries.

Most importantly, it has wifi connectivity, which allows me to prototype my interaction. Wireless connectivity was a prerequisite.

My final code provides a flask server which lets you communicate between browsers within your local network and the sense-hat. It can be used for visualizing data. In order to maintain a modular interface, the API end–points provide no functionality beyond that of the sensehat's. All processing should therefore be done on the client side.

![../Concept%20fc6eb739cd9f4790936dce69f4e4d18b/Revised%20Concept%20e953a60309ab4265b102f3d7eb668f5a/Screenshot_2020-10-18_at_19.24.37.png](../Concept%20fc6eb739cd9f4790936dce69f4e4d18b/Revised%20Concept%20e953a60309ab4265b102f3d7eb668f5a/Screenshot_2020-10-18_at_19.24.37.png)

## SenseHat

![Technical%20Implementation%20afa5b6a243f04e14b511e471f7eeaf38/Untitled.png](Technical%20Implementation%20afa5b6a243f04e14b511e471f7eeaf38/Untitled.png)

> The Sense HAT is an add-on board for Raspberry Pi, made especially for the Astro Pi mission – it launched to the International Space Station in December 2015.

The Sense HAT has an **8×8 RGB LED matrix**, a five-button joystick and includes the following sensors:
- Gyroscope
- Accelerometer
- Magnetometer
- Temperature
- Barometric pressure
- Humidity

The SenseHat has myriad of features. I will mainly be using the LED matrix, which is pretty easy thanks to the SenseHat's python library.

[Sense HAT](https://pythonhosted.org/sense-hat/)

```bash
from sense_hat import SenseHat
from time import sleep

sense = SenseHat()

red = (255, 0, 0)

sense.clear()  # no arguments defaults to off
sleep(1)
sense.clear(red)  # passing in an RGB tuple
sleep(1)
sense.clear(255, 255, 255)  # passing in r, g and b values of a colour
```

## Flask

[Welcome to Flask - Flask Documentation (1.1.x)](https://flask.palletsprojects.com/en/1.1.x/)

> Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions.

```python
@app.route('/myroute')
	def my_function():
	  print("hello world")
```

```python
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
```

Needs https certificate! Since this is self issued, browsers will block requests. Typing **thisisunsafe** this in chrome will bypass the error.

## Docker

After having weeks of trouble with conflicting python versions, I decided to learn Docker.

> Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels.

My final docker file, after days of tweaking. This will install the software I need on and Raspberry Pi using OS-level virtualisation, regardless of installed software.

```bash
$ sudo apt-get update \
      && apt-get install --no-install-recommends --no-install-suggests -y \
      ca-certificates \
      curl \
      python3-numpy \
      python3-pil \
      python3-pip

$ curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/librtimulib-dev_7.2.1-3_armhf.deb \
      && curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/librtimulib-utils_7.2.1-3_armhf.deb \
      && curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/librtimulib7_7.2.1-3_armhf.deb \
      && curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/python3-rtimulib_7.2.1-3_armhf.deb \
      && curl -LO https://archive.raspberrypi.org/debian/pool/main/p/python-sense-hat/python3-sense-hat_2.2.0-1_armhf.deb
$ dpkg -i \
      librtimulib-dev_7.2.1-3_armhf.deb \
      librtimulib-utils_7.2.1-3_armhf.deb \
      librtimulib7_7.2.1-3_armhf.deb \
      python3-rtimulib_7.2.1-3_armhf.deb \
      python3-sense-hat_2.2.0-1_armhf.deb

# cleanup
$ sudo rm -f *.deb \
      && apt-get clean \
      && sudo rm -rf /var/lib/apt/lists/*

$ pip3 install sense-hat flask flask-cors
```

# Tryouts that never made the cut

## Wekinator/API middleman

An api that receives data and sends it to Wekinator.

### OSC module

OpenSoundControl implementation (in Pure Python), based (somewhat) on the good old 'SimpleOSC' implementation by Daniel Holth & Clinton McChesney. Stock, V2_Lab, Rotterdam, 2008.

### API.py

```python
# API provider: openweathermap.org
# Find your coordinates here: latlong.net

import requests
import json

def fetch():
      api_key = "27cae45daf4cddb44b8982c70c14848a"
      lat = "48.208176"
      lon = "16.373819"
      url = (
      "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=metric"
      % (lat, lon, api_key)
      )

      response = requests.get(url)
      data = json.loads(response.text)
      val = data["current"]["temp"]

      return val
```

### main.py

```python
""" sending OSC with pyOSC
https://trac.v2.nl/wiki/pyOSC
example by www.ixi-audio.net based on pyOSC documentation
"""
# Modified for Wekinator by Rebecca Fiebrink

"""
note that if there is nobody listening in the other end we get an error like this
    OSC.OSCClientError: while sending: [Errno 111] Connection refused
so we need to have an app listening in the receiving port for this to work properly

this is a very basic example, for detailed info on pyOSC functionality check the OSC.py file 
or run pydoc pyOSC.py. you can also get the docs by opening a python shell and doing
>>> import OSC
>>> help(OSC)
"""

import OSC
import time, random
from api import fetch

print "*******"
print "This program sends 3 random inputs to Wekinator every second."
print "Default is port 6448, message name /wek/inputs"
print "If Wekinator is not already listening for OSC, we will get an error."
print "*******"

send_address = '127.0.0.1', 6448

# OSC basic client
c = OSC.OSCClient()
c.connect( send_address ) # set the address for all following messages

# lets try sending a different random number every frame in a loop
try :    
    while 1: # endless loop
        rNum = OSC.OSCMessage()
        rNum.setAddress("/wek/inputs")

        val = fetch()
        rNum.append(val)
        c.send(rNum)

        print "Sent value: "
        print val
        time.sleep(3600) # wait one hour

except KeyboardInterrupt:
    print "Closing OSCClient"
    c.close()
    print "Done"
```

## Firebase/node.js client

Task runner that fetches data from Firebase and sends it to Wekinator through OSC.

```jsx
"use strict";

var Wekinator = require("wekinator");
var repl = require("repl");
var firebase = require("firebase");

// firebase setup -----------------------

const config = {
  apiKey: "AIzaSyD5jY_aH8tw6aeZws45BPxcBRRTjyZ6yhU",
  authDomain: "sentiment-ml.firebaseapp.com",
  databaseURL: "https://sentiment-ml.firebaseio.com/",
};
firebase.initializeApp(config);

const database = firebase.database();

// -----------------------

setInterval(() => run(), 5000);

let data = [];

function run() {
  firebase
    .database()
    .ref("/sentiment/")
    .once("value")
    .then(function (snapshot) {
      const entry = snapshot.val();

      console.log("Fetching results…");

      Object.keys(entry).forEach((key) => {
        console.log(entry[key].value);
        data = {
          inputs: 1,
          outputs: new Array(...entry[key].value),
        };
      });

      console.log("Finished fetching results");
    });
}

console.log(data);

// -----------------------

// var wn = new Wekinator();

// // Connect to Wekinator
// wn.connect(function () {
//   // Register a handler for messages from Wekinator
//   wn.on("osc", function (a) {
//     // When we recieve a message from Wekinator, log it
//     console.log(a);
//   });

//   // Send the data to Wekinator for training
//   wn.trainOnData(data);
//   // Delay running to wait for training
//   setTimeout(function () {
//     // Start running our model
//     wn.startRunning();
//     for (let i = 0; i < 5; i++) {
//       // Send an input to Wekinator so we get sent an output
//       wn.inputs([i / 5]);
//     }
//     // Once the inputs are sent, stop running the model
//     wn.stopRunning();
//     // Close our socket connection to Wekinator
//     wn.disconnect();
//   }, 200);
// });
```