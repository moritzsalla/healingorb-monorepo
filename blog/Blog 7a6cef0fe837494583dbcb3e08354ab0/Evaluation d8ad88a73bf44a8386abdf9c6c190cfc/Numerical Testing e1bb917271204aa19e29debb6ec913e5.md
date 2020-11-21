# Numerical Testing

# How do I test and compare models?

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-18_at_14.18.10.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-18_at_14.18.10.png)

[ml5 - Sentiment](https://sentiment-utils.vercel.app)

### Testing Datasets

- IMDB movie (industry standard)

    [IMDB Dataset of 50K Movie Reviews](https://www.kaggle.com/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)

- Black Lives Matter Tweets (cultural relevancy)

    [Black lives matter Sentiment Twitter](https://www.kaggle.com/yash612/black-lives-matter-twitter-dataset)

- Twitter US Airline Sentiment (social media toxicity)

    [Twitter US Airline Sentiment](https://www.kaggle.com/crowdflower/twitter-airline-sentiment)

### Google API: Interpreting results

[Natural Language API Basics | Google Cloud](https://cloud.google.com/natural-language/docs/basics#interpreting_sentiment_analysis_values)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.27.01.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.27.01.png)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.29.43.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.29.43.png)

**score**: the overall emotion of a document

**magnitude:** how much emotional content is present within the document, and this value is often proportional to the length of the document.

### Tensorflow Core Example

- Text classification with an RNN
- Uses IMDB large movie review dataset
- recurrent neural network
- no credited authors
- *If the prediction is >= 0.0, it is positive else it is negative.*
- Ml5 normalised?

[Text classification with an RNN | TensorFlow Core](https://www.tensorflow.org/tutorials/text/text_classification_rnn)

## Results

### Mapping

```jsx
// adapted from p5.js
function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};
```

### Comparison

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.52.25.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.52.25.png)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.47.38.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.47.38.png)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.47.49.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.47.49.png)

How can I test not only numerically, but holistically? (cultural context determines toxicity). (dazed, Drag queen)

What makes something a good model in the context of my application? Raw accuracy vs mistakes

Coming up with own dataset might not be as useful