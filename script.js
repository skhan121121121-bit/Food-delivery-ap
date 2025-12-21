let cart = {};

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price: price, qty: 1 };
  }
  updateCartCount();
}

function updateCartCount() {
  let count = 0;
  for (let item in cart) {
    count += cart[item].qty;
  }
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

function changeQty(name, change) {
  cart[name].qty += change;
  if (cart[name].qty <= 0) {
    delete cart[name];
  }
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");

  cartItems.innerHTML = "";
  let total = 0;

  for (let name in cart) {
    const item = cart[name];
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${name} (₹${item.price})</span>
        <div>
          <button class="qty-btn" onclick="changeQty('${name}',-1)">−</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty('${name}',1)">+</button>
        </div>
      </div>
    `;
  }

  totalPriceEl.innerText = total;
}

function placeOrder() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  let msg = "🍔 New Food Order\n\n";
  msg += `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n`;

  let total = 0;
  for (let item in cart) {
    msg += `${item} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}\n`;
    total += cart[item].price * cart[item].qty;
  }

  msg += `\nTotal: ₹${total}`;

  const whatsapp = "8392010029";
  window.open(
    `https://wa.me/91${whatsapp}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
