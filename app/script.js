import { homePage } from './modules/homePage.js';
import { cartPage } from './modules/cartPage.js';
import { orderDetails } from './modules/orderDetails.js';
//AUTH
import { logIn } from './modules/authentification/login.js';
import { logOut } from './modules/authentification/logOut.js';
import { register } from './modules/authentification/register.js';
import { profile } from './modules/authentification/profile.js';
//

document.addEventListener('DOMContentLoaded', () => {
  //LOGGING OUT
  const logOutBtn = document.querySelectorAll('.logOutBtn');
  if (logOutBtn) {
    logOutBtn.forEach((btn) => {
      btn.onclick = () => {
        console.log('logOutBtn triggered', logOutBtn);
        logOut();
      };
    });
  }
  console.log('No logOutBtn found');
  //
});

// IF .homePage
if (document.body.classList.contains('homePage')) {
  homePage();
} else if (document.body.classList.contains('orderDetails')) {
  orderDetails();
} else if (document.body.classList.contains('cartPage')) {
  cartPage();
}
//

//AUTHORIZATION
if (document.body.classList.contains('homePage')) {
  document.addEventListener('DOMContentLoaded', () => {
    const authPopUp = document.querySelector('auth-popup'); // Selecting auth-popup
    const logForm = authPopUp.shadowRoot.querySelector('form[name="logForm"]'); // Select our login form in ShadowRoot.
    // logForm ? console.log('logForm found', logForm) : console.log('Not found');
    const regForm = authPopUp.shadowRoot.querySelector('form[name="regForm"]'); // Select our register form in ShadowRoot.
    // regForm ? console.log('regForm found', regForm) : console.log('Not found');

    //LOGGING IN
    logForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(logForm);
      const email = formData.get('username');
      const password = formData.get('password');
      await logIn(email, password);
      profile();
    });
    //

    //REGISTERING
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(regForm);
      const email = formData.get('username');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');
      register(email, password, confirmPassword);
    });
    //
  });
}
//
