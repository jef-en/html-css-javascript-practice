const one = document.getElementById("one");
const two = document.getElementById("two");
const plus = document.getElementById("plus");
const equals = document.getElementById("equals");
const result = document.getElementById("result");
const form = document.getElementById("btn-container");

// Handle button clicks to update the display
one.addEventListener("click", () => {
  result.textContent += "1";
});
two.addEventListener("click", () => {
  result.textContent += "2";
});
plus.addEventListener("click", () => {
  result.textContent += "+";
});

// Prevent form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Handle the equals button click to perform the addition
equals.addEventListener("click", () => {
  // Get the current input from the display
  const input = result.textContent;

  // Check if the input ends with an operator
  if (input.endsWith("+") || input === "") {
    alert("Invalid input!");
    return;
  }

  // Split the input by the plus sign to get the operands
  const operands = input.split("+");

  // Convert operands to numbers and perform the addition
  const sum = operands.reduce((total, num) => total + parseFloat(num), 0);

  // Update the display with the result
  result.textContent = sum;
});
