let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push(name);
  total += price;
  renderCart();
}

function renderCart() {
  document.getElementById("cart").innerText = cart.join(", ");
  document.getElementById("total").innerText = total;

  // WhatsApp live link update
  const msg = encodeURIComponent(
    "🛒 New Order\n\nItems: " + cart.join(", ") +
    "\nTotal: ₹" + total
  );
  document.getElementById("waBtn").href =
    "https://wa.me/918392010029?text=" + msg;
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("সব ফিল্ড পূরণ করুন");
    return;
  }

  const data = {
    name,
    phone,
    address,
    items: cart.join(", "),
    total
  };

  // Send to Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbyFktQ95osnGPrpQs9DDU5RU7n7zttZF2TT_f3V0noAI1vSdluuVU3aAHK3tTfxYIKW/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  // WhatsApp order open
  const waMsg = encodeURIComponent(
    "🍔 *New Food Order*\n\n" +
    "Name: " + name +
    "\nPhone: " + phone +
    "\nAddress: " + address +
    "\n\nItems: " + cart.join(", ") +
    "\nTotal: ₹" + total
  );
  window.open("https://wa.me/918392010029?text=" + waMsg, "_blank");

  // Reset cart
  cart = [];
  total = 0;
  renderCart();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}
