import { addFlowersToCart } from './addFlowersToCart.js';
import { flowerData } from './flowersRender.js';

//ADD FLOWERS TO CART
// SUMM AND SAVE FLOWERS IN CART
let homePage = () => {
  var summ = JSON.parse(localStorage.getItem('cartNumber'));
  var inCartFlowerData = JSON.parse(localStorage.getItem('inCartFlowerData'))
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

  document.addEventListener('DOMContentLoaded', () => {
    //CALL AUTH POP-UP
    const authPopUp = document.querySelector('auth-popup'); //Selecting the auth-popup shadowDom custom tag
    const authBtn = document.querySelectorAll('.authBtn'); //From header
    if (authBtn) {
      authBtn.forEach((btn) => {
        btn.onclick = () => {
          if (authPopUp) {
            authPopUp.open();
          }
        };
      });
    }
  });

  // RENDER IN SHOPPING CARD
  document.addEventListener('DOMContentLoaded', function () {
    adjustCardNumber();
    // GETTING FLOWERS FROM flowerData ARRAY
    let fromLocalStorage = JSON.parse(localStorage.getItem('inCartFlowerData'))
      ? JSON.parse(localStorage.getItem('inCartFlowerData'))
      : console.log('No items in cart');
    let parent = document.getElementById('productsInCart')
      ? document.getElementById('productsInCart')
      : null;

    // RENDERING FLOWERS TO CART DOM FROM flowerData(fromLocalStorage) ARRAY
    function renderInCart() {
      console.log('Triggered renderInCart()');
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
    if (document.body.classList.contains('cartPage')) {
      renderInCart(summ);
    }
  });
  //
};

export { homePage };
