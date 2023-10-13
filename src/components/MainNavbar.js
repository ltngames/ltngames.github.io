import { pushRoute } from '../router.js';
import config from '/config.js';

export class MainNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (config.logo != null) {
      this.setAttribute('logo', config.logo)
    }
    if (config.navbarItems != null){
      this.setAttribute('items', JSON.stringify(config.navbarItems))
    }
    this.innerHTML = `
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img id="logo" src="" height="95">
      </a>

      <a id="mainMenuBurger" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="mainMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainMenu" class="navbar-menu">
      <div class="navbar-start" id="navbar-links">
      </div>

      <div class="navbar-end"></div></div>
  </nav>
    `

    const items = JSON.parse(this.getAttribute('items'));
    const logoSrc = this.getAttribute('logo');
    const logoImg = this.querySelector('#logo');
    const navbarBurger = this.querySelector('#mainMenuBurger');

    logoImg.src = logoSrc;
    this.generateNavbarLinks(items);

    navbarBurger.addEventListener('click', () => {
      const target = this.querySelector(el.dataset.target);
      el.classList.toggle('is-active');
      target.classList.toggle('is-active');
    });
  }

  generateNavbarLinks (linksData) {
    const navbarLinksElement = this.querySelector('#navbar-links');
    if (navbarLinksElement === null) {
      return;
    }
    for (var key in linksData) {
      var data = linksData[key];
      var linkElement = document.createElement('a');
      linkElement.classList.add('navbar-item');
      linkElement.textContent = data.text;
      linkElement.href = data.href;
      linkElement.onclick = this.onLinkClick;
      navbarLinksElement.appendChild(linkElement);
    }
  }

  onLinkClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    pushRoute(href);
  }
}