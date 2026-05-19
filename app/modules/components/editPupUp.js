const html = String.raw; //To force Prettier to work

class EditPopUp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  close() {
    this.querySelector('.overlay').classList.remove('active');
  }

  open() {
    this.querySelector('.overlay').classList.add('active');
  }

  render() {
    this.innerHTML = html`
      <style>
        .active {
          display: flex !important;
        }
        .overlay {
          display: none;
          align-content: center;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 999;
        }
      </style>
      <div class="overlay">
        <div class="editPopUp card">
          <div class="formContainer card">Hi!</div>
          <label for="name">Name (4 to 8 characters):</label>
          <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
          <label for="name">Name (4 to 8 characters):</label>
          <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
          <label for="name">Name (4 to 8 characters):</label>
          <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
          <button type="submit" class="confirmBtn">Confirm</button>
          <button type="submit" class="cancelBtn">Cancel</button>
        </div>
      </div>
    `;

    this.querySelector('.cancelBtn').onclick = (event) => {
      event.preventDefault();
      this.close();
    };
  }
}

customElements.define('edit-popup', EditPopUp);
