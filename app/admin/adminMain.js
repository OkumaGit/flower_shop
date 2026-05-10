//Fetching ordersList
import config from '../config.js';
import { logOut } from '../modules/authentification/logOut.js';

//GETORDERSLIST
const getOrdersList = async function getOrdersList() {
  try {
    // const response = await fetch("http://localhost:4000/api/ordersList");
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
    console.log('toDelete from adminMain.js', toDelete);
    //Sending data to DB

    const token = localStorage.getItem('authToken'); //LOADED TOKEN
    if (token) {
      console.log('Token loaded in delete: ', token);
    } else console.log('no token');
    // const response = await fetch(`${config.API_URL}/api/orders/${toDelete}`
    const response = await fetch(`${config.API_URL}/api/orders/${toDelete}`, {
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
