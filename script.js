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

// Add to cart
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

  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML = "<li>Cart is empty</li>";
  } else {
    Object.values(cart).forEach(item => {
      const li = document.createElement("li");
      li.innerText = `${item.name} x ${item.qty} = ₹${item.price * item.qty}`;
      cartItems.appendChild(li);
    });
  }

  cartModal.style.display = "block";
}

// Close cart
function closeCart() {
  cartModal.style.display = "none";
}

// ✅ GUARANTEED WhatsApp Order
function sendWhatsApp() {
  if (Object.keys(cart).length === 0) {
    alert("Please add items to cart");
    return;
  }

  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const address = document.getElementById("cust-address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  let message = `New Food Order\n\n`;
  message += `Name: ${name}\n`;
  message += `Phone: ${phone}\n`;
  message += `Address: ${address}\n\n`;
  message += `Order Items:\n`;

  Object.values(cart).forEach(item => {
    message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  const whatsappNumber = "918392010029"; // ✅ আপনার নম্বর
  const encodedMessage = encodeURIComponent(message);

  const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

  window.open(url, "_blank");
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
