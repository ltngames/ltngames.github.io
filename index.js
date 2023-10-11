import config from './config.js';
import { addRoute, setupRouter, loadPage, navigateTo } from './scripts/router.js';

const logoImg = document.getElementById('logo');
const contentContainer = document.getElementById('content');
const navbarBurger = document.getElementById('mainMenuBurger');

function generateNavbarLinks (linksData) {
  const navbarLinksElement = document.getElementById('navbar-links');
  if (navbarLinksElement === null) {
    return;
  }
  for (var key in linksData) {
    var data = linksData[key];
    var linkElement = document.createElement('a');
    linkElement.classList.add('navbar-item');
    linkElement.textContent = data.text;
    linkElement.href = data.href;
    navbarLinksElement.appendChild(linkElement);
  }
}

async function loadContent (hash) {
  const pageName = hash || 'home';

  await loadPage(`${pageName}.html`, (html) => {
    contentContainer.innerHTML = html;
  }, (error, content) => {
    contentContainer.innerHTML = content;
  });
}

navbarBurger.addEventListener('click', () => {
  const target = document.getElementById(el.dataset.target);
  el.classList.toggle('is-active');
  target.classList.toggle('is-active');
});

document.title = config.title;
logoImg.src = config.logo;
generateNavbarLinks(config.navbarItems);

setupRouter();

addRoute('', () => { loadContent(''); });

for (let key in config.navbarItems) {
  let data = config.navbarItems[key];
  if (data.href.includes('#')) {
    addRoute(data.href.substring(1), () => {
      loadContent(data.href.substring(1));
    });
  }
}

navigateTo('');