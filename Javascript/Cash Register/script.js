const priceDisplay = document.getElementById("price-display");
const cashInBank = document.getElementById("cash-in-bank");
const purchaseBtn = document.getElementById("purchase-btn");
const customerCash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
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

// Shows the change available in bank
cid.forEach((item) => {
  const itemElement = document.createElement("p");
  itemElement.textContent = `${item[0]}: $${item[1]}`;
  cashInBank.appendChild(itemElement);
});

const calculateChange = (price, customerMoney, cid) => {
  cid = cid.reverse();
  let change = customerMoney - price;
  let changeArr = [];
  const currencyValues = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1.0,
    FIVE: 5.0,
    TEN: 10.0,
    TWENTY: 20.0,
    "ONE HUNDRED": 100.0,
  };

  for (let i = 0; i < cid.length; i++) {
    let coinName = cid[i][0];
    let coinTotal = cid[i][1];
    let coinValue = currencyValues[coinName]; // Get the value of the coin/note
    let coinAmount = 0;

    // Calculate the amount of each denomination to give as change
    while (change >= coinValue && coinTotal > 0) {
      change -= coinValue;
      change = Math.round(change * 100) / 100;
      coinTotal -= coinValue;
      coinAmount += coinValue;
    }

    if (coinAmount > 0) {
      changeArr.push([coinName, coinAmount]);
    }
  }

  // Check if the exact change can be given
  if (change > 0) {
    return "Insufficient Funds";
  } else {
    return changeArr;
  }
};

purchaseBtn.addEventListener("click", () => {
  let customerMoney = Number(customerCash.value);

  if (customerMoney < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (customerMoney === price) {
    changeDue.innerHTML = "No change due - customer paid with exact cash";
  } else {
    let changeResult = calculateChange(price, customerMoney, cid);
    if (changeResult === "Insufficient Funds") {
      changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
    } else {
      changeDue.innerHTML = "Status: OPEN";
      changeResult.forEach((coin) => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${coin[0]}: $${coin[1]}`;
        changeDue.appendChild(itemElement);
      });
    }
  }
});
