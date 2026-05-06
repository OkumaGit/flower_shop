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
// const deleteOrder = async (req, res) => {
const deleteOrder = async (req, res) => {
  try {
    let toDelete = req.body;
    toDelete.forEach((element) => {
      console.log('toDelete from adminMain.js', element);
    });

    // DETECT WHICH ORDER MEANT TO BE DELETED
    // document.addEventListener('click', (event) => {
    //   console.log('Closest "orderName" InnerHTM: ', event.target.closest('orderName').innerHTML);
    // });
    //
    // Sending data to DB

    toDelete = '69127c3e7631c7153702855c';
    const token = await localStorage.getItem('authToken'); //LOADED TOKEN
    if (token) {
      console.log('Token loaded in delete: ', token);
    } else console.log('no token');

    const response = await fetch(`${config.API_URL}${toDelete}`, {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
      method: 'DELETE',
    });
    console.log('res in deleteOrder: ', response.status);
    if (response.status === 401) {
      logOut();
    }
    //
  } catch (error) {
    console.error('error in deleteOrder: ', error.message);
  }
};

export { deleteOrder };
//
