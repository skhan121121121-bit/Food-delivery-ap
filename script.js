// 🔥 FIREBASE CONFIG (নিজেরটা বসান)
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE"
};

// init firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = {};

function addToCart(name, price) {
  cart[name] = cart[name] ? {price, qty: cart[name].qty+1} : {price, qty:1};
  update();
}

function update() {
  let count = 0, total = 0;
  cartItems.innerHTML = "";
  for (let i in cart) {
    count += cart[i].qty;
    total += cart[i].price * cart[i].qty;
    cartItems.innerHTML += `<div>${i} x ${cart[i].qty}</div>`;
  }
  cartCount.innerText = count;
  total.innerText = total;
}

function openCart(){ cartBox.style.display="block"; }
function closeCart(){ cartBox.style.display="none"; }

function placeOrder(){
  if(!name.value || !phone.value || !address.value){
    alert("Fill all");
    return;
  }

  db.collection("orders").add({
    name: name.value,
    phone: phone.value,
    address: address.value,
    cart,
    time: new Date().toLocaleString()
  });

  alert("Order Sent");
  cart = {};
  update();
  closeCart();
}
