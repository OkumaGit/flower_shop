const logOut = async function logOut() {
  //DEBUG
  console.log('LogOut triggered.');
  //

  //DELETING TOKEN FROM LOCALSTORAGE
  await localStorage.removeItem('authToken');
  console.log('LocalStorage после удаления :', localStorage);
  window.location.href = `/index.html`;
  console.log('saved token: ', localStorage.getItem('authToken'));
  console.log('LogOut result:');
  //
};

export { logOut };
