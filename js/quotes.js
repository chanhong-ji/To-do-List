const quotes = [
  {
    quote:
      "Every man has two lives, and the second starts when he realize that he has just one.",
    author: "Confucius",
  },
  {
    quote: "Yesterday you said tomorrow. Just do it.",
    author: "Nike",
  },
  {
    quote:
      "What you have become is the price you paid to get what you used to want.",
    author: "Mignon McLaughlin",
  },
  {
    quote:
      "If you cannot fly then run. If you cannot run, then walk. If you cannot walk, then crawl, but whatever you do, you have to keep to moving forward.",
    author: "Martin Luther King Jr.",
  },
  {
    quote:
      "The fastest way to change yourself is to hang out with people who are already the way you want to be.",
    author: "Reid Hoffman",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
];

const quote = document.querySelector(".quote span:first-child");
const author = document.querySelector(".quote span:nth-child(2)");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
