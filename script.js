let cart = [];

function addToCart(item) {
  cart.push(item);
  document.getElementById("cartCount").innerText = cart.length;
}

function openOrderForm() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  document.getElementById("orderModal").style.display = "block";
}

function closeOrderForm() {
  document.getElementById("orderModal").style.display = "none";
}

function placeOrder() {
  let name = document.getElementById("custName").value;
  let phone = document.getElementById("custPhone").value;
  let address = document.getElementById("custAddress").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  let msg = "🍔 New Food Order%0A%0A";
  msg += "Name: " + name + "%0A";
  msg += "Phone: " + phone + "%0A";
  msg += "Address: " + address + "%0A%0A";
  msg += "Items:%0A";

  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item}%0A`;
  });

  const whatsapp = "8392010029";
  window.open(`https://wa.me/91${whatsapp}?text=${msg}`, "_blank");
}
