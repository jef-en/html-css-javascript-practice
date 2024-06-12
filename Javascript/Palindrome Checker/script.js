const userInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

function cleanInput(input) {
  return input.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
}

function isPalindrome(input) {
  const cleanedString = cleanInput(input);
  return cleanedString === cleanedString.split("").reverse().join("");
}

checkButton.addEventListener("click", () => {
  const input = userInput.value;
  const checker = isPalindrome(input);

  if (input.trim() === "") {
    alert("Please input a value");
    return;
  }
  const HTMLString = `
  <strong>${input} is ${checker ? "a Palindrome" : "not a Palindrome"}</strong>
  `;
  result.innerHTML = HTMLString;
});
