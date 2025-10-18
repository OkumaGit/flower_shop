import config from "../config.js";

const sendOrder = async function sendOrder(inCartFlowerData, summPrice) {
  console.log("sendOrder function called");

  //   const orderData = {
  //     customerName: "Ivory",
  //     items: ["Rose", "Tulip"],
  //     total: 50,
  //   };

  // const response = await fetch("http://localhost:4000/api/orders"

  // SUBMIT ORDER

  // const sbmtBtn = document.querySelector(".submitOrder");
  // sbmtBtn.addEventListener("click", function () {

  // });

  const first_name = document.querySelector(".first_name");
  const last_name = document.querySelector(".last_name");
  const phone = document.querySelector(".phone");
  const email = document.querySelector(".email");
  const address = document.querySelector(".address");
  const orderData = {
    firstName: first_name.value ? first_name.value : "",
    lastName: last_name.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
    items: inCartFlowerData,
    summPrice: summPrice,
    date: new Date(),
  };
  console.log("order is: ", orderData);

  const response = await fetch(`${config.API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData), // Отправляем данные
  });

  const result = await response.json();
  console.log("result is: ", result); // { message: "Заказ получен!", ... }
};

sendOrder();

export { sendOrder };
