import { flowerData, flowerRender } from "./flowersRender.js";

//CATEGORY SELECT
let targetCategory = "All";
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("categoryFilterButton")) {
    targetCategory = event.target.dataset.category;
    document
      .querySelectorAll(".categoryFilterButton")
      .forEach((categoryFilterButton) => {
        categoryFilterButton.style.textDecoration = "initial";
      });
    event.target.style.textDecoration = "underline";

    console.log("targetCategory changed to: ", targetCategory);

    //Hiding/Showing ACCORDING TO .dataset.category
    document.querySelectorAll(".cardItem").forEach((card) => {
      console.log("Triggered for: ", card);
      if (targetCategory == card.dataset.category) {
        card.style.display = "";
      } else if (targetCategory == "All") {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
    //
    sortBy(targetCategory);
  }
});

document.addEventListener("change", function (event) {
  //STOPPED HERE
  console.log("targetCategory is: ", targetCategory);
  if (!event.target.classList.contains("cartQuantity")) {
    sortBy(targetCategory);
  }
});

let sortFilter = () => {};
let sortBy;
let selects;
sortBy = (key) => {
  console.log("sortBy");
  let filteredData;
  filteredData = [...flowerData];
  console.log("filteredData before: ", filteredData);

  if (key !== "All") {
    console.log("key in sortBy if: ", key);
    filteredData = filteredData.filter((data) => data.Category == key);
    console.log("after filter: ", filteredData);
  }

  selects = document.querySelector("select");
  let instances = M.FormSelect.init(selects);
  // console.log("Initialized:", instances ? instances.length : 0);

  //SORT BY PRICE
  if (selects.value == "Price") {
    console.log("Triggered Price");
    filteredData.sort((a, b) => a.Price - b.Price);
  }
  //SORT BY NAME ALPHABETICAL
  else if (selects.value == "Name") {
    console.log("Triggered Name");
    filteredData.sort((a, b) => {
      if (a.Name > b.Name) return 1;
      if (a.Name < b.Name) return -1;
      return 0;
    });
  }
  flowerRender(filteredData);
  //
  //
};

document.addEventListener("DOMContentLoaded", function () {
  //// SORT BY
  if (document.body.classList.contains("homePage")) {
    sortBy();
  }
});
//

// document.addEventListener("change", function () {});

export { sortFilter };
