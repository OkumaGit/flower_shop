// var inCartFlowerData = JSON.parse(localStorage.getItem("inCartFlowerData"))
//   ? JSON.parse(localStorage.getItem("inCartFlowerData"))
//   : [];

var selectedItem = {};
//

function addFlowersToCart(
  event,
  flowerData,
  adjustCardNumber,
  inCartFlowerData
) {
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
    }
    localStorage.setItem("inCartFlowerData", JSON.stringify(inCartFlowerData));
    adjustCardNumber();
  }
}
//

export { addFlowersToCart };
