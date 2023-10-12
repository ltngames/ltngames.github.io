const routes = {};

let is404Loaded = false;
let errorContent = '<p>Error loading page.</p>';

function addRoute (route, callback) {
  routes[route] = callback;
}

function navigateTo (route) {
  if (routes[route]) {
    routes[route](route);
  } else {
    console.log('Route not found');
  }
}

async function load404Content() {
  if (!is404Loaded) {
    const response = await fetch('/404.html');
    if (response.ok) {
      errorContent = await response.text();
      is404Loaded = true;
    }
  }
}

async function loadPage (url, onSuccess, onFail) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const html = await response.text();
      onSuccess(html);
    } else {
      onFail(response.statusText, errorContent);
    }
  } catch (error) {
    console.error(`Error loading page (${url}):`, error);
  }
}

function setupRouter () {
  load404Content();
  window.addEventListener('hashchange', () => {
    const route = window.location.hash.substring(1);
    navigateTo(route);
  });
}

export { addRoute, loadPage, navigateTo, setupRouter };