import { flowerData } from './flowersRender.js';
import { sendOrder } from './sendOrder.js';
import { addFlowersToCart } from './addFlowersToCart.js';

//ADD FLOWERS TO CART
// SUMM AND SAVE FLOWERS IN CART
let cartPage = () => {
  let summ = JSON.parse(localStorage.getItem('cartNumber'));
  let inCartFlowerData = JSON.parse(localStorage.getItem('inCartFlowerData'))
    ? JSON.parse(localStorage.getItem('inCartFlowerData'))
    : [];

  //FUNCTION TO DELETE CARD-ITEM FROM CART
  function deleteCardItem(event) {
    // DELETE CARD-ITEM FROM CART
    if (event.target.classList.contains('cardDeleteItem')) {
      inCartFlowerData = JSON.parse(localStorage.getItem('inCartFlowerData'));
      inCartFlowerData = inCartFlowerData.filter(
        (item) =>
          item.Name !== event.target.closest('.col').querySelector('.card-title').textContent
      );
      localStorage.setItem('inCartFlowerData', JSON.stringify(inCartFlowerData));
      console.log(
        'Delete triggered',
        event.target.closest('.col').querySelector('.card-title').textContent
      );
      event.target.closest('.col').remove();

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
  document.addEventListener('click', function (event) {
    // UPDATING QTY IN inCartFlowerData
    if (event.target.id == 'cardQuantity') {
      const cardTitle = event.target.closest('.col').querySelector('.card-title');
      const cardQuantity = event.target.closest('.col').querySelector('#cardQuantity').value;
      const item = inCartFlowerData.find((item) => {
        if (item.Name == cardTitle.textContent) {
          item.Qty = cardQuantity;
          localStorage.setItem('inCartFlowerData', JSON.stringify(inCartFlowerData));
        }
      });
      adjustTotalPrice();
    }
    //TRIGGER DELETING CARTITEM
    else if (event.target.className == 'cardDeleteItem') {
      deleteCardItem(event);
      adjustTotalPrice();
    } //TRIGGER ADDING FLOWERS TO CART
    else {
      addFlowersToCart(event, flowerData, adjustCardNumber, inCartFlowerData);
    }
  });
  //

  //ADJUST CART NUMBER
  function adjustCardNumber() {
    console.log('adjustCardNumber called');
    var cartNumber = document.getElementById('cartNumber');
    summ = 0;
    inCartFlowerData.forEach((item) => {
      summ += parseInt(item.Qty);
    });
    localStorage.setItem('cartNumber', JSON.stringify(summ));
    cartNumber.innerHTML = JSON.parse(localStorage.getItem('cartNumber')) || 0;
  }
  //

  //ADJUST PRICE IN CART
  var summPrice = 0; //
  function adjustTotalPrice() {
    var totalPrice = document.querySelector('.totalPrice'); //
    summPrice = 0;
    inCartFlowerData.forEach((item) => {
      summPrice += item.Price * item.Qty;
    });
    totalPrice.innerHTML = `$${summPrice}`;
  }
  //

  // GETTING FLOWERS FROM flowerData ARRAY
  let fromLocalStorage = JSON.parse(localStorage.getItem('inCartFlowerData'))
    ? JSON.parse(localStorage.getItem('inCartFlowerData'))
    : console.log('No items in cart');
  let parent = document.getElementById('productsInCart')
    ? document.getElementById('productsInCart')
    : null;
  //

  // RENDER IN SHOPPING CARD
  document.addEventListener('DOMContentLoaded', function () {
    adjustCardNumber();

    // DEFINE AND SHOW WHICH PAGE WE ARE ATM
    if (document.body.classList.contains('cartPage')) {
      renderInCart(summ);
    }
    if (document.body.classList.contains('cartPage')) {
      adjustTotalPrice(); // UPDATE SUMMARY PRICE IN CART
      // SUBMIT ORDER
      const sbmtBtn = document.querySelector('.submitOrder');
      sbmtBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log('script from HP.js worked');
        await sendOrder(inCartFlowerData, summPrice);
        M.toast({ html: 'Order Sent', classes: 'green', displayLength: 3000 });

        //If card payment method selected
        const cardChecker = document.querySelector('.withCard');
        if (cardChecker.checked == true) {
          setTimeout(() => {
            window.location.href = `?`;
          }, 1000);
        }
        //
        setTimeout(() => {
          window.location.href = `./orderDetails.html`;
        }, 1000);
      });
      console.log('we are at CartPage');
      // LISTEN FOR CHANGE IN INPUT.VALUE IN CART
      document.getElementById('productsInCart').addEventListener('change', function (event) {
        //FIND and UPDATE QTY in inCartFlowerData
        var foundItem = inCartFlowerData.find(
          (item) => item.Name == event.target.closest('.col').querySelector('.card-title').innerHTML
        );

        foundItem.Qty = parseInt(event.target.closest('.col').querySelector('#cardQuantity').value);
        adjustCardNumber();
      });
      //
    }
  });
  //

  // RENDERING FLOWERS TO CART DOM FROM flowerData(fromLocalStorage) ARRAY
  function renderInCart() {
    console.log('Triggered renderInCart()');

    if (!fromLocalStorage || fromLocalStorage.length === 0) {
      var newDiv = document.createElement('div');
      newDiv.className = 'col s12 m12';
      newDiv.style = 'height: 100%';
      newDiv.innerHTML = `<div style="display: flex;width: 100%;height: 100%; opacity: 50%; align-items: center;justify-content: center;"><h5>No products in cart</h5></div>`;
      parent ? parent.appendChild(newDiv) : null;
    } else {
      fromLocalStorage.forEach((data) => {
        var newDiv = document.createElement('div');
        newDiv.className = 'col s12 m12';
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
                          value="${data.Qty}"
                          />
                          </div>
                      </div>
            </div>
            </div>`;
        parent ? parent.appendChild(newDiv) : null;
      });
    }
  }
  //
};

export { cartPage };
