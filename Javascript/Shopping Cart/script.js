const flowerCard = document.getElementById("flower-card");
const cartBtn = document.getElementById("cart");
const showHideCartSpan = document.getElementById("show-hide");
const cartContainer = document.getElementById("cart-container");
const totalNumberOfItems = document.getElementById("total-items");
const productsContainer = document.getElementById("products-container");
let isCartShowing = false;

const products = [
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

products.forEach(({ id, name, scientificName, price }) => {
  flowerCard.innerHTML += `
    <div id="card">
        <h3>${name}</h3>
        <p><em>${scientificName}</em><p>
        <p>Price: $${price}</p>
        <button class="btn add-to-cart-btn" id=${id}>Add to basket</button>
    </div>
    `;
});

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);
    const totalCountPerProduct = {};
    this.items.forEach((flower) => {
      totalCountPerProduct[flower.id] =
        (totalCountPerProduct[flower.id] || 0) + 1;
    });
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${product.id}`
    );

    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
    <div id="dessert${id}" class="product">
      <p>
        <span class="product-count" id="product-count-for-id${id}"></span>${name}
      </p>
      <p>${price}</p>
    </div>
    `);
  }

  getCounts() {
    return this.items.length;
  }
}

const cart = new ShoppingCart();

const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});
