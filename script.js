let cart = [];

function addToCart(itemName) {
  cart.push(itemName);
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let name = prompt("Enter your name:");
  if (!name) return;

  let phone = prompt("Enter your phone number:");
  if (!phone) return;

  let address = prompt("Enter delivery address:");
  if (!address) return;

  let message = "🛒 New Food Order %0A%0A";
  message += "Name: " + name + "%0A";
  message += "Phone: " + phone + "%0A";
  message += "Address: " + address + "%0A%0A";
  message += "Items:%0A";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item}%0A`;
  });

  const shopNumber = "8392010029";
  const url = `https://wa.me/91${shopNumber}?text=${message}`;
  window.open(url, "_blank");
}
