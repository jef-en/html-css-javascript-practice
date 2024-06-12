const pastelButton = document.getElementById("pastel-btn");
const earthButton = document.getElementById("earth-btn");
const neonButton = document.getElementById("neon-btn");
const hexValue = document.getElementById("hex-value");
const body = document.querySelector("body");

const colors = {
  pastel: ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94"],
  earth: ["#c7a379", "#c6c97b", "#dec8af", "#a7b39b", "#644d3c"],
  neon: ["#f52789", "#e900ff", "#1685f8", "#3d144c", "#faeb2c"],
};

function changeColor(type) {
  const randomIndex = Math.floor(Math.random() * 5);
  const color = colors[type][randomIndex];
  hexValue.innerText = color.toUpperCase();
  body.style.backgroundColor = color;
}

pastelButton.onclick = () => changeColor("pastel");
earthButton.onclick = () => changeColor("earth");
neonButton.onclick = () => changeColor("neon");
