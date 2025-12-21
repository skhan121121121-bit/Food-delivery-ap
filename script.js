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

  let message = "New Order:%0A";
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item}%0A`;
  });

  const phone = "8392010029";
  const url = `https://wa.me/91${phone}?text=${message}`;
  window.open(url, "_blank");
}
