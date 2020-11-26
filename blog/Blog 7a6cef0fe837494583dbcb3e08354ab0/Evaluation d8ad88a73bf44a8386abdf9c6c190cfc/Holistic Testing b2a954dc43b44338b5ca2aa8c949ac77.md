# Holistic Testing

## General Observations

### Susi

- Peak is not obvious enough. Needs flash.
- Little bond to object. How is it more than a light? Need for personification. All technology needs human element.
    - Touching it regularily
    - Tamagotchi
    - Empathetic lamp
- Could it make sounds?
- Aesthetic is very functional. Healing orb's concept is far richer than its shape

### Me

- Does not sense Donald trump tweet correctly. Political context is lost.
- Beautiful
- Atmospheric
- Aware of color changes if I know what I'm looking for
- Simplicity of interaction doesn't make me question accuracy of result
- Many more positive/healthy websites than negative/unhealthy. Averaging needs substantial amount of negativity to fade.
- Customising own color value makes it personal, gives it interior design touch

### Nina

- Uses other browser. Difficulty remembering to use Chrome.

### Marc

- (Spots trend and makes counter suggestion (suggestion algorithm))
- balancing act
- Counter algorithm
- Fact checker

## Testing models by intuition

I've confronted multiple people with the concept and conducted self-tests in order to determine usefulness. To judge prediction accuracy holistically, I have developed a testing method in which the scraped testing data is written to a database and later visualized using D3. The goal of this is not to create the most accurate graphical representation of data, but to make data assessable with the naked eye. The generated word cloud creates an easily understandable overview of toxicity. When comparing with the model's predictions, it is possible to spot combined accuracy using general intuition.

In order to achieve this, I wrote a second chrome extension. It makes use of the chrome storage to gather all scraped words in a single string. The extension will collect website content as long as the extension is active. This is a massive memory leak and must be used with absolute caution, as it can completely destroy chrome after some time.

```jsx
// be careful, collecting so much text is a massive memory leak

chrome.storage.local.get(['bin'], function (result) {
  let bin;

  if (result.bin) {
    bin = result.bin;
    bin += scrapeHTML();
  } else {
    bin = scrapeHTML();
  }

  console.log(bin);
  chrome.storage.local.set({ bin: bin }); // change this to " " to clear
});

function scrapeHTML() {
  const paragraphs = document.querySelectorAll('p');

  let bin = '';

  if (paragraphs && paragraphs.length > 0) {
    paragraphs.forEach((paragraph) => {
      bin += paragraph.textContent;
    });
  }

  return bin;
}

StorageArea.clear();
```

![Holistic%20Testing%20b2a954dc43b44338b5ca2aa8c949ac77/Screenshot_2020-11-24_at_15.32.00.png](Holistic%20Testing%20b2a954dc43b44338b5ca2aa8c949ac77/Screenshot_2020-11-24_at_15.32.00.png)

Whereas the results certainly highlight the users habit, they are less expressive than I hoped. Most word we encounter are filler words, rather than meaningful words. To produce a more accurate measurement, these words must be filtered out. On second thought, the meaning of se

![Holistic%20Testing%20b2a954dc43b44338b5ca2aa8c949ac77/Screenshot_2020-11-26_at_13.19.34.png](Holistic%20Testing%20b2a954dc43b44338b5ca2aa8c949ac77/Screenshot_2020-11-26_at_13.19.34.png)

The visualisations are made using d3.

[Word Cloud](https://observablehq.com/@d3/word-cloud)

## Deductions

- A numeric analysis is meaningful in a controlled environment but inconclusive within a real-life context.
- The prototype is hardly transferrable to a different setup. A holistic assessment is possible to a limited extent.
- Is the model capable of sensing and expressing cultural awareness?
- NLP might create accurate measurements, but the user doesn't see a concrete benefit of using the interface in the context of effort it requires to utilize
- Do users see new use cases?