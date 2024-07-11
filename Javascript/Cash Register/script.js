const priceDisplay = document.getElementById("price-display");
const cashInBank = document.getElementById("cash-in-bank");
const purchaseBtn = document.getElementById("purchase-btn");
const customerCash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 100],
];

const displayCID = () => {
  cashInBank.innerHTML = "";
  cid.forEach((item) => {
    const itemElement = document.createElement("p");
    itemElement.textContent = `${item[0]}: $${item[1]}`;
    cashInBank.appendChild(itemElement);
  });
};

// Initial display of price and cid
priceDisplay.textContent = price;
displayCID();

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
    let coinValue = currencyValues[coinName];
    let coinAmount = 0;

    while (change >= coinValue && coinTotal > 0) {
      change -= coinValue;
      change = Math.round(change * 100) / 100;
      coinTotal -= coinValue;
      coinAmount += coinValue;
    }

    if (coinAmount > 0) {
      changeArr.push([coinName, Math.round(coinAmount * 100) / 100]);
      cid[i][1] = Math.round((cid[i][1] - coinAmount) * 100) / 100;
    }
  }

  // Check if the exact change can be given
  if (change > 0) {
    return "Insufficient Funds";
  }

  // Check if the cash-in-drawer is now empty
  const isCIDEmpty = cid.every((item) => item[1] === 0);
  if (isCIDEmpty) {
    return { status: "CLOSED", changeArr: changeArr };
  }

  return { status: "OPEN", changeArr: changeArr };
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
      changeDue.innerHTML = `Status: ${changeResult.status}`;
      changeResult.changeArr.forEach((coin) => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${coin[0]}: $${coin[1]}`;
        changeDue.appendChild(itemElement);
      });
      if (changeResult.status === "CLOSED") {
        cashInBank.innerHTML = "Cash-in-Drawer is now empty.";
      } else {
        cid = cid.reverse();
        displayCID();
      }
    }
  }
});
