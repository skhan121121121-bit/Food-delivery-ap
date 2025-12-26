const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzEU4wZVnLf2n8PwDacIyBvIwXnba-MrEp9RI-JFGVxJFEyVFIIKQ0PhoXvAMjYrmxo/exec";

let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push(name + " ₹" + price);
  total += price;
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  cartEl.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    cartEl.appendChild(li);
  });
  document.getElementById("total").innerText = total;
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("Fill all details & add items");
    return;
  }

  const orderData = {
    name: name,
    phone: phone,
    address: address,
    items: cart.join(", "),
    total: total
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  // WhatsApp message (customer side)
  const msg =
    "New Order%0A" +
    "Name: " + name + "%0A" +
    "Phone: " + phone + "%0A" +
    "Address: " + address + "%0A" +
    "Items: " + cart.join(", ") + "%0A" +
    "Total: ₹" + total;

  window.open("https://wa.me/91" + phone + "?text=" + msg, "_blank");

  alert("Order Sent Successfully!");

  cart = [];
  total = 0;
  renderCart();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}
