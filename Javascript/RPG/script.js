let health = 100;
let experience = 0;
let gold = 50;
let currentWeapon = 0;
let inventory = ["stick "];

const healthText = document.querySelector("#healthText");
const experienceText = document.querySelector("#experienceText");
const goldText = document.querySelector("#goldText");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");

// Weapon objects
const weapons = [
  { name: "wooden stick", power: 5 },
  { name: "pointed dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "valiant sword", power: 100 },
];

// Create an object to easy access of different locations
const locations = [
  {
    name: "store",
    buttonName: ["Buy Potion (10 Gold)", "Buy Weapon (30 gold)", "Exit Store"],
    buttonFunctions: [buyPotion, buyWeapon, goTown],
    text: "You are greeted with a friendly smile by the merchant. 'Welcome to my humble store,' he said. 'What would you like to buy?",
  },
  {
    name: "town",
    buttonName: ["Go to Store", "Go to Cave", "Fight Dragon"],
    buttonFunctions: [goStore, goCave, fightDragon],
    text: "You are back in the town of Seliana. As you walk by, you see a humble store, a quest for cave spelunking, and the shadow of a legendary beast looming above.",
  },
  {
    name: "cave",
    buttonName: ["Fight Diablos", "Fight Nergigante", "GO BACK!"],
    buttonFunctions: [fightDiablos, fightNergi, goTown],
    text: "You accept the quest. Ahead of you lies a winding path; one is full of echoed screams, and the other is filled with the smell of flesh and blood. The thought of going back seeps into your mind.",
  },
];

// Initialize the first choices
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Function that accesss the name:value of location objects
function update(location) {
  button1.innerText = location.buttonName[[0]];
  button2.innerText = location.buttonName[[1]];
  button3.innerText = location.buttonName[[2]];
  button1.onclick = location.buttonFunctions[[0]];
  button2.onclick = location.buttonFunctions[[1]];
  button3.onclick = location.buttonFunctions[[2]];
  text.innerText = location.text;
}

// Store Functions
function goStore() {
  update(locations[0]);
}

function buyPotion() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    healthText.innerText = health;
    goldText.innerText = gold;
  } else {
    text.innerText =
      "Wo wo wo! Easy there, you don't have enough gold. Go fight some monsters and return with their spoils to avail my service.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText =
        "New weapon acquired, a " +
        newWeapon +
        " capable of traversing the early stages of your adventure. " +
        " You feel a surge of power flows through you. ";
      text.innerText += " In your inventory you have, " + inventory;
      inventory.push(newWeapon);
      currentWeapon++;
    } else {
      text.innerText =
        "Wo wo wo! Easy there, you don't have enough gold. Go fight some monsters and return with their spoils to avail my service.";
    }
  } else {
    text.innerText =
      "You now own the strongest weapon this world could offer. Capable of severing even the mightiest foe.";
  }
}

// Town
function goTown() {
  update(locations[1]);
}

// Cave Functions
function goCave() {
  update(locations[2]);
}
function fightDiablos() {}
function fightNergi() {}

// Fighting Dragon
function fightDragon() {}
