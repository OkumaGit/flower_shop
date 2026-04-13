const orderDetails = async () => {
  // PULL NEEDED DATA
  let fromLocalStorageOrderedItems;
  fromLocalStorageOrderedItems = await JSON.parse(localStorage.getItem('orderData'));
  console.log('OrderData: ', fromLocalStorageOrderedItems);
  //

  document.addEventListener('DOMContentLoaded', async function () {
    // RENDERING ORDER DETAILS
    let orderedItems = document.createElement('div');
    orderedItems.className = 'col s12 m12 card horizontal';
    orderedItems.style.display = 'flex';
    orderedItems.style.flexDirection = 'column';
    Object.entries(fromLocalStorageOrderedItems).forEach((data) => {
      let orderedItem = document.createElement('div');
      if (data[0] != 'items') {
        if (data[0] == 'summPrice') {
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

    // RENDERING orderedItems
    let renderDetailsTo;
    renderDetailsTo = document.getElementById('fromContactForm');
    let products = document.createElement('div');
    products.className = 'col s12 m12 orderedProducts';
    // First section
    fromLocalStorageOrderedItems.items.forEach((item) => {
      products.innerHTML += `<div class="col s6 m3 card horizontal "><div class="card-image" style="padding-right: 35px;"><img class="cardImage" style="max-width: 33%" src="${item.Image}" />
      <div style="padding-right: 35px;"><div>${item.Name}</div>
    <div>x${item.Qty}</div>
    <div>$${item.Price}</div></div></div>`;
    });
    renderDetailsTo.appendChild(products);
    renderDetailsTo.appendChild(orderedItems);
    //
  });
  //
};

export { orderDetails };
