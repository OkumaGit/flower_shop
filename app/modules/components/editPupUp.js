class EditPopUp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<style>.active{display: flex !important}</style>
    <div class="editPopUp" style="display: none;"><div class="formContainer card">Hi!</div>
    <button type"submit">Confirm</button>
    <button type"submit">Cancel</button></div>`;
  }

  open() {
    this.querySelector('.editPopUp').classList.add('active');
  }
}

customElements.define('edit-popup', EditPopUp);
