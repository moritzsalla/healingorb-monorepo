# Protocols

## Wekinator/API middleman

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

## Flask