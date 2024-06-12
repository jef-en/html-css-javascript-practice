const userInput = document.getElementById("user-input");
const result = document.getElementById("results-div");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");

//To check the pattern
const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

//Function to check the user input with the pattern
const validator = (input) => regex.test(input);

check.addEventListener("click", () => {
  const input = userInput.value;
  const checker = validator(input);

  if (input.trim() === "") {
    alert("Please provide a phone number");
    return;
  }
  if (checker) {
    result.innerHTML = `Valid US Number: </br> ${input}`;
    result.style.color = "green";
    result.style.fontWeight = "bold";
  } else {
    result.innerHTML = `Invalid US Number: </br> \n ${input}`;
    result.style.color = "red";
    result.style.fontWeight = "bold";
  }
});

clear.addEventListener("click", () => {
  result.textContent = "";
  userInput.value = "";
});
