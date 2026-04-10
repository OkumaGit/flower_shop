import config from '../../config.js';

const logIn = async function logIn(email, password) {
  // //DEBUG
  // console.log('Login triggered. Data: ', email, password);
  // //
  const response = await fetch(`${config.API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // name: 'John', // NOT ACTUALLY REQUIRED UNLESS FOR PERSONILIZED GREETINGS ETC.
      email: email.trim(),
      password: password.trim(),
    }),
  });
  const result = await response.json();

  // INTERPRETATOR OF ERRORS
  const getErrorMessage = (serverError) => {
    const errorMessages = {
      'Email is already used': 'Email already registered',
      'Passwords are not equal': "Passwords doesn't match",
      'Invalid email': 'Incorrect email',
      'Password too short': 'Password should be minimum 6 symbols',
      'Email is required': 'Email is required',
      'Wrong credentials': 'Incorrect email or password',
    };

    return errorMessages[serverError];
  };
  //

  // REPLACE <small></small> ERROR MESSAGE IN FORM WITH RESULT.ERROR
  const authPopUp = document.querySelector('auth-popup');
  if (!response.ok) {
    authPopUp.shadowRoot.querySelector('form[name="logForm"] .errorMessage').innerHTML =
      getErrorMessage(result.error) || result.error;
  } else {
    // console.log('Attemt to close logIn pop-up');
    // authPopUp.shadowRoot.querySelector('form[name="logForm"]').style.display = 'none';
    //LEFT HERE
  }
  //

  //SAVING TOKEN TO LOCALSTORAGE
  if (result.token) {
    localStorage.setItem('authToken', result.token);
    console.log('saved token: ', localStorage.getItem('authToken'));
    console.log('Login result:', result);
  } else console.log('No token was saved in login.js');

  //
};

export { logIn };
