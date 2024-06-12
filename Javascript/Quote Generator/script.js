const button = document.getElementById("quoteButton");
const displayQuote = document.getElementById("display");

button.addEventListener("click", () => {
  const listQuotes = [
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "Your time is limited, don't waste it living someone else's life.",
    "The only way to do great work is to love what you do.",
    "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  ];

  let newQuotes = Math.floor(Math.random() * listQuotes.length);

  displayQuote.innerText = listQuotes[newQuotes];
});
