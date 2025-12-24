const SHEET_URL = "https://script.google.com/macros/s/AKfycbyHv1db9owv6_DOV8ZHbLuEOePQkaZK9u--7zesan4HvylyRi7oncHW4XOwioTiLHWJRw/exec";
const WHATSAPP = "918392010029";

let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push(name);
  total += price;
  updateCart();
}

function updateCart() {
  document.getElementById("cart").innerText = cart.join(", ") || "No items";
  document.getElementById("total").innerText = total;
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  const data = {
    name: name,
    phone: phone,
    address: address,
    items: cart.join(", "),
    total: total
  };

  // Google Sheet
  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(r => r.text())
  .then(() => alert("Order Google Sheet এ গেছে ✅"))
  .catch(() => alert("Sheet error ❌"));

  // WhatsApp
  const msg = encodeURIComponent(
    "🍔 New Order\n\n" +
    "Name: " + name +
    "\nPhone: " + phone +
    "\nAddress: " + address +
    "\nItems: " + cart.join(", ") +
    "\nTotal: ₹" + total
  );

  window.open("https://wa.me/" + WHATSAPP + "?text=" + msg);

  // Reset
  cart = [];
  total = 0;
  updateCart();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
}
