const userInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

const intChecker = (input) => {
  if (!input || isNaN(input)) {
    return "Please enter a valid number";
  } else if (input <= -1) {
    return "Please enter a number greater than or equal to 1";
  } else if (input >= 4000) {
    return "Please enter a number less than or equal to 3999";
  } else {
    return intToNumeral(input);
  }
};

const intToNumeral = (input) => {
  const romanNumerals = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };
  let romanString = "";
  const values = Object.keys(romanNumerals)
    .map(Number)
    .sort((a, b) => b - a);

  for (let value of values) {
    while (input >= value) {
      romanString += romanNumerals[value];
      input -= value;
    }
  }

  return romanString;
};

convertButton.addEventListener("click", () => {
  const input = userInput.value;
  output.innerHTML = intChecker(input);
});
