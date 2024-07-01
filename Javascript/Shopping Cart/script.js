const flowerCard = document.getElementById("flower-card");
const flowers = [
  {
    id: 1,
    name: "Sunflower",
    scientificName: "Helianthus Annuus L.",
    price: 1,
  },
  {
    id: 2,
    name: "Rose",
    scientificName: "Rosa Rubiginosa",
    price: 1,
  },
  {
    id: 3,
    name: "Daisy",
    scientificName: " Leucanthemum vulgare",
    price: 0.5,
  },
  {
    id: 4,
    name: "Tulip",
    scientificName: "Tulipa spp.",
    price: 2,
  },
  {
    id: 5,
    name: "Orchids",
    scientificName: "Orchidaceae",
    price: 1,
  },
];

flowers.forEach(({ id, name, scientificName, price }) => {
  flowerCard.innerHTML += `
    <div id="card">
        <h3>${name}</h3>
        <p><em>${scientificName}</em><p>
        <p>Price: $${price}</p>
        <button class="btn" id=${id}>Add to basket</button>
    </div>
    `;
});
