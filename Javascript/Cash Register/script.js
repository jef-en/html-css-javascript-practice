const priceDisplay = document.getElementById("price-display");
const cashInBank = document.getElementById("cash-in-bank");
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

priceDisplay.textContent = price;

cid.forEach((item) => {
  const itemElement = document.createElement("p");
  itemElement.textContent = `${item[0]}: $${item[1]}`;
  cashInBank.appendChild(itemElement);
});
