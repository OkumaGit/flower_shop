// AUTH POP-UP (ShadowDOM)
class AuthPopUp extends HTMLElement {
  // shadowRoot!: ShadowRoot; // Only if .ts
  constructor() {
    super();
    // Creating Shadow DOM (Hiding this web module from the rest of the project)
    this.attachShadow({ mode: 'open' });
    //
  }

  connectedCallback() {
    this.render();
  }

  open() {
    this.shadowRoot.querySelector('.overlay').classList.add('active');
    this.shadowRoot.querySelector('.login').classList.add('active');
  }

  openLogin() {
    this.shadowRoot.querySelector('.register').classList.remove('active');
    this.shadowRoot.querySelector('.login').classList.add('active');
  }

  openRegister() {
    this.shadowRoot.querySelector('.login').classList.remove('active');
    this.shadowRoot.querySelector('.register').classList.add('active');
  }

  close() {
    this.shadowRoot.querySelector('.overlay').classList.remove('active');
    this.shadowRoot.querySelector('.login').classList.remove('active');
    this.shadowRoot.querySelector('.register').classList.remove('active');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      .input.valid{
  border-color: #4CAF50;
      }

      .input.invalid, input:invalid{
      border-color: #f44336 !important;
      }
        .active{
              display: flex !important;
              }

        .overlay{
              display: none;
              justify-content: center;
              align-content: center;
              align-items: center;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(16, 32, 16, 0.6);
              z-index: 999;
          }

        .errorMessage{
        color: #e04e4e;
        }

        .successMsg{
        color: #2cec62}

        .logForm, .regForm{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-content: center;
              align-items: center;
              padding: 20px;
              background-color: #f0f0f0;
              border: 1px solid #ccc;
              border-radius: 8px;
              font-size: 18px;
              color: #333;
        }
      </style>
      <div class="overlay">
      <div style="display: flex; flex-direction: column; align-items: flex-end;">
      <input
  type="image"
  id="image"
  alt="" />
      <img style="cursor: pointer" class="closeBtn" src="./src/cancel_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" />
          <form style="display: none;" name='logForm' id='logForm' class='logForm login'>
            <label for='email'>Email</label>
            <input id='email' type="text" name="username" required/>
            <label for='password'>Password</label>
            <input type="password" id="password" name="password" autocomplete="current-password" required/>
            <button type='submit' class="loginBtn">Login</button>
            <small class="errorMessage">Error message</small>
            <div>Don't have an account? 
            <a class='signUpBtn' href="">Sign Up</a>
            </div>
          </form>
          <form style="display: none" name='regForm' id='regForm' class='regForm register'>
            <label for='email'>Email</label>
            <input id='email' type="text" name="username" required/>
            <label for='password'>Password</label>
            <input type="password" id="password" name="password" autocomplete="current-password" required/>
            <label for='confirmPassword'>Confirm password</label>
            <input type="password" id="password" name="confirmPassword" autocomplete="current-password" required/>
            <button type='submit' class="registerBtn">Register</button>
            <small class="errorMessage" style="display: none">Error message</small>
            <div>Already have an account? <a class='loginFormLink' href="#">Log In</a></div>
          </form>
          <small class="successMsg" style="display: none">Account was successfully created</small>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.signUpBtn').onclick = (event) => {
      event.preventDefault();
      this.openRegister();
    };

    this.shadowRoot.querySelector('.loginFormLink').onclick = (event) => {
      event.preventDefault();
      this.openLogin();
    };

    this.shadowRoot.querySelector('.closeBtn').onclick = (event) => {
      event.preventDefault();
      console.log('Close happening');
      this.close();
    };
  }
}

// Registering our new tag in browser;
customElements.define('auth-popup', AuthPopUp);

// SPARE COMPONENTS
// <button class="profileBtn">Profile</button>
//
