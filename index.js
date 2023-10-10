import config from './config.js';

const logoImg = document.getElementById('logo');
const contentContainer = document.getElementById('content');
const navbarLinksElement = document.getElementById('navbar-links');

let is404Loaded = false;
let errorContent = '<p>Error loading page.</p>';

function generateNavbarLinks (linksData) {
  for (var key in linksData) {
    var data = linksData[key];
    var linkElement = document.createElement('a');
    linkElement.classList.add('navbar-item');
    linkElement.textContent = data.text;
    linkElement.href = data.href;
    navbarLinksElement.appendChild(linkElement);
  }
}

async function loadPage (url, onSuccess, onFail) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const html = await response.text();
      onSuccess(html);
    } else {
      onFail(response.statusText);
    }
  } catch (error) {
    console.error(`Error loading page (${url}):`, error);
  }
}

async function loadContent () {
  const hash = window.location.hash.substring(1);
  const pageName = hash || 'home';

  if (!is404Loaded) {
    await loadPage('404.html', html => errorContent = html);
  }

  await loadPage(`${pageName}.html`, (html) => {
    contentContainer.innerHTML = html;
  }, (error) => {
    contentContainer.innerHTML = errorContent;
  });
}


window.addEventListener('hashchange', loadContent);
document.title = config.title;
logoImg.src = config.logo;
generateNavbarLinks(config.navbarItems);
loadContent();