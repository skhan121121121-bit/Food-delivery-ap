// 🔥 FIREBASE CONFIG (নিজেরটা বসান)
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = {};

function addToCart(name, price) {
  cart[name]
    ? cart[name].qty++
    : cart[name] = { price: price, qty: 1 };
  updateCart();
}

function updateCart() {
  let count = 0;
  let totalPrice = 0;
  document.getElementById("cartItems").innerHTML = "";

  for (let item in cart) {
    count += cart[item].qty;
    totalPrice += cart[item].price * cart[item].qty;

    document.getElementById("cartItems").innerHTML += `
      <div>${item} x ${cart[item].qty}</div>
    `;
  }

  document.getElementById("cartCount").innerText = count;
  document.getElementById("total").innerText = totalPrice;
}

function openCart() {
  document.getElementById("cartBox").style.display = "block";
}

function closeCart() {
  document.getElementById("cartBox").style.display = "none";
}

function placeOrder() {
  const custName = document.getElementById("name").value.trim();
  const custPhone = document.getElementById("phone").value.trim();
  const custAddress = document.getElementById("address").value.trim();

  if (custName === "" || custPhone === "" || custAddress === "") {
    alert("Fill all");
    return;
  }

  db.collection("orders").add({
    name: custName,
    phone: custPhone,
    address: custAddress,
    items: cart,
    time: new Date().toLocaleString()
  });

  alert("Order placed successfully");

  cart = {};
  updateCart();
  closeCart();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
    }
