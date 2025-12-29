import config from "../config.js";

let formData = [];
let formCheck;
document.addEventListener("DOMContentLoaded", function () {
  formData = [
    { name: "first_name", element: document.querySelector(".first_name") }, // Required
    { name: "last_name", element: document.querySelector(".last_name") },
    { name: "phone", element: document.querySelector(".phone") }, // Required
    { name: "email", element: document.querySelector(".email") },
    { name: "address", element: document.querySelector(".address") }, // Required
  ];
  formCheck = document.querySelector(".form");
});

// CHECK IF CART AND FORM == FILLED
let isValid = false;
let orderData = {};
const sbmtBtn = document.querySelector(".submitOrder");

function checkIfLegit() {
  const allFilled = formCheck.checkValidity();
  console.log("allFilled is: ", allFilled);
  formData.forEach(({ name, element }) => {
    if (element.value.trim() !== "") {
      orderData[name] = element.value;
    }
  });
  console.log("orderData from forEach: ", orderData);

  if (
    document.body.classList.contains("cartPage") ||
    (orderData.first_name.trim() !== "" &&
      orderData.phone.trim() !== "" &&
      !isNaN(orderData.phone) &&
      orderData.address.trim() !== "" &&
      isNaN(orderData.first_name) &&
      isNaN(orderData.last_name))
  ) {
    // STOPPED HERE
    isValid = true;
  } else {
    isValid = false;
    console.log("Error");
  }

  if (
    document.getElementById("productsInCart").children.length > 0 &&
    isValid == true
  ) {
    sbmtBtn.classList.remove("disabled");
  } else {
    sbmtBtn.classList.add("disabled");
  }
}

// REMOVING 'DISABLED' CLASS
//TRIGGERING checkIfLegit()
if (document.body.classList.contains("cartPage")) {
  document.addEventListener("change", function () {
    console.log("Change detected, getting checked");
    checkIfLegit();
  });
}
//

// SENDING ORDER TO DB
const sendOrder = async function sendOrder(inCartFlowerData, summPrice) {
  console.log(
    "sendOrder function called, order before sending is: ",
    orderData,
    summPrice
  );
  orderData.summPrice = summPrice;
  orderData.items = inCartFlowerData;
  localStorage.setItem("orderData", JSON.stringify(orderData));
  const response = await fetch(`${config.API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData), // Sending data to DB
  });
  const result = await response.json();
  console.log("result is: ", result); // { message: "Recieved!", ... }
  localStorage.removeItem("inCartFlowerData");
};

export { sendOrder };
//   const orderData = {
//     customerName: "Ivory",
//     items: ["Rose", "Tulip"],
//     total: 50,
//   };
// const response = await fetch("http://localhost:4000/api/orders"
