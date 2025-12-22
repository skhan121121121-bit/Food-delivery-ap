// 🔥 Firebase config (নিজেরটা বসান)
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = {};
let total = 0;

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price, qty: 1 };
  }
  render();
}

function render() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const totalSpan = document.getElementById("total");

  cartItems.innerHTML = "";
  total = 0;
  let count = 0;

  for (let item in cart) {
    let sum = cart[item].price * cart[item].qty;
    total += sum;
    count += cart[item].qty;

    cartItems.innerHTML += `<div>${item} x ${cart[item].qty} = ₹${sum}</div>`;
  }

  cartCount.innerText = count;
  totalSpan.innerText = total;
}

function openCart() {
  document.getElementById("cart").style.display = "block";
}

function closeCart() {
  document.getElementById("cart").style.display = "none";
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Fill all");
    return;
  }

  if (Object.keys(cart).length === 0) {
    alert("Cart empty");
    return;
  }

  db.collection("orders").add({
    name,
    phone,
    address,
    cart,
    total,
    time: new Date().toString()
  });

  alert("Order placed");

  cart = {};
  render();
  closeCart();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}
