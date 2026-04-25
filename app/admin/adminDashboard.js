import { getOrdersList, deleteOrder } from './adminMain.js';
let fetchOrders;
let spanValue = 5;
let table = document.getElementById('table'); // Capture initial <table>

//FETCH ORDER LIST AND POPULATE tbody
let fetchOrderList = async function () {
  fetchOrders = await getOrdersList();
  console.log('fetchOrders', fetchOrders);
  reRenderTable();
};
//

//RENDER TABLE WITH ORDER DATA
let reRenderTable = () => {
  let tbodyAll = table.querySelectorAll('.tableElement');
  tbodyAll.forEach((element) => {
    element.remove();
  });

  //ADDING all "tbody" to the "table"
  fetchOrders.forEach((element, index) => {
    console.log('Element: ', element, '+ inputValue', inputMain.value);
    // if (index < spanValue && element.Name.toLowerCase().includes(inputMain.value.toLowerCase())){}
    if (
      (index < spanValue &&
        element.items.find((itemsElement) => {
          return itemsElement.Name.toLowerCase().includes(inputMain.value.toLowerCase());
        })) ||
      element._id.toLowerCase().includes(inputMain.value.toLowerCase())
    ) {
      let tbody = document.createElement('tr');
      tbody.classList.add('tableElement');
      tbody.innerHTML = `
                    <td class="td-dashboard">
                    <label>
                        <input type="checkbox" class="filled-in" />
                        <span></span>
                      </label>
                    </td>
                    <td class="td-dashboard orderId">${element._id}</td>
                    <td class="td-dashboard">-</td>
                    <td class="td-dashboard">-</td>
                    <td class="td-dashboard">${element.items
                      .map((item) => {
                        return `${item.Name} x${item.Qty}`;
                      })
                      .join(', ')}</td>
                    <td class="td-dashboard">-</td>
                    <td class="td-dashboard">${element.address}</td>
                    <td class="td-dashboard">-</td>
                    <td class="td-dashboard">-</td>
                    <td class="td-dashboard orderName">${element.first_name || element.last_name ? element.first_name + ' ' + element.last_name : '-'}</td>
                    <td class="td-dashboard">$${element.summPrice}</td>
                    <td class="td-dashboard">
                      <input
  type="image"
  id="image"
  class="deleteBtn"
  alt=""
  src="../src/cancel_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" />
                        <input
  type="image"
  id="image"
  alt=""
  src="../src/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" />
                    </td>
               `;
      table.appendChild(tbody);
    }
  });
  //
};
//

//DELETING ORDER
//AlertWindow
const alertWindow = document.querySelector('alert-window');

//
document.addEventListener('click', async (event) => {
  updateSpanValue(event);
  if (event.target.classList.contains('deleteBtn')) {
    const alertWindow = document.querySelector('alert-window');
    alertWindow.open();
    const row = event.target.closest('tr');
    const toDelete = row.querySelector('.orderId').innerHTML;
    if (alertWindow) {
      const yesBtn = alertWindow.querySelector('.yesBtn');
      yesBtn.onclick = async (event) => {
        // LOGIC
        console.log('toDelete _Id from .innerHTML (adminDashboard.js): ', toDelete);
        //
        toDelete ? await deleteOrder(toDelete) : console.log('nothing to delete');
        fetchOrderList();
        reRenderTable();
        alertWindow.close();
      };
    }
  }
});
//

// AMOUNT OF ELEMENTS TO SHOW
let openedSelector = document.getElementById('select-options'); //Element to change
let selectorElement = document.querySelector('.dropdown-trigger'); //Listen for click
//

// updating SpanValue and forcing reRenderTable()
let updateSpanValue = (event) => {
  if (event.target.classList.contains('dropdown-trigger')) {
    openedSelector.classList.toggle('select-dropdown');
  } else openedSelector.classList.remove('select-dropdown');
  //
  if (event.target.tagName === 'LI') {
    // Making all li unselected
    openedSelector.querySelectorAll('li').forEach((li) => {
      li.classList.remove('selected');
    });
    //
    event.target.classList.add('selected');
    openedSelector.classList.toggle('select-dropdown');
    spanValue = parseInt(event.target.querySelector('span').innerText);
    selectorElement.value = spanValue;
    reRenderTable();
  }
};
//

let checkBoxes;
let mainCheckbox;
let inputMain;
document.addEventListener('DOMContentLoaded', () => {
  //CHECKBOXES inputMain LOGIC
  inputMain = document.querySelector('.inputMain');
  inputMain.addEventListener('input', () => {
    console.log('input is here: ', inputMain.value);
    reRenderTable();
  });
  //

  //FOR CHECKBOX LOGIC
  mainCheckbox = table.parentElement.querySelector('.mainCheckBox'); //LEFT HERE
  mainCheckbox.addEventListener('change', () => {
    checkBoxCheck();
  });
  //

  fetchOrderList();
});

//CHECKBOXES LOGIC
let checkBoxCheck = () => {
  checkBoxes = table.querySelectorAll('input[type="checkbox"]');
  checkBoxes.forEach((checkbox) => {
    if (mainCheckbox.checked == true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
};
//
