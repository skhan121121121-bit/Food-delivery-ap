const foods = [
  {id:1,name:"Burger",price:120},
  {id:2,name:"Pizza",price:250},
  {id:3,name:"Biryani",price:180},
  {id:4,name:"Sandwich",price:90}
];

let cart = {};

const list = document.getElementById("food-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const modal = document.getElementById("cart-modal");
const search = document.getElementById("search");

function showFoods(arr){
  list.innerHTML="";
  arr.forEach(f=>{
    const d=document.createElement("div");
    d.className="food";
    d.innerHTML=`
      <h4>${f.name}</h4>
      <p>₹${f.price}</p>
      <button onclick="add(${f.id})">Add</button>
    `;
    list.appendChild(d);
  });
}

function add(id){
  if(cart[id]) cart[id].qty++;
  else{
    const f=foods.find(x=>x.id===id);
    cart[id]={...f,qty:1};
  }
  updateCount();
}

function updateCount(){
  let t=0;
  Object.values(cart).forEach(i=>t+=i.qty);
  cartCount.innerText=t;
}

function openCart(){
  cartItems.innerHTML="";
  if(Object.keys(cart).length===0){
    cartItems.innerHTML="<li>Cart empty</li>";
  } else {
    Object.values(cart).forEach(i=>{
      const li=document.createElement("li");
      li.innerText=`${i.name} x ${i.qty}`;
      cartItems.appendChild(li);
    });
  }
  modal.style.display="block";
}

function closeCart(){
  modal.style.display="none";
}

/* 🔥 GUARANTEED WHATSAPP */
function prepareWhatsApp(){
  if(Object.keys(cart).length===0){
    alert("Add item first");
    return;
  }

  const name=document.getElementById("cust-name").value;
  const phone=document.getElementById("cust-phone").value;
  const address=document.getElementById("cust-address").value;

  let msg="Food Order\n\n";
  msg+="Name: "+name+"\n";
  msg+="Phone: "+phone+"\n";
  msg+="Address: "+address+"\n\n";

  Object.values(cart).forEach(i=>{
    msg+=`${i.name} x ${i.qty}\n`;
  });

  document.getElementById("waLink").href =
    "https://api.whatsapp.com/send?phone=918392010029&text=" +
    encodeURIComponent(msg);
}

search.addEventListener("input",()=>{
  const v=search.value.toLowerCase();
  showFoods(foods.filter(f=>f.name.toLowerCase().includes(v)));
});

showFoods(foods);
