import config from '../../config.js';

const register = async function register(email, password, confirmPassword) {
  try {
    const response = await fetch(`${config.API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // name: 'John', // NOT ACTUALLY REQUIRED UNLESS FOR PERSONILIZED GREETINGS ETC.
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
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
      if (serverError && serverError.trim().includes('E11000 duplicate key error collection')) {
        return 'Email is already exists';
      }
      return errorMessages[serverError];
    };
    //
    const authPopUp = document.querySelector('auth-popup');
    const errorMessage = authPopUp.shadowRoot.querySelector('form[name="regForm"] .errorMessage');
    const successMessage = authPopUp.shadowRoot.querySelector('.successMsg');
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    if (!response.ok) {
      // SHOW .errorMessage IN <small></small>
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = getErrorMessage(result.error) || result.error;
      console.log(result.error);
      // const successMessage = authPopUp.shadowRoot.querySelector('.successMsg');
      // successMessage.style.display = 'block';
      //
    } else {
      // DISPLAY .successMsg
      authPopUp.shadowRoot.querySelector('form[name="regForm"]').style.display = 'none';
      successMessage.style.display = 'block';
      //
    }
    //
  } catch (error) {
    console.log('Error message from register.js: ', error.message);
  }
};

export { register };
