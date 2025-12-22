import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 YOUR FIREBASE CONFIG (CONNECTED) */
const firebaseConfig = {
  apiKey: "AIzaSyDTSqACN8xS9G3eJ8zOW7l-TlkaMKprm-M",
  authDomain: "food-app-f255f.firebaseapp.com",
  projectId: "food-app-f255f",
  storageBucket: "food-app-f255f.firebasestorage.app",
  messagingSenderId: "549990208622",
  appId: "1:549990208622:web:7fbc7e9d5da6ea19b6c27f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 🍔 FOOD LIST */
const foods = [
  { id: 1, name: "Pizza", price: 200 },
  { id: 2, name: "Burger", price: 120 },
  { id: 3, name: "Pasta", price: 150 }
];

let cart = [];

/* LOAD FOOD */
const foodList = document.getElementById("foodList");
foodList.innerHTML = "";
foods.forEach(food => {
  foodList.innerHTML += `
    <div class="food">
      <h4>${food.name}</h4>
      <p>₹${food.price}</p>
      <button onclick="addToCart(${food.id})">Add</button>
    </div>
  `;
});

/* ADD TO CART */
window.addToCart = function (id) {
  const item = foods.find(f => f.id === id);
  cart.push(item);
  updateCart();
};

/* UPDATE CART */
function updateCart() {
  document.getElementById("cartCount").innerText = cart.length;
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
  });

  document.getElementById("total").innerText = total;
}

/* TOGGLE CART */
window.toggleCart = function () {
  const cartBox = document.getElementById("cart");
  cartBox.style.display =
    cartBox.style.display === "block" ? "none" : "block";
};

/* PLACE ORDER */
window.placeOrder = async function () {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("Fill all details & add item");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  /* SAVE TO FIREBASE */
  await addDoc(collection(db, "orders"), {
    name: name,
    phone: phone,
    address: address,
    items: cart,
    total: total,
    createdAt: new Date()
  });

  /* WHATSAPP ORDER */
  let message =
    `Order Received:%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Address: ${address}%0A` +
    `Total: ₹${total}`;

  window.open(
    `https://wa.me/919392010029?text=${message}`,
    "_blank"
  );

  alert("Order placed successfully!");

  cart = [];
  updateCart();
  toggleCart();
};
