import { flowerData, flowerRender } from './flowersRender.js';

//CATEGORY SELECT
let targetCategory = 'All';
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('categoryFilterButton')) {
    targetCategory = event.target.dataset.category;
    document.querySelectorAll('.categoryFilterButton').forEach((categoryFilterButton) => {
      categoryFilterButton.style.textDecoration = 'initial';
    });
    event.target.style.textDecoration = 'underline';

    //Hiding/Showing ACCORDING TO .dataset.category
    document.querySelectorAll('.cardItem').forEach((card) => {
      if (targetCategory == card.dataset.category) {
        card.style.display = '';
      } else if (targetCategory == 'All') {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    //
    sortFilter(targetCategory);
  }
});

document.addEventListener('change', function (event) {
  if (
    !event.target.classList.contains('cartQuantity') &&
    document.body.classList.contains('homePage')
  ) {
    sortFilter(targetCategory);
  }
});

let sortFilter;
document.addEventListener('DOMContentLoaded', function () {
  // SORT BY
  if (document.body.classList.contains('homePage')) {
    //SORT FEATURE

    let selects;
    sortFilter = (key) => {
      let filteredData;
      filteredData = [...flowerData];

      if (key !== 'All') {
        filteredData = filteredData.filter((data) => data.Category == key);
      }

      selects = document.querySelector('select');
      let instances = M.FormSelect.init(selects);
      // console.log("Initialized:", instances ? instances.length : 0);

      //SORT BY PRICE
      if (selects.value == 'Price') {
        filteredData.sort((a, b) => a.Price - b.Price);
      }
      //
      //SORT BY NAME ALPHABETICAL
      else if (selects.value == 'Name') {
        filteredData.sort((a, b) => {
          if (a.Name > b.Name) return 1;
          if (a.Name < b.Name) return -1;
          return 0;
        });
      }
      flowerRender(filteredData);
      //
    };
    //
    sortFilter();
  }
  //
});
//

export { sortFilter };
