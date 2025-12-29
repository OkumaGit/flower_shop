let renderTo;
let fromLocalStorage;
let fromLocalStorageOrderedItems;
let renderDetailsTo;

const orderDetails = () => {
  // PULL NEEDED DATA
  document.addEventListener("DOMContentLoaded", function () {
    renderDetailsTo = document.getElementById("fromContactForm");
    renderTo = document.getElementById("orderedProducts");
    fromLocalStorage = localStorage.getItem("inCartFlowerData")
      ? JSON.parse(localStorage.getItem("inCartFlowerData"))
      : console.log("Local storage was empty");
    fromLocalStorageOrderedItems = JSON.parse(
      localStorage.getItem("orderData")
    );
    console.log("OrderData: ", fromLocalStorageOrderedItems);

    // RENDERING WITH FOREACH

    fromLocalStorage.forEach((data) => {
      let toRender = document.createElement("div");
      toRender.className = "col s6 m6";
      toRender.innerHTML = `<div class="card horizontal">
      <div class="card-image" style="max-width: 33%">
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

    // RENDERING WITH FOREACH
    Object.entries(fromLocalStorageOrderedItems).forEach((data) => {
      let orderedItem = document.createElement("div");
      console.log("data :", data);
      if (data[0] != "items") {
        if (data[0] == "summPrice") {
          orderedItem.innerHTML += `<div style="display: flex; align-items: center; width: 100%">
      <div>${data[0]}</div>
      <div style="line-height: 1; border-bottom: 1px dashed #000; height: 1em; margin: 16px; flex: 1 1 auto"></div>
      <div class = "bold" style="font-weight: 700">$${data[1]}</div>
    </div>`;
        } else {
          orderedItem.innerHTML += `<div style="display: flex; align-items: center; width: 100%">
      <div>${data[0]}</div>
      <div style="line-height: 1; border-bottom: 1px dashed #000; height: 1em; margin: 16px; flex: 1 1 auto"></div>
      <div>${data[1]}</div>
    </div>`;
        }
      }
      orderedItems.appendChild(orderedItem);
    });
    //

    // RENDERING ITEMS FROM Array.Object
    let products = document.createElement("div");
    products.className = "col s6 m12 card horizontal orderedItems";

    fromLocalStorageOrderedItems.items.forEach((item) => {
      products.innerHTML += `<div style="padding-right: 35px;"><div>${item.Name}</div>
    <div>x${item.Qty}</div>
    <div>$${item.Price}</div></div>`;
    });
    renderDetailsTo.appendChild(products);
    renderDetailsTo.appendChild(orderedItems);
  });
  //

  // ORDER DETAILS
  let orderedItems = document.createElement("div");
  orderedItems.className = "col s6 m12 card horizontal";
  orderedItems.style.display = "flex";
  orderedItems.style.flexDirection = "column";
};
export { orderDetails };
