const foods = [
  { id: 1, name: "Burger", price: 120 },
  { id: 2, name: "Pizza", price: 250 },
  { id: 3, name: "Biryani", price: 180 },
  { id: 4, name: "Sandwich", price: 90 }
];

let cart = [];

const foodList = document.getElementById("food-list");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search");

// Show food
function displayFoods(items) {
  foodList.innerHTML = "";
  items.forEach(food => {
    const div = document.createElement("div");
    div.className = "food-item";
    div.innerHTML = `
      <h3>${food.name}</h3>
      <p>₹${food.price}</p>
      <button onclick="addToCart(${food.id})">Add to Cart</button>
    `;
    foodList.appendChild(div);
  });
}

// Add to cart
function addToCart(id) {
  const food = foods.find(f => f.id === id);
  cart.push(food);
  cartCount.innerText = cart.length;
  showCart();
}

// Show cart
function showCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.name + " - ₹" + item.price;
    cartItems.appendChild(li);
  });
  cartModal.style.display = "block";
}

// Close cart
function closeCart() {
  cartModal.style.display = "none";
}

// Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = foods.filter(food =>
    food.name.toLowerCase().includes(value)
  );
  displayFoods(filtered);
});

// Initial load
displayFoods(foods);

// Cart click
document.querySelector(".cart").addEventListener("click", showCart);