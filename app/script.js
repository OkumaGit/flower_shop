import { homePage } from "./modules/homePage.js";
import { orderDetails } from "./modules/orderDetails.js";

homePage();
// HOMEPAGE
if (document.body.classList.contains("homePage")) {
  console.log("we are at Homepage");
} else if (document.body.classList.contains("orderDetails")) {
  console.log("we are at orderDetails");
  orderDetails();
}
