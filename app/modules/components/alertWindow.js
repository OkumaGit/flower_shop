class AlertWindow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  open() {
    this.querySelector('.alertPopUp-delete').classList.add('active');
  }

  close() {
    this.querySelector('.alertPopUp-delete').classList.remove('active');
  }

  render() {
    this.innerHTML = `
    <style>
    .active{
    display: flex !important;
    }
    </style>
    <div class="alertPopUp-delete" style="display: none; align-items: center; justify-content: center; position: absolute; left: 0; top: 0; z-index: 999; background-color: rgba(0,0,0,0.6); width: 100%; height: 100%;">
    <div class="card" style="padding: 20px 30px; width: auto; height: auto; display: flex; flex-direction: column; align-items: center;">
    <span style="padding-bottom: 10px; width: 60%; text-align: center;">Are you sure you want to delete this item from Database?</span>
    <div>
    <button style="margin-right: 10px" type="submit" class="yesBtn">Yes</button>
    <button type="submit" class="noBtn">No</button>
    </div>
    </div>
    </div>
   `;

    this.querySelector('.noBtn').onclick = (event) => {
      event.preventDefault();
      console.log('Close happening');
      this.close();
    };
  }
}
//LEFT HERE - TO DO THE POP-UP

customElements.define('alert-window', AlertWindow);
