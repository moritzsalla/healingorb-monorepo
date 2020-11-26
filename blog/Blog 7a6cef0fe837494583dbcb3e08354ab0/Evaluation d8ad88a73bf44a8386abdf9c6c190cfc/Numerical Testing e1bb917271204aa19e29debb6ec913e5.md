# Numerical Testing

The Healing Pod's ability to detect unhealthy content is central to its concept. Therefore, it is important to test its accuracy. How do I test and compare natural language processing models? Which model is best for my use case? Do I need to train one myself, perhaps using transfer learning?

### Feedback Rebecca

- Numerical testing might not give accurate impression, as there are other factors involved
- Pod might be accurate but not meaningful to users
- Find a way to test Pod holistically

## Ensuring a consistent testing environment

The models that I have found to be most accessible and general are:

1. The **Tensorflow Core** **Sentiment** Analysis model, trained on the large IMDB movie review dataset
2. **Tensorflow Core Toxicity** analysis, trained on  the civil comments dataset 
3. The **Google Cloud API** Sentiment Analysis, dataset undisclosed. Since its Google and their service costs money and Google doesn't specify a specific use case, it is to assume that their model achieves high accuracy and can make general assumptions.

**The easiest and least consistent approach in testing model accuracy is by human intuition.** 

### TensorFlow Core Sentiment Analysis

I have hosted the Tensorflow model on a simple website, which allows testers to quickly and easily predict sentences. The score is printed to the DOM. It is available here: 

- Text classification with an RNN
- Uses IMDB large movie review dataset
- recurrent neural network
- no credited authors
- *If the prediction is >= 0.0, it is positive else it is negative.*
- Ml5 normalised?

[Text classification with an RNN | TensorFlow Core](https://www.tensorflow.org/tutorials/text/text_classification_rnn)

[ml5 - Sentiment](https://sentiment-utils.vercel.app)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-26_at_13.32.52.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-26_at_13.32.52.png)

By shallow judgement, this model seems more very specific to its dataset, and less capable to generalise than the rest. Scores are less consistent.

### **Tensorflow Core Toxicity** Analysis

This one is the odd one out in that it is not sentiment analysis. As opposed to sentiment analysis, this model predicts toxicity. It cannot be directly compared to sentiment analysis, because it is trained to detect different things. However, it might be the more fitting model to what I am trying to detect.

[tensorflow/tfjs-models](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)

**Tryout in the browser**

![../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.13.45.png](../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.13.45.png)

The Running it on an obscene Trump tweet, however, returns false negatives. Rebecca points out that toxicity analysis is incapable of detecting cultural context (see chrome analysis → technical implementation).

[Drag Queen vs. David Duke: Whose Tweets Are More 'Toxic'?](https://www.wired.com/story/drag-queens-vs-far-right-toxic-tweets/)

![../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.14.32.png](../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-01_at_14.14.32.png)

### Google Cloud API

The Google service seems to be by far the most general and accurate of the three model. However, it is also the hardest to implement (because of credentials and its server side implementation), and is payed.

![../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-11_at_15.57.28.png](../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-11_at_15.57.28.png)

![../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-15_at_12.40.33.png](../Chrome%20Extension%208acb52e33e3342e5af2b51f81737a9af/Technical%20Implementation%20e16529c0639d4f8abe31eddb21707e16/Screenshot_2020-11-15_at_12.40.33.png)

**Interpreting results**

[Natural Language API Basics | Google Cloud](https://cloud.google.com/natural-language/docs/basics#interpreting_sentiment_analysis_values)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.27.01.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.27.01.png)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.29.43.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.29.43.png)

**score**: the overall emotion of a document

**magnitude:** how much emotional content is present within the document, and this value is often proportional to the length of the document.

## Determinind model accuracy by comparing scores

This approach is more thorough, but it is problematic. In order to train a model on toxicity or sentiment, it requires a labeled dataset. The datasets are naturally labeled by humans, which might have different thresholds of what it is they are determining. The prediction scores, even if normalised, can therefore be different due to human perception.

### Testing Datasets

- IMDB movie (industry standard)

    [IMDB Dataset of 50K Movie Reviews](https://www.kaggle.com/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)

- Black Lives Matter Tweets (cultural relevancy)

    [Black lives matter Sentiment Twitter](https://www.kaggle.com/yash612/black-lives-matter-twitter-dataset)

- Twitter US Airline Sentiment (social media toxicity)

    [Twitter US Airline Sentiment](https://www.kaggle.com/crowdflower/twitter-airline-sentiment)

### Mapping

Some predictions are normalised to 0 and 1, whereas others are normalised to -1 and 1. Hence, it is necessary to map values in order to get a consistent comparison. The mapping function is adapted from p5.js.

```jsx
// adapted from p5.js
function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};
```

### Comparison

The scores can hence be entered into CSV format and plotted as bar charts. This is a long and tedious process, and it is less conclusive than expected. From the results, it is apparent that the Google cloud API is more nuanced in its results, the Tensorflow readings being either close to 1 or -1. The models do not have consistent results. Similarly, both predict more tweets negatively than positively. This highlights a core problem of the process, as models seemingly show no cultural awareness.

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.52.25.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-14_at_18.52.25.png)

![Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-26_at_13.13.39.png](Numerical%20Testing%20e1bb917271204aa19e29debb6ec913e5/Screenshot_2020-11-26_at_13.13.39.png)

### Deductions

- Scraping does not take length of text into account
- How can I test not only numerically, but holistically? (cultural context determines toxicity). (dazed, Drag queen)
- What makes something a good model in the context of my application? Raw accuracy vs mistakes
- Coming up with own dataset might not be as useful
- Is transfer learning necessary?