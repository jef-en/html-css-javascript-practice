const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const mainContainer = document.getElementById("main-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const imageContainer = document.getElementById("image-container");
const statsContainer = document.getElementById("stats-container");

const fetchData = async () => {
  try {
    const result = await fetch(pokemonAPI);
    const data = await result.json();
    const checker = validator();
    const finder = findPokemon(data.results, checker);

    if (!finder) {
      alert("Pokemon not found");
      return;
    }

    const pokemon = await fetchPokemon(finder.url);
    displayPokemon(pokemon);
  } catch (error) {
    console.error(error);
  }
};

const fetchPokemon = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const validator = () => {
  let searchValue = searchInput.value.trim();
  const regex = /^\d+$/;
  if (regex.test(searchValue)) {
    return parseInt(searchValue);
  } else {
    return searchValue.toLowerCase();
  }
};

const findPokemon = (results, userInput) => {
  return results.find((item) => {
    return (
      item.name.toLowerCase() === userInput ||
      parseInt(item.url.split("/").slice(-2)[0]) === userInput
    );
  });
};

const capital = (string) => {
  return string
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

// Try feature
const calculateDominantColor = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // To allow cross-origin image data extraction
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      const length = data.length;

      let colorSum = { r: 0, g: 0, b: 0 };
      let count = 0;

      // Adjust these thresholds as needed
      const luminanceThreshold = 20; // Skip colors with luminance below this value
      const brightnessThreshold = 220; // Skip colors with individual channel brightness above this value

      for (let i = 0; i < length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        // Skip transparent pixels
        if (alpha === 0) {
          continue;
        }

        // Calculate luminance
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Skip colors that are too dark or too bright
        if (
          luminance < luminanceThreshold ||
          r > brightnessThreshold ||
          g > brightnessThreshold ||
          b > brightnessThreshold
        ) {
          continue;
        }

        colorSum.r += r;
        colorSum.g += g;
        colorSum.b += b;
        count++;
      }

      // Calculate average color
      if (count > 0) {
        colorSum.r = Math.floor(colorSum.r / count);
        colorSum.g = Math.floor(colorSum.g / count);
        colorSum.b = Math.floor(colorSum.b / count);
      }

      const dominantColor = `rgb(${colorSum.r}, ${colorSum.g}, ${colorSum.b})`;
      resolve(dominantColor);
    };

    img.onerror = function (error) {
      reject(error);
    };

    img.src = imageUrl;
  });
};

const displayPokemon = async (data) => {
  const { name, id, weight, height, types, stats, sprites } = data;
  const { front_default } = sprites;

  const pokemonTypes = (types) => {
    return types
      .map((type) => {
        return `
        <p id="types" class="types-container ${type.type.name}">${capital(
          type.type.name
        )}</p>
      `;
      })
      .join(" ");
  };

  const customLabels = {
    hp: "Health:",
    attack: "Attack:",
    defense: "Defense:",
    "special-attack": "SP Atk:",
    "special-defense": "SP Def:",
    speed: "Speed:",
  };

  const pokemonStats = (stats) => {
    return stats
      .map((stat) => {
        const customLabel = customLabels[stat.stat.name];
        return `
        <tr>
          <td class="title">${customLabel}</td>
          <td class="stats ${stat.stat.name}">${stat.base_stat}</td>
        </tr>
      `;
      })
      .join(" ");
  };

  // Set the HTML content for imageContainer and statsContainer
  imageContainer.innerHTML = `<img src="${front_default}" alt="pokemon-sprite">`;
  statsContainer.innerHTML = `
    <div id="container1">
      <p id="pokemon-name" class="font-styling">${capital(
        name
      )} <span id="pokemon-id">#${id}</span></p>
      <div id="types-main">${pokemonTypes(types)}</div>

      <div id="container2">
        <div id="h-w-container">
          <p id="weight" class="font-styling ">${(weight / 10).toFixed(1)}kg</p>
          <p class="font-color">Weight</p>
        </div>
        <div id="h-w-container">
          <p id="weight" class="font-styling">${(height / 10).toFixed(1)}m</p>
          <p class="font-color">Height</p>
        </div>
      </div>
    </div>

    <div id="container3">
      <p class="font-styling">Base Stats</p> 
      <table>
        <tbody>
          ${pokemonStats(stats)}
        </tbody>
      </table>
    </div> 
  `;

  try {
    // Calculate dominant color and set background color of mainContainer
    const dominantColor = await calculateDominantColor(front_default);
    mainContainer.style.backgroundColor = dominantColor;
  } catch (error) {
    console.error("Error calculating dominant color:", error);
  }
};

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
});
