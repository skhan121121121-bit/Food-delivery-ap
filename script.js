const foods = [
  { id: 1, name: "Burger", price: 120 },
  { id: 2, name: "Pizza", price: 250 },
  { id: 3, name: "Biryani", price: 180 },
  { id: 4, name: "Sandwich", price: 90 }
];

// Cart as object (FIX)
let cart = {};

const foodList = document.getElementById("food-list");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search");

// Render foods
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

// ✅ FIXED add to cart
function addToCart(id) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    const food = foods.find(f => f.id === id);
    cart[id] = { ...food, qty: 1 };
  }
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  let total = 0;
  Object.values(cart).forEach(item => total += item.qty);
  cartCount.innerText = total;
}

// Open cart
function openCart() {
  cartItems.innerHTML = "";
  Object.values(cart).forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} x ${item.qty} = ₹${item.price * item.qty}`;
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
  const filtered = foods.filter(f =>
    f.name.toLowerCase().includes(value)
  );
  displayFoods(filtered);
});

// Initial load
displayFoods(foods);
