import config from "../config.js";

const getProducts = async function getProducts() {
  try {
    // const response = await fetch("http://localhost:4000/api/products");
    const response = await fetch(`${config.API_URL}/api/products`);
    const fetchedFlowerData = await response.json();
    return fetchedFlowerData;
  } catch (error) {
    console.log(error);
  }
};

//// SORT BY
// SORT BY RENDER
let selects;
document.addEventListener("DOMContentLoaded", function () {
  selects = document.querySelector("select");
  //   console.log("Found selects:", selects.length, selects.value);
  var instances = M.FormSelect.init(selects);
  console.log("Initialized:", instances.length);
  // LISTEN FOR CHANGE
  selects.addEventListener("change", function () {
    if (selects.value == "Price") {
      createFlowers();
    } else if (selects.value == "Name") {
      createFlowers();
    }
  });
});

// INITIAL RENDER OF ALL FLOWERS
// LOCAL DB
let flowerData = [
  // {
  //   id: 1,
  //   Name: "Rose Bouquet",
  //   Price: 25,
  //   Image: "src/Gemini_Generated_Image_tnsfn4tnsfn4tnsf.png",
  //   Category: "Romantic",
  // },
  // {
  //   id: 5,
  //   Name: "FFloweName4",
  //   Price: 6,
  //   Image: "src/Gemini_Generated_Image_sypnzqsypnzqsypn.png",
  //   Category: "Flowery fragarant",
  // },
  // {
  //   id: 2,
  //   Name: "Tulip Joy",
  //   Price: 15,
  //   Image: "src/Gemini_Generated_Image_sypnzqsypnzqsypn.png",
  //   Category: "Spring",
  // },
  // {
  //   id: 3,
  //   Name: "FFloweName4",
  //   Price: 6,
  //   Image: "src/Gemini_Generated_Image_tnsfn4tnsfn4tnsf.png",
  //   Category: "Flowery Fragrant",
  // },
];
//

const createFlowers = async function createFlowers() {
  flowerData = await getProducts();
  const parent = document.getElementById("insertHere");
  //SORT BY PRICE
  if (selects.value == "Price") {
    parent.innerHTML = "";
    flowerData.sort((a, b) => a.Price - b.Price);

    //SORT BY NAME ALPHABETICAL
  } else if (selects.value == "Name") {
    parent.innerHTML = "";
    flowerData.sort((a, b) => {
      if (a.Name > b.Name) {
        return 1;
      }
      if (a.Name < b.Name) {
        return -1;
      }
      return 0;
    });
  }
  //

  // RENDERING FLOWERS TO DOM FROM flowerData ARRAY
  flowerData.forEach((data) => {
    var flower = document.createElement("div");
    flower.className = "cardItem col s6 m3";
    flower.dataset.category = data.Category;
    flower.innerHTML = `
      <div class="card">
        <div class="card-image" data-category="Bloomwell">
          <img class="cardImage" style="width: 100%" src=${data.Image} />
          <span class="card-title">${data.Name}</span>             
        </div>
        <div class="card-content">
                <p>$${data.Price}</p>
                 <input
                  type="number"
                  id = 'cartQuantity'
                  class="cartQuantity"
                  name="cartQuantity"
                  min="1"
                  max="5"
                  value="1"
                />
              </div>
              <div id="card-action" class="card-action">
                <a id="addToCartButton" class="addToCartButton" href="#">Add to cart</a>
              </div>
      </div>`;
    parent.appendChild(flower);
  });
};

//EXECUTE initial createFlowers()
document.addEventListener("DOMContentLoaded", async function () {
  await createFlowers();
});
//

//CATEGORY SELECT
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".categoryFilterButton")
    .forEach((categoryFilterButton) => {
      //LISTEN FOR CLICK AT categoryFilterButton
      categoryFilterButton.addEventListener("click", (event) => {
        event.preventDefault();
        var buttonCategory = categoryFilterButton.dataset.category;
        //RENDERING ACCORDING TO .dataset.category
        document.querySelectorAll(".cardItem").forEach((card) => {
          if (buttonCategory == card.dataset.category) {
            card.style.display = "none";
          } else if (buttonCategory == "All") {
            card.style.display = "";
          } else {
            card.style.display = "";
          }
        });
      });
    });
});

export { createFlowers, getProducts, flowerData };
