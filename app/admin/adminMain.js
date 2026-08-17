//Fetching ordersList
import config from '../config.js';
import { logOut } from '../modules/authentification/logOut.js';

//GETORDERSLIST
const getOrdersList = async function getOrdersList() {
  try {
    const response = await fetch(`${config.API_URL}/api/ordersList`);
    const fetchedOrdersList = await response.json();
    return fetchedOrdersList;
  } catch (error) {
    console.log(error);
  }
};
// getOrdersList();
export { getOrdersList };
//

//DELETE ORDER
const deleteOrder = async (toDelete) => {
  try {
    console.log('toDelete from adminMain.js', toDelete, 'toDelete length: ', toDelete.length);
    //Sending data to DB
    const token = localStorage.getItem('authToken'); //LOADED TOKEN
    if (token) {
      console.log('Token loaded in delete: ', token);
      M.toast({ html: `Order ${toDelete} deleted`, classes: 'green', displayLength: 3000 });
    } else console.log('no token');
    let finalDeleteURL;
    if (!Array.isArray(toDelete)) {
      finalDeleteURL = `/api/orders/${toDelete}`;
    } else {
      finalDeleteURL = `/api/orders`;
    }
    console.log('correctUrl: ', `${config.API_URL}${finalDeleteURL}`);
    const response = await fetch(`${config.API_URL}${finalDeleteURL}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.trim()}`,
      },
      method: 'DELETE',
      body: JSON.stringify(toDelete),
    });
    console.log('res in deleteOrder: ', response.status);
    if (response.status === 401) {
      logOut();
      M.toast({ html: 'Session expired', classes: 'red', displayLength: 2000 });
    }
    //
  } catch (error) {
    console.error('error in deleteOrder: ', error.message);
  }
};
export { deleteOrder };
//

//EDIT ORDER
const editOrder = async (toEdit) => {
  try {
    console.log('toEdit from adminMain.js', toEdit, 'toDelete length: ', toEdit.length);
    const token = localStorage.getItem('authToken'); //LOADED TOKEN FROM localStorage
    //Sending data to DB

    const response = await fetch(
      `${config.API_URL}/api/orders/editOrder/${toEdit.id}`,
      // ${config.API_URL}/api/orders/editOrder/6a03666972cf386373090631`
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.trim()}`,
        },
        method: 'PUT',
        // body: JSON.stringify({ address: toEdit.address }),
        body: JSON.stringify({ toEdit }),
      }
    );

    console.log('res in editOrder: ', response.status);
    if (token) {
      console.log('Token loaded in editOrder: ', token);
      M.toast({ html: `Order ${toEdit.id} edited`, classes: 'green', displayLength: 3000 });
    } else console.log('no token');

    if (response.status === 401) {
      logOut();
      M.toast({ html: 'Session expired', classes: 'red', displayLength: 2000 });
    }
    //
  } catch (error) {
    console.error('error in editOrder: ', error.message);
  }
};
export { editOrder };
//
