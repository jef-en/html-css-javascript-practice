const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
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
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const displayPokemon = (data) => {
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

  const pokemonStats = (stats) => {
    return stats
      .map((stat) => {
        return `
      <tr>
        <td>${capital(stat.stat.name)}</td>
        <td>${stat.base_stat}</td>
      </tr>
      `;
      })
      .join(" ");
  };

  imageContainer.innerHTML = `<img src="${front_default}" alt="pokemon-sprite">`;
  statsContainer.innerHTML = `
  <div id="container1">
    <p id="pokemon-name" class="font-styling">${capital(
      name
    )} <span id="pokemon-id">#${id}</span></p>
    <div id="types-main">${pokemonTypes(types)}</div>
  </div>

  <div id="container2">
    <div id="h-w-container">
      <p id="weight" class="font-styling ">${weight}kg</p>
      <p class="font-color">Weight</p>
    </div>
    <div id="h-w-container">
      <p id="weight" class="font-styling">${height}m</p>
      <p class="font-color">Height</p>
    </div>
  </div>

  <div>
    <p class="font-styling">Base Stat</p>
    <table>
      ${pokemonStats(stats)}
    </table>
  </div>

  `;
};

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
});
