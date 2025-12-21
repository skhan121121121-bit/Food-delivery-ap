let cart = {};

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price, qty: 1 };
  }
  updateCartCount();
}

function updateCartCount() {
  let count = 0;
  for (let item in cart) count += cart[item].qty;
  document.getElementById("cartCount").innerText = count;
}

function openCart() {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty");
    return;
  }
  document.getElementById("cartModal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function changeQty(name, val) {
  cart[name].qty += val;
  if (cart[name].qty <= 0) delete cart[name];
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  cartItems.innerHTML = "";

  let total = 0;

  for (let name in cart) {
    let item = cart[name];
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${name} ₹${item.price}</span>
        <div>
          <button class="qty-btn" onclick="changeQty('${name}',-1)">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty('${name}',1)">+</button>
        </div>
      </div>
    `;
  }

  totalPrice.innerText = total;
}

function placeOrder() {
  let name = custName.value.trim();
  let phone = custPhone.value.trim();
  let address = custAddress.value.trim();

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  let itemsText = "";
  let total = 0;

  for (let i in cart) {
    itemsText += `${i} x ${cart[i].qty}\n`;
    total += cart[i].price * cart[i].qty;
  }

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({
    name, phone, address,
    items: cart,
    total,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("orders", JSON.stringify(orders));

  const msg = `New Order\nName:${name}\nPhone:${phone}\nAddress:${address}\n\n${itemsText}\nTotal ₹${total}`;
  window.open(`https://wa.me/918392010029?text=${encodeURIComponent(msg)}`);

  cart = {};
  updateCartCount();
  closeCart();
      }
