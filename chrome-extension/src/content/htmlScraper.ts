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
