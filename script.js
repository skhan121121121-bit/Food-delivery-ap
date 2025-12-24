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
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzUEGgVPLYrgzpbYU8i2wgVkpNSnxKwyX9hEgHAKT_w9xLvQHbOrkMJnAfvMPvmsmdzhQ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address,
      items: cart.join(", "),
      total: total
    })
  })
  .then(() => {
    alert("Order sent to Google Sheet ✅");
    cart = [];
    total = 0;
    renderCart();
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
  })
  .catch(() => {
    alert("Error sending order");
  });
}
