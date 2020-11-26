# Scraping Website Content

## Fetching website content

```tsx
if (paragraphs && paragraphs.length > 0) {
    paragraphs.forEach((paragraph) => doSomething(paragraph));
});
```

## Filtering out special characters

Javascript has some handy built in functions to filter and replace characters in strings. No lodash or similar libraries are needed. Queries are written in regular expression patterns.

[https://www.youtube.com/watch?v=sXQxhojSdZM](https://www.youtube.com/watch?v=sXQxhojSdZM)

[Regex Generator](https://ibnuhx.com/regex-generator/)

```tsx
const text = `Bla di bla die blu! Bla die blu? "Bli bli", blu blu.`

text
	.replace(/[!"\$',-\.\?\u2013\u2014\u2019\u201D\u20AC]/gi, " ")
	.replace(/  /g, " ");

// -> Bla di bla die blu Bla die blu Bli bli blu blu
```

## Sanitisation

Sanitisation is not strictly necessary since information is never leaked and used in abstract form by the Healing Orb. A potential security risk might be the chrome storage, as other websites have access to it — it is unlikely the would find the right key though. If it were a product that goes out to customers, I'd include something like this.

```jsx
# sanetization fn

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}
```

## Final Code

```tsx
// htmlScraper.ts

export function scrapeHTML(): string {
  const paragraphs: NodeListOf<
    HTMLParagraphElement
  > | null = document.querySelectorAll("p");

  let bin: string = "";

  if (paragraphs && paragraphs.length > 0) {
    // iterate over paragraph tags
    paragraphs.forEach((paragraph) => {
      const { textContent } = paragraph;
      // remove special characters from string
      if (textContent) {
        textContent
          .replace(/[!"\$',-\.\?\u2013\u2014\u2019\u201D\u20AC]/gi, " ")
          .replace(/  /g, " ");
      }
    });
  }

  return bin;
}

const myScrapedText: string = scrapeHTML()
```