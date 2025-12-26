const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbynsHaCs2yHJJvPY9luXFNjekm8gSLt1NxchsbRA_fWCd-mXNitG73U0uWrzOF_3ls3Ww/exec";

let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push(name + " ₹" + price);
  total += price;

  document.getElementById("cart").innerHTML =
    cart.map(i => "<li>" + i + "</li>").join("");

  document.getElementById("total").innerText = total;
}

function placeOrder() {
  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    items: cart.join(", "),
    total: total
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(txt => alert(txt))
  .catch(err => alert("Error"));
}
