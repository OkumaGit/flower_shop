import config from '../config.js';
import { sortFilter } from './sortFilter.js';

// fetchingData from DB
const getProducts = async function getProducts() {
  try {
    // const response = await fetch("http://localhost:4000/api/products");
    const startTime = Date.now();
    //
    const response = await fetch(`${config.API_URL}/api/products`);
    // Time
    const endTime = Date.now();
    console.log('fetch time: ', (endTime - startTime) / 1000);
    //
    const fetchedFlowerData = await response.json();
    return fetchedFlowerData;
  } catch (error) {
    console.log(error);
  }
};
//

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

const parent = document.getElementById('insertHere');
const createFlowers = async function createFlowers() {
  flowerData = await getProducts();
  console.log('flowerData', flowerData);
  flowerRender(flowerData);
};

// RENDERING FLOWERS TO DOM FROM flowerData ARRAY
let flowerRender = (flowerData) => {
  parent.innerHTML = '';

  flowerData.forEach((data) => {
    var flower = document.createElement('div');
    flower.className = 'cardItem col s6 m2';
    flower.dataset.category = data.Category; //Set card's category from DB
    flower.innerHTML = `
      <div class="card">
        <div class="card-image">
          <img class="cardImage" style="width: 100%" src=${data.Image} />
          <span class="card-title">${data.Name}</span>             
        </div>
        <div class="card-content">
                <p class='card-price'>$${data.Price}</p>
                 <input
                  type="number"
                  class="cartQuantity"
                  name="cartQuantity"
                  min="1"
                  max="5"
                  value="1"
                />
              </div>
              <div id="card-action" class="card-action">
                <button id="addToCartButton" class="addToCartButton" href="#">Add to cart</button>
              </div>
      </div>`;
    parent.appendChild(flower);
  });
};
//

// Async DOMCOntentLoaded Listener
document.addEventListener('DOMContentLoaded', async function () {
  //EXECUTE initial createFlowers()
  if (document.body.classList.contains('homePage')) {
    await createFlowers();
  }
});
//

export { createFlowers, flowerData, flowerRender };
