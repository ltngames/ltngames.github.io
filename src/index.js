import config from './config.js';
import { MainNavbar } from './components/MainNavbar.js';
import { MainFooter } from './components/Footer.js';
import { addRoute, setupRouter, loadPage, navigateTo } from './router.js';

const contentContainer = document.getElementById('content');

async function loadContent (hash) {
  const pageName = hash || 'home';

  await loadPage(`${pageName}.html`, (html) => {
    contentContainer.innerHTML = html;
  }, (error, content) => {
    contentContainer.innerHTML = content;
  });
}

customElements.define('main-navbar', MainNavbar);
customElements.define('main-footer', MainFooter);

for (let key in config.navbarItems) {
  let data = config.navbarItems[key];
  if (data.href.includes('#')) {
    addRoute(data.href.substring(1), () => {
      loadContent(data.href.substring(1));
    });
  }
}

document.title = config.title;
setupRouter();
addRoute('', () => { loadContent(''); });
navigateTo('');