const foods = [
  { id: 1, name: "Burger", price: 120 },
  { id: 2, name: "Pizza", price: 250 },
  { id: 3, name: "Biryani", price: 180 },
  { id: 4, name: "Sandwich", price: 90 }
];

let cart = {};

const foodList = document.getElementById("food-list");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search");

// Render food items
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

// Add to cart (FIXED)
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

// Open cart modal
function openCart() {
  cartItems.innerHTML = "";
  Object.values(cart).forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} x ${item.qty} = ₹${item.price * item.qty}`;
    cartItems.appendChild(li);
  });
  cartModal.style.display = "block";
}

// Close cart modal
function closeCart() {
  cartModal.style.display = "none";
}

// Send order to WhatsApp
function sendWhatsApp() {
  const name = document.getElementById("cust-name").value;
  const phone = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  let message = `*New Food Order*%0A`;
  message += `Name: ${name}%0A`;
  message += `Phone: ${phone}%0A`;
  message += `Address: ${address}%0A%0A`;
  message += `*Order Items*:%0A`;

  Object.values(cart).forEach(item => {
    message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}%0A`;
  });

  const whatsappNumber = "918392010029"; 
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}

// Search filter
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = foods.filter(food =>
    food.name.toLowerCase().includes(value)
  );
  displayFoods(filtered);
});

// Initial load
displayFoods(foods);
