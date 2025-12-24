// 👉👉 এখানেই Web App URL বসানো আছে
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzRTA4dP-v_Owyj3hSrFATInKNQH4OSmbBv6c7XoF-HaR8OdA_396mPpmly1PXWCwX8yA/exec";
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

  // 👉 Google Sheet এ পাঠানো
  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "no-cors"
  });

  // 👉 WhatsApp
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
