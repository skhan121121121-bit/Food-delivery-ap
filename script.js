import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase CONFIG (নিজেরটা বসাবেন)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FOOD DATA
const foods = [
  { id: 1, name: "Pizza", price: 200 },
  { id: 2, name: "Burger", price: 120 },
  { id: 3, name: "Pasta", price: 150 }
];

let cart = [];

// LOAD FOOD
const foodList = document.getElementById("foodList");
foods.forEach(f => {
  foodList.innerHTML += `
    <div class="food">
      <h4>${f.name}</h4>
      <p>₹${f.price}</p>
      <button onclick="addToCart(${f.id})">Add</button>
    </div>`;
});

// ADD CART
window.addToCart = function(id) {
  const item = foods.find(f => f.id === id);
  cart.push(item);
  updateCart();
};

// UPDATE CART
function updateCart() {
  document.getElementById("cartCount").innerText = cart.length;
  const list = document.getElementById("cartItems");
  list.innerHTML = "";

  let total = 0;
  cart.forEach(i => {
    total += i.price;
    list.innerHTML += `<li>${i.name} - ₹${i.price}</li>`;
  });

  document.getElementById("total").innerText = total;
}

// TOGGLE CART
window.toggleCart = function () {
  const c = document.getElementById("cart");
  c.style.display = c.style.display === "block" ? "none" : "block";
};

// PLACE ORDER
window.placeOrder = async function () {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("Fill all & add item");
    return;
  }

  let total = cart.reduce((s, i) => s + i.price, 0);

  // SAVE TO FIREBASE
  await addDoc(collection(db, "orders"), {
    name,
    phone,
    address,
    items: cart,
    total,
    time: new Date()
  });

  // WHATSAPP
  let msg = `Order:%0AName:${name}%0APhone:${phone}%0AAddress:${address}%0ATotal:₹${total}`;
  window.open(`https://wa.me/919392010029?text=${msg}`, "_blank");

  alert("Order Placed");
  cart = [];
  updateCart();
  toggleCart();
};
