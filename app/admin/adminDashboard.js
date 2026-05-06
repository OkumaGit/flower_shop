import { getOrdersList, deleteOrder } from './adminMain.js';
let fetchOrders;
let spanValue = 5;
let table = document.getElementById('table'); // Capture initial <table>
let tableControls;

//FETCH ORDER LIST AND POPULATE tbody
let fetchOrderList = async function () {
  fetchOrders = await getOrdersList();
  console.log('fetchOrders', fetchOrders);
  reRenderTable();
};
//

//RENDER TABLE WITH ORDER DATA
let reRenderTable = () => {
  //RESET ALL tbody
  let tbodyAll = table.querySelectorAll('.tableElement');
  tbodyAll.forEach((element) => {
    element.remove();
  });
  //

  //ADDING all "tbody" to the "table"
  fetchOrders.forEach((element, index) => {
    //LEFT HERE (Make the letters/numbers highlighted)
    if (
      index < spanValue &&
      element.items.find((itemsElement) => {
        return (
          itemsElement.Name.toLowerCase().includes(inputMain.value.toLowerCase()) ||
          element._id.toLowerCase().includes(inputMain.value.toLowerCase())
        );
      })
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
                        id="indeterminate-checkbox"
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

//CLICK
document.addEventListener('click', async (event) => {
  //CHECKBOX logic
  if (event.target.type == 'checkbox') {
    checkBoxCheck(event);
  }
  //
  // UPDATING SpanValue (//LEFT HERE. TO MOVE FROM DOCUMENT.)
  updateSpanValue(event);
  //
  //DELETING ORDER
  deletingOrder(event);
  //
});
//

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  //inputMain LOGIC
  inputMain = document.querySelector('.inputMain');
  tableControls = document.querySelector('.tableControls input');
  //LEFT HERE (TO DELETE?)
  // tableControls.addEventListener('click', () => {
  //   deleteFromTableControls();
  //   alert('Yo');
  // });
  inputMain.addEventListener('input', () => {
    reRenderTable();
  });
  //
  fetchOrderList();
});
//

let deletingOrder = (event) => {
  let alertWindow = document.querySelector('alert-window');
  //DELETING ORDER
  let deletingSingle = (event) => {
    if (event.target.classList.contains('deleteBtn')) {
      //AlertWindow
      alertWindow.open();
      //
      const toDelete = event.target.closest('tr').querySelector('.orderId').innerHTML;

      if (alertWindow) {
        const yesBtn = alertWindow.querySelector('.yesBtn');
        yesBtn.onclick = async () => {
          console.log('toDelete _Id from .innerHTML (adminDashboard.js): ', toDelete);
          toDelete ? await deleteOrder(toDelete) : console.log('nothing to delete');
          fetchOrderList();
          alertWindow.close();
        };
      }
    }
  };
  deletingSingle(event);

  //MULTIPLE DELETE - miltipleDeleteBtn
  if (event.target.classList.contains('miltipleDeleteBtn')) {
    //AlertWindow LEFT HERE
    //
    // if (!mainCheckbox.checked) {
    //   alert('mainChecked');
    // }
    let toDelete = [];
    checkBoxes.forEach((checkbox) => {
      if (checkbox.checked) {
        toDelete.push(checkbox.closest('tr').querySelector('.orderId').innerHTML);
      }
    });
    if (alertWindow) {
      alertWindow.open();
      let yesBtn = alertWindow.querySelector('.yesBtn');
      console.log('checkBoxes massive: ', toDelete);
      yesBtn.onclick = async () => {
        console.log('toDelete _Id from .innerHTML (adminDashboard.js): ', toDelete);
        toDelete ? await deleteOrder(toDelete) : console.log('nothing to delete');
        alertWindow.close();
      };
    }
    // fetchOrderList();
    // alertWindow.close();
  }
  //
};

// UPDATING SpanValue AND FORCING reRenderTable()
// AMOUNT OF ELEMENTS TO SHOW
let openedSelector = document.getElementById('select-options'); //Element to change
let selectorElement = document.querySelector('.dropdown-trigger'); //Listen for click
//
let updateSpanValue = (event) => {
  if (event.target.classList.contains('dropdown-trigger')) {
    openedSelector.classList.toggle('select-dropdown');
  } else openedSelector.classList.remove('select-dropdown');
  //
  if (event.target.tagName === 'LI') {
    // MAKING ALL li UNSELECTED
    openedSelector.querySelectorAll('li').forEach((li) => {
      li.classList.remove('selected');
    });
    //
    event.target.classList.add('selected');
    openedSelector.classList.toggle('select-dropdown');
    spanValue = parseInt(event.target.querySelector('span').innerText);
    selectorElement.value = spanValue;
    console.log('reRenderTable triggered');
    reRenderTable();
  }
};
//

//CHECKBOXES AND inputMain LOGIC
let checkBoxes;
let mainCheckbox;
let inputMain;
//

//checkBoxes LOGIC
let checkIfAllSelected = () => {
  let i = 0;
  for (let checkbox of checkBoxes) {
    if (checkbox.checked == true) {
      i++;
    }
    console.log('amount of checkboxes: ', i);
  }

  if (i < checkBoxes.length) {
    mainCheckbox.classList.add('indeterminate');
  } else mainCheckbox.classList.remove('indeterminate');
};

let checkBoxCheck = (event) => {
  mainCheckbox = document.querySelector('.mainCheckBox'); //mainCheckbox
  checkBoxes = table.querySelectorAll('input[type="checkbox"]'); //Checkbox
  if (event.target.classList.contains('mainCheckBox')) {
    mainCheckbox.classList.remove('indeterminate');
    checkBoxes.forEach((checkbox) => {
      if (mainCheckbox.checked == true) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }
  checkIfAllSelected(event);
  //

  //someChecked
  let someChecked = false;
  checkBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      someChecked = true;
    }
  });
  //

  //REVEAL tableControls BLOCK
  if (someChecked == true) {
    tableControls.style.display = 'inline-block';
    mainCheckbox.checked = true;
  } else {
    tableControls.style.display = 'none';
    mainCheckbox.checked = false;
  }
  //
};
//
