let cart = [];
let total = 0;

// Add item to cart
function addItem(name, price) {
  cart.push(name);
  total += price;
  renderCart();
}

// Render cart and update WhatsApp link
function renderCart() {
  document.getElementById("cart").innerText = cart.join(", ");
  document.getElementById("total").innerText = total;

  const msg = encodeURIComponent(
    "🛒 New Order\n\nItems: " + cart.join(", ") +
    "\nTotal: ₹" + total
  );
  document.getElementById("waBtn").href =
    "https://wa.me/918392010029?text=" + msg;
}

// Place order → Google Sheet + WhatsApp
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

  // Send data to Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbxRaTZmbGoJiZ1RM_VvwQ46XaZE7tr_YrUR1mFyd_qfYn3UMSDN3I0FxPCgzejYEfBL/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => console.log("Order sent to Google Sheet"))
  .catch(err => console.log("Error:", err));

  // WhatsApp message
  const waMsg = encodeURIComponent(
    "🍔 *New Food Order*\n\n" +
    "Name: " + name +
    "\nPhone: " + phone +
    "\nAddress: " + address +
    "\n\nItems: " + cart.join(", ") +
    "\nTotal: ₹" + total
  );
  window.open("https://wa.me/918392010029?text=" + waMsg, "_blank");

  // Reset cart and form
  cart = [];
  total = 0;
  renderCart();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}
