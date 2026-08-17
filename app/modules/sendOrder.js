import config from '../config.js';

let formData = [];

document.addEventListener('DOMContentLoaded', function () {
  formData = [
    { name: 'first_name', element: document.querySelector('.first_name') }, // Required
    { name: 'last_name', element: document.querySelector('.last_name') },
    { name: 'phone', element: document.querySelector('.phone') }, // Required
    { name: 'email', element: document.querySelector('.email') },
    { name: 'address', element: document.querySelector('.address') }, // Required
  ];
});

// CHECK IF CART AND FORM == FILLED
let isValid = false;
let orderData = {};
const sbmtBtn = document.querySelector('.submitOrder');

function checkIfLegit() {
  //CHECK FORM IF VALID
  let formCheck = document.querySelector('.form');

  const allFilled = formCheck.checkValidity(); //AS EXTRA DEFAULT BROWSER CHECK METHOD
  !allFilled ? formCheck.reportValidity() : [];
  //

  formData.forEach(({ name, element }) => {
    if (element.value.trim() !== '') {
      orderData[name] = element.value;
    }
  });
  console.log('orderData from forEach: ', orderData);
  if (allFilled) {
    if (
      orderData.first_name.trim() !== '' &&
      isNaN(orderData.first_name) &&
      orderData.last_name.trim() !== '' &&
      isNaN(orderData.last_name) &&
      orderData.phone.trim() !== '' &&
      !isNaN(orderData.phone) &&
      orderData.address.trim() !== ''
    ) {
      //LEFT HERE
      isValid = true;
    } else {
      isValid = false;
      console.log('Error in entered data');
    }
  }

  if (
    document.getElementById('productsInCart').children.length > 0 &&
    isValid === true &&
    allFilled === true
  ) {
    sbmtBtn.classList.remove('disabled');
  } else {
    sbmtBtn.classList.add('disabled');
  }
}

// REMOVING 'DISABLED' CLASS
//TRIGGERING checkIfLegit()
if (document.body.classList.contains('cartPage')) {
  document.addEventListener('change', function () {
    console.log('Change detected, getting checked');
    checkIfLegit();
  });
}
//

// SENDING ORDER TO DB
const sendOrder = async function sendOrder(inCartFlowerData, summPrice) {
  console.log('sendOrder function called, order before sending is: ', orderData, summPrice);
  orderData.time = Date.now(); // Makes a timestamp
  orderData.summPrice = summPrice;
  orderData.items = inCartFlowerData;
  localStorage.setItem('orderData', JSON.stringify(orderData));
  // Sending data to DB
  const response = await fetch(`${config.API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  //
  const result = await response.json();
  console.log('result is: ', result); // { message: "Recieved!", ... }
  localStorage.removeItem('inCartFlowerData');
};
//

export { sendOrder };
