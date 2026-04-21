class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const token = localStorage.getItem('authToken');
    this.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
    <div class="navbar-fixed">
      <nav class="navbar">
        <div class="nav-wrapper">
        
          <div style="
                padding: 0 16px;
                display: flex;
                justify-content: space-between;
              " class="nav-content">
            <ul>
            <li><a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
              <li class="logo-container" style="
                    border: none;
                    margin-bottom: 20px;
                    align-items: center;
                    gap: 10px;
                    justify-content: space-between;
                    color: #fff;
                  ">
                <i class="material-icons left">spa</i>
                <a href="/index.html" class="brand-logo" style="
                      font-size: 2.1rem;
                      padding: 0;
                      font-weight: 400;
                      color: #fff;
                    ">Flower delivery</a>
              </li>
            
            </ul>
              <!-- pagesLinks -->
            <ul class="pagesLinks hide-on-med-and-down">
              <li>
                <a href="/aboutUs.html"><span>About Us</span> </a>
              </li>
              ${token ? '<li><a class="adminBtn" href="#">Admin</a></li><li><a class="logOutBtn" href="#">Log out</a></li>' : '<li><a class="authBtn" href="#">Sign in</a></li>'}
            </ul>
             <!-- // -->
            <ul id="">
              <li style="display: flex; width: 100% ">
                <a style="display: flex; gap: 10px" class="waves-effect" href="./shoppingCart.html"><span
                    id="cartNumber">0</span><i class="material-icons">shopping_cart</i><span
                    class="hide-on-med-and-down">Cart</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <!-- HAMBURGER MENU -->
    <ul id="slide-out" class="sidenav">
        <li>
        <div class="user-view">
        <i class="material-icons left">spa</i>
        </div>
        </li>
        <li><div class="divider"></div></li>
        <li>
        <a href="/aboutUs.html"><span>About Us</span> </a>
        </li>
        <li><div class="divider"></div></li>
        ${token ? '<li><a class="adminBtn" href="#">Admin</a></li><li><a class="logOutBtn" href="#">Log out</a></li>' : '<li><a class="authBtn" href="#">Sign in</a></li>'}
    </ul>
    <!-- // -->
`;
    //HAMBURGER MENU SCRIPT
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    //
  }
}

// CLICK FOR ADMINBTN
document.addEventListener('DOMContentLoaded', () => {
  const adminBtn = document.querySelectorAll('.adminBtn');
  adminBtn.forEach((btn) => {
    btn.onclick = () => {
      window.location.href = `/admin/admin.html`;
    };
  });
  //
});
//

customElements.define('nav-bar', NavBar);
