import { flowerData } from "./modules/flowersRender.js";
import { sendOrder } from "./modules/sendOrder.js";

//ADD FLOWERS TO CART
// SUMM AND SAVE FLOWERS IN CART
var summ = JSON.parse(localStorage.getItem("cartNumber"));
var inCartFlowerData = JSON.parse(localStorage.getItem("inCartFlowerData"))
  ? JSON.parse(localStorage.getItem("inCartFlowerData"))
  : [];
var selectedItem = {};
//

function addFlowersToCart(event) {
  if (event.target.className == "addToCartButton") {
    const inputQty = event.target
      .closest(".col")
      .querySelector(".cartQuantity").value;
    selectedItem = flowerData.find(
      (item) =>
        item.Name ===
        event.target.closest(".card").querySelector(".card-title").textContent
    );

    // WHEN SIMILAR EXISTS, JUST UPDATE QTY
    if (inCartFlowerData.find((data) => data === selectedItem)) {
      selectedItem.Qty += parseInt(inputQty);
    } else {
      selectedItem.Qty = parseInt(inputQty);
      inCartFlowerData.push(selectedItem);
      // console.log("pushed to inCartFlowerData", selectedItem); DEBUGGING
    }
    localStorage.setItem("inCartFlowerData", JSON.stringify(inCartFlowerData));
    adjustCardNumber(summ);
  }
}
//

//FUNCTION TO DELETE CARD-ITEM FROM CART
function deleteCardItem(event) {
  // DELETE CARD-ITEM FROM CART
  if (event.target.classList.contains("cardDeleteItem")) {
    inCartFlowerData = JSON.parse(localStorage.getItem("inCartFlowerData"));
    inCartFlowerData = inCartFlowerData.filter(
      (item) =>
        item.Name !==
        event.target.closest(".col").querySelector(".card-title").textContent
    );
    localStorage.setItem("inCartFlowerData", JSON.stringify(inCartFlowerData));

    event.target.closest(".col").remove();
    // UPDATING summPrice
    inCartFlowerData.forEach((data) => {
      summPrice += data.Price * data.Qty;
    });
  }
  //
  adjustCardNumber(summ);
}
//

// LISTEN FOR CLICK
document.addEventListener("click", function (event) {
  // UPDATING QTY IN inCartFlowerData
  if (event.target.id == "cardQuantity") {
    const cardTitle = event.target.closest(".col").querySelector(".card-title");
    const cardQuantity = event.target
      .closest(".col")
      .querySelector("#cardQuantity").value;
    const item = inCartFlowerData.find((item) => {
      if (item.Name == cardTitle.textContent) {
        item.Qty = cardQuantity;
        localStorage.setItem(
          "inCartFlowerData",
          JSON.stringify(inCartFlowerData)
        );
      }
    });

    // console.log(cardQuantity);
    adjustTotalPrice();
  }
  //TRIGGER DELETING CARTITEM
  else if (event.target.className == "cardDeleteItem") {
    deleteCardItem(event);
    adjustTotalPrice();
  } //TRIGGER ADDING FLOWERS TO CART
  else {
    addFlowersToCart(event);
  }
});

//ADJUST CART NUMBER
function adjustCardNumber(summ) {
  var cartNumber = document.getElementById("cartNumber");

  summ = 0;
  inCartFlowerData.forEach((item) => {
    summ += parseInt(item.Qty);
  });
  localStorage.setItem("cartNumber", JSON.stringify(summ));
  cartNumber.innerHTML = JSON.parse(localStorage.getItem("cartNumber")) || 0;
}
//

//ADJUST PRICE IN CART
var summPrice = 0;
var totalPrice = document.querySelector(".totalPrice");
function adjustTotalPrice() {
  const summPrice = 0;
  inCartFlowerData.forEach((item) => {
    summPrice += item.Price * item.Qty;
  });
  totalPrice.innerHTML = `$${summPrice}`;
}

// RENDER IN SHOPPING CARD
document.addEventListener("DOMContentLoaded", function () {
  adjustCardNumber(summ);
  // GETTING FLOWERS FROM flowerData ARRAY
  var fromLocalStorage = JSON.parse(localStorage.getItem("inCartFlowerData"))
    ? JSON.parse(localStorage.getItem("inCartFlowerData"))
    : console.log("No items in cart");
  var parent = document.getElementById("productsInCart")
    ? document.getElementById("productsInCart")
    : null;

  // RENDERING FLOWERS TO DOM FROM flowerData(fromLocalStorage) ARRAY
  function renderInCart() {
    fromLocalStorage.forEach((data) => {
      var newDiv = document.createElement("div");
      newDiv.className = "col s12 m12";
      newDiv.innerHTML = `<div class="card horizontal">
            <div class="card-image" style="max-width: 33%">
                      <img class ='cardImage' src="${data.Image}" />
            </div>
            <div class="card-stacked">
                      <div class="card-content" style="flex-grow: 0">
                        <span class="card-title">${data.Name}</span>
                      </div>
                      <div class="card-action" style="display: flex; align-items: center; justify-content: space-between"> 
                      <div style='flex-grow: 0'>
                      <a href='#' ><img class='cardDeleteItem' src='./src/cancel_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg' /></a>
                      </div>
                      
                           <div class='priceAndQty' style='flex-grow: 1'> 
                                  <div>$${data.Price}</div>
                          <input
                          type="number"
                          id="cardQuantity"
                          name="cardQuantity"
                          min="0"
                          max="5"
                          value="${data.Qty}"
                          />
                          </div>
                      </div>
            </div>
                              </div>`;
      parent ? parent.appendChild(newDiv) : null;
    });
  }
  renderInCart(summ);
});
//

// DEFINE AND SHOW WHICH PAGE WE ARE ATM
document.addEventListener("DOMContentLoaded", function () {
  if (document.body.classList.contains("cartPage")) {
    console.log("we are at CartPage");
    // LISTEN FOR CHANGE IN INPUT.VALUE IN CART

    document
      .getElementById("productsInCart")
      .addEventListener("change", function (event) {
        //FIND and UPDATE QTY in inCartFlowerData
        var foundItem = inCartFlowerData.find(
          (item) =>
            item.Name ==
            event.target.closest(".col").querySelector(".card-title").innerHTML
        );

        foundItem.Qty = parseInt(
          event.target.closest(".col").querySelector("#cardQuantity").value
        );
        adjustCardNumber();
      });
    //

    // CHECK IF CART AND FORM == FILLED
    function checkIfLegit() {
      const sbmtBtn = document.querySelector(".submitOrder");
      if (document.getElementById("productsInCart").children.length > 0) {
        sbmtBtn.classList.remove("disabled");
      } else {
        sbmtBtn.classList.add("disabled");
      }
    }
    document.addEventListener("change", function () {
      checkIfLegit();
    });
    document.addEventListener("click", function () {
      checkIfLegit();
    });
    //
  }

  // HOMEPAGE
  else if (document.body.classList.contains("homePage")) {
    console.log("we are at Homepage");
  }
});
