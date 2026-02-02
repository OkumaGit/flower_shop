let renderTo;
let fromLocalStorage;
let fromLocalStorageOrderedItems;
let renderDetailsTo;

// ORDER DETAILS
let orderedItems = document.createElement("div");
orderedItems.className = "col s6 m12 card horizontal";
orderedItems.style.display = "flex";
orderedItems.style.flexDirection = "column";
//

const orderDetails = () => {
  document.addEventListener("DOMContentLoaded", function () {
    renderDetailsTo = document.getElementById("fromContactForm");
    renderTo = document.getElementById("orderedProducts");
    // PULL NEEDED DATA
    fromLocalStorage = localStorage.getItem("inCartFlowerData")
      ? JSON.parse(localStorage.getItem("inCartFlowerData"))
      : console.log("Local storage was empty");
    fromLocalStorageOrderedItems = JSON.parse(
      localStorage.getItem("orderData")
    );
    console.log("OrderData: ", fromLocalStorageOrderedItems);
    //

    // RENDERING PRODUCTS FROM ORDER WITH IMAGES
    fromLocalStorage.forEach((data) => {
      let toRender = document.createElement("div");
      toRender.className = "col s6 m6";
      toRender.innerHTML = `<div class="card horizontal">
      <div class="card-image" style="max-width: 22%">
        <img class="cardImage" src="${data.Image}" />
      </div>
      <div class="card-stacked">
        <div class="card-content" style="flex-grow: 0">
          <span class="card-title">${data.Name}</span>
        </div>
        <div
          class="card-action"
          style="display: flex; align-items: center; justify-content: space-between"
        >
          <div style="flex-grow: 0"></div>
          <div class="priceAndQty" style="flex-grow: 1">
            <div>
              $${data.Price} x ${data.Qty}
            </div>
          </div>
        </div>
      </div>
    </div>`;
      renderTo.appendChild(toRender);
    });
    //

    // RENDERING ORDER DETAILS
    Object.entries(fromLocalStorageOrderedItems).forEach((data) => {
      let orderedItem = document.createElement("div");
      if (data[0] != "items") {
        if (data[0] == "summPrice") {
          orderedItem.innerHTML += `<div style="display: flex; align-items: center; width: 100%">
      <div>${data[0]}</div>
      <div style="line-height: 1; border-bottom: 1px dashed #000; height: 1em; margin: 8px 16px; flex: 1 1 auto"></div>
      <div class = "bold" style="font-weight: 700">$${data[1]}</div>
    </div>`;
        } else {
          orderedItem.innerHTML += `<div style="display: flex; align-items: center; width: 100%">
      <div>${data[0]}</div>
      <div style="line-height: 1; border-bottom: 1px dashed #000; height: 1em; margin: 8px 16px; flex: 1 1 auto"></div>
      <div>${data[1]}</div>
    </div>`;
        }
      }
      orderedItems.appendChild(orderedItem);
    });
    //

    // FINAL RENDER ITEMS FROM Array.Object
    let products = document.createElement("div");
    products.className = "col s6 m12 card horizontal orderedItems";
    // First section
    fromLocalStorageOrderedItems.items.forEach((item) => {
      products.innerHTML += `<div class="card-image" style="padding-right: 35px; max-width: 11%"><img class="cardImage" src="${item.Image}" />
      <div style="padding-right: 35px;"><div>${item.Name}</div>
    <div>x${item.Qty}</div>
    <div>$${item.Price}</div></div>`;
    });
    renderDetailsTo.appendChild(products);
    renderDetailsTo.appendChild(orderedItems);
  });
  //
};

export { orderDetails };
