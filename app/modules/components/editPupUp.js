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
            <label for="name">Name (4 to 8 characters):</label>
            <div class="nameDiv">
              <input
                type="text"
                id="editName"
                name="name"
                minlength="4"
                maxlength="8"
                size="10"
                value=""
                disabled
              />
              <input
                type="image"
                id="image"
                class="editBtn"
                alt=""
                src="../src/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
              />
            </div>
            <!-- address -->
            <label for="address">Address (4 to 8 characters):</label>
            <input
              type="text"
              id="editAddress"
              name="address"
              minlength="4"
              maxlength="8"
              size="10"
            />
            <!-- qty -->
            <label for="name">Qty (4 to 8 characters):</label>
            <input type="text" id="editQty" name="qty" minlength="4" maxlength="8" size="10" />
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
    this.querySelector('.editBtn').onclick = (event) => {
      event.preventDefault();
      event.target.closest('.nameDiv').querySelector('input').disabled = false;
      event.target.style.display = 'none';
    };
  }
}

customElements.define('edit-popup', EditPopUp);
