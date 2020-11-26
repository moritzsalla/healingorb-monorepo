# Technical Implementation

I am keeping the processing and animation strictly to the client (browser) side to reduce complexity. Prototyping on the flask server is very slow since I must resort to Docker containers. Also, I have more experience with javascript and the browser. Computationally, however, it is better to perform any calculation on the server-side, as the internet connection may lag, and request can jam the API. It is not optimal to animate by sending queries to an API, as the API cannot keep up with 60fps (the speed at which the animation becomes smooth to the human eye). However, as the colour easing is set to be incredibly slow, this is not a problem.

## Pre-trained Models

### TensorFlow Core Sentiment

An example model provided by TensorFlow. It is trained on the large IMDB movie review dataset, and is used by the ml5 library.

**Source**

[Text classification with an RNN | TensorFlow Core](https://www.tensorflow.org/tutorials/text/text_classification_rnn)

**Tryout**

I have created a website that uses ml5 to predict sentiment and displays it to the DOM. It is helpful for quickly testing sentences for prediction accuracy. Ml5 is very easy to implement, but documentation is lacking for custom models.

[ml5 - Sentiment](https://sentiment-utils.vercel.app)

[ml5js·Friendly Machine Learning For The Web](https://ml5js.org/reference/api-Sentiment/)

### TensorFlow Core Toxicity

[tensorflow/tfjs-models](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)

**Tryout in the browser**

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.13.45.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.13.45.png)

The Running it on an obscene Trump tweet, however, returns false negatives: 

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.14.32.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.14.32.png)

**Feedback Rebecca**

There are problems surrounding toxicity analysis and cultural context. Here is a *Wired* article that highlights some difficulties:

[Drag Queen vs. David Duke: Whose Tweets Are More 'Toxic'?](https://www.wired.com/story/drag-queens-vs-far-right-toxic-tweets/)

I found a scientific study that compares the accuracy of several sentiment analysis models:

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-25_at_23.53.24.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-25_at_23.53.24.png)

[report.pdf](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/report.pdf)

### Google Cloud API Sentiment Analysis

Google cloud is a payed service. Their API is meant for the backend (node.js) and won't run on browsers. This is probably due to credentials. There are workarounds, but they are wonky.

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-11_at_15.57.28.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-11_at_15.57.28.png)

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-15_at_12.40.33.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-15_at_12.40.33.png)

## Transfer Learning

A pre-trained model can be adapted using a technique called transfer learning. Rebecca and Vitek both pointed out that it is computationally effective, as it doesn't require to train an entire model. Also, it requires a much smaller dataset. This is what machine learning based suggestion algorithms use for predictions when little user data is available. I never went into using this technique, but it looks promising.

[Transfer learning and fine-tuning | TensorFlow Core](https://www.tensorflow.org/tutorials/images/transfer_learning)

## Porting a self-trained model to tensorflow.js

### Saving a model

```python
#### python -- tensorflow
import tensorflowjs as tfjs

# load model
model = tf.keras.models.load_model('model/saved_model.h5')

# save model
model.save("saved_model.h5")
model.save("saved_model") # as pb

# summarize model
model.summary()

# print out layers
for layer in model.layers:
	print(layer.weights)

# save as js model
tfjs.converters.save_keras_model(model, 'js/model/')
```

### Loading a model

```jsx
// javascript -- tensorflow.js
(async () => {
  const model = await tf.loadLayersModel('model/model.json', false);
  model.summary();
})();
```

The model I was trying to load might have lacked API to do this properly.

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-25_at_23.47.00.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-25_at_23.47.00.png)

**Save as layered or graph model?**

```jsx
// Layered model
let model = await tf.loadLayersModel(model);

// Graph model
let model = await **tf.loadGraphModel**(model, { strict: true });

const prediction = model.predict('Some sentence');
```

## Chrome Storage

Every bit of data within the chrome extension is stored and exchanged via the chrome storage. As some features of a browser extension are sandboxed, this is the only way to communicate. The API is fairly simple. There is even an option to synchronise storage with mobile browsers, which is nice to concider for a combined measurement.

[chrome.storage](https://developer.chrome.com/extensions/storage)

```jsx
chrome.storage.local.set({key: value}, function() {
	console.log('Value is set to ' + value);
});
      
chrome.storage.local.get(['key'], function(result) {
	console.log('Value currently is ' + result.key);
});
```

## Animation

The visualisation is calculated using the average of last 10 websites.

### Mapping between color values

```tsx
// Adaptation of p5.js's map function
function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
```

```jsx
// mapping from one color value to the other
let outR = Math.round(map(c, 0, 1, min.r, max.r));
let outG = Math.round(map(c, 0, 1, min.g, max.g));
let outB = Math.round(map(c, 0, 1, min.b, max.b));
```

### Easing

Taken from this p5js example: 

[examples | p5.js](https://p5js.org/examples/input-easing.html)

```jsx
// an adaptation of this p5.js example

let x = 1;
let y = 1;
let easing = 0.05;

function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(237, 34, 93);
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

  ellipse(x, y, 66, 66);
}
```

### Final Code

```jsx
// final code
setInterval(function () {
  chrome.storage.local.get(["score"], (result) => {
    **let history = 10;

    if (result.score.constructor === Array && result.score.length > history) {
      // calculate avg from last 10 entries
      let val = 0;

      for (let i = 1; i <= history; i++) {
        val += result.score[result.score.length - i];
        console.log(
          "value " + i + ": " + result.score[result.score.length - i]
        );
      }
      val /= history;**

      console.log("average: " + val);

      // easing
      let dist = val - c;
      c += dist * easing;

      // map normalized color vals to rgb range: 0-255
      const { min, max } = col;
      let outR = Math.round(map(c, 0, 1, min.r, max.r));
      let outG = Math.round(map(c, 0, 1, min.g, max.g));
      let outB = Math.round(map(c, 0, 1, min.b, max.b));

      // sensehat doesnt display colors under val of 8
      if (outR < 8) outR = 8;
      if (outG < 8) outG = 8;
      if (outB < 8) outB = 8;

      // send to sensehat only when vals update
      if (oldOutR !== outR && oldOutG !== outG && oldOutB !== outB) {
        // console.log(outR, outG, outB);
        Sense.setColor(outR, outG, outB);
      }

      oldOutR = outR;
      oldOutG = outR;
      oldOutB = outR;

      // tests
      colorTest(outR);
      colorTest(outG);
      colorTest(outB);
    }
  });
}, 500);
```

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-15_at_17.14.39.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-15_at_17.14.39.png)

### **Comparing different sentiment analysis on tweets:**

## UI Functionality

The chrome extension contains a popup which can be activated by clicking the icon in the taskbar. This will show users the newest sentiment reading, and give them the option to manually set the Healing Orb's color pallet. It also provides users with the opportunity to reset the data.

In order for settings to be persistent, they have to be save to the chrome storage.

Functionality includes:

- An animated speedometer (which I later dropped as it didn't fit the design)
- Colour pickers for minimum and maximum values
- A button for resetting data
- A warning for users if the current website's reading is weak and inconclusive

![Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-26_at_00.11.06.png](Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-26_at_00.11.06.png)