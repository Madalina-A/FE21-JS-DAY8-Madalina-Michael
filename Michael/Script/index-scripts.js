let flowers = JSON.parse(flowers2);
for (let val of flowers) {
  document.getElementById(
    "my-grid"
  ).innerHTML += `<div class="col-12 col-md-6 col-lg-4"><div class="card" style="width: 18rem;">
  <img src=${val.image} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${val.name}</h5>
    <p class="card-text">${val.description}</p>
    <h6>Price: ${val.price}&#128;</h6>
    <button class="cartAdd btn btn-primary">Add to cart</button>
  </div>
</div></div>`;
}
function createRow() {
  var result = "";
  /* <i class="plus fa fa-plus-circle my-auto">+</i> 
<i class="minus fa fa-minus-circle my-auto" >-</i>
*/
  for (let val of cart) {
    result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src=${val.image} width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
       
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <button type="button" class="minus btn btn-secondary rounded-circle  my-auto">-</button>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <button type="button" class="plus btn btn-info rounded-circle  my-auto">+</button>        
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
  }
  document.getElementById("my-items").innerHTML = result;
  let plus = document.getElementsByClassName("plus");
  let minus = document.getElementsByClassName("minus");
  let delbt = document.getElementsByClassName("del");
  for (let index = 0; index < plus.length; index++) {
    plus[index].addEventListener("click", function () {
      addCart(cart[index]);
    });
    minus[index].addEventListener("click", function () {
      cartMinus(index);
    });
    delbt[index].addEventListener("click", function () {
      delfunction(index);
    });
  }
}
var cart = [];
var cardinality = 0;
function addCart(object) {
  if (cart.length === 0) {
    cart.push(object);
  } else if (cart.find((val) => val.name === object.name)) {
    object.qtty++;
  } else {
    cart.push(object);
  }
  cardinality++;
  createRow();
  document.getElementById("my-cardinality").innerHTML = cardinality;
  total();
}
for (let index = 0; index < flowers.length; index++) {
  document
    .getElementsByClassName("cartAdd")
    [index].addEventListener("click", function () {
      addCart(flowers[index]);
    });
}
function total() {
  let sum = 0;
  for (let index = 0; index < cart.length; index++) {
    sum = sum + cart[index].price * cart[index].qtty;
  }
  if (100 <= sum) {
    let a = sum - sum / 10;
    document.getElementById("price").innerHTML =
      "You get 10% off, hence:" + a + "€";
  } else {
    document.getElementById("price").innerHTML = sum + "€";
  }
}
function cartMinus(j) {
  if (cart[j].qtty === 1) {
    cart.splice(j, 1);
    createRow();
  } else {
    cart[j].qtty -= 1;
    document.getElementsByClassName("cart-quantity")[j].innerHTML =
      cart[j].qtty;
  }
  total();
  cardinality -= 1;
  document.getElementById("my-cardinality").innerHTML = cardinality;
}
function delfunction(j) {
  cardinality = cardinality - cart[j].qtty;
  document.getElementById("my-cardinality").innerHTML = cardinality;
  cart[j].qtty = 1;
  cart.splice(j, 1);
  total();
  createRow();
}
