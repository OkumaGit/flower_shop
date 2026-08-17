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
    // this.querySelector('.nameDiv input').disabled = 'true';
  }

  render() {
    this.innerHTML = html`
      <style>
        label {
          display: flex;
        }
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
          background: rgba(16, 32, 16, 0.6);
          z-index: 999;
        }
      </style>
      <div class="overlay">
        <div style="display: flex; flex-direction: column; flex-wrap: wrap; align-items: flex-end;">
          <img
            style="cursor: pointer"
            class="closeBtn"
            src="../src/cancel_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
          />
          <div class="editPopUp card" style="padding: 20px">
            <strong>Order №</strong>
            <div class="formContainer"></div>
            <!-- name -->

            <div class="nameDiv">
              <label for="firstName">First name:</label>
              <input type="text" id="editFirstName" name="firstName" size="10" value="" disabled />
              <label for="lastName">Last name:</label>
              <input type="text" id="editLastName" name="lastName" size="10" value="" disabled />
              <input
                type="image"
                id="image"
                class="activateFieldBtn"
                alt=""
                src="../src/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
              />
            </div>
            <!-- address -->
            <label for="address">Address (4 to 20 characters):</label>
            <input
              type="text"
              id="editAddress"
              name="address"
              minlength="4"
              maxlength="20"
              size="10"
            />
            <!-- qty -->
            <label for="name">Qty:</label>
            <input type="text" id="editQty" name="qty" minlength="1" maxlength="4" size="10" />
            <button type="submit" class="confirmBtn">Confirm</button>
            <button type="submit" class="cancelBtn">Cancel</button>
          </div>
        </div>
      </div>
    `;

    this.querySelector('.closeBtn').onclick = (event) => {
      event.preventDefault();
      this.close();
    };
    this.querySelector('.cancelBtn').onclick = (event) => {
      event.preventDefault();
      this.close();
    };
    this.querySelector('.activateFieldBtn').onclick = (event) => {
      event.preventDefault();
      let disabledFields = event.target.closest('.nameDiv').querySelectorAll('input');
      disabledFields.forEach((btn) => {
        btn.disabled = false;
      });
      // event.target.closest('.nameDiv').querySelector('input').disabled = false;
      event.target.style.display = 'none';
    };
  }
}

customElements.define('edit-popup', EditPopUp);
