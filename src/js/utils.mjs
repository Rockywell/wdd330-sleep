// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);


/**
 * Grabs a value from localStorage by the specified key.
 * Returns an empty array if the key does not exist.
 *
 * @param {string} key - The key to retrieve from localStorage.
 * @returns {*} The parsed value from localStorage, or an empty array if not found.
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}


/**
 * Stores data in the browser's localStorage under the specified key, overwriting any existing value.
 * If you want to add to an existing array in localStorage instead of overwriting it, use addToLocalStorage().
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {*} data - The data to be stored.
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


/**
 * Adds a new item to the beginning of an array stored in localStorage under the specified key.
 * If there is no array associated with the key, creates a new array with the data item.
 *
 * @param {string} key - The key under which the array is stored in localStorage.
 * @param {*} data - The data item to add to the array.
 */
export function addToLocalStorage(key, data) {
  const localData = getLocalStorage(key);
  localData.unshift(data);
  setLocalStorage(key, localData);
}


/**
 * Grabs the value of a specified query parameter from the current page's URL.
 *
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string} The value of the specified query parameter.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function renderListWithTemplate(list, parentElement, templateFn, position = "beforeend", clear = false) {
  const html = list.map(templateFn).join("");

  if (clear) parentElement.innerHTML = "";

  parentElement.insertAdjacentHTML(position, html);
}


export function renderWithTemplate(template, parentElement, data, callback) {

  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function formatNumToCurrency(num) {
  const formattedNum = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD"
  }).format(num);


<<<<<<< HEAD
  return formattedNum;
=======
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();

  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  ShoppingCart.updateCartCount();
}

//Alert messages
export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');

  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;


  alert.addEventListener('click', function (e) {
    if (e.target.tagName == "SPAN") { // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  })

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll)
    window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

//Window Functions

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
>>>>>>> b55242e6c7922f33cc807d440258b1197f1c4dc0
}


export function alertMessage(message, scroll = true, durration = 0) {
  const alert = document.createElement("div");
  alert.classList.add("alert");

  const alertMessage = document.createElement("p");
  const removeButton = document.createElement("span");

  alertMessage.textContent = message;
  removeButton.textContent = "X";

<<<<<<< HEAD
  removeButton.addEventListener("click", event => {
    event.target.parentElement.remove();
  })
  alert.append(alertMessage, removeButton);


  document.querySelector("main").insertAdjacentElement("afterbegin", alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }

  if (durration) {
    setTimeout(() => {
      alert.remove();
    }, durration);
  }
=======
  setLocalStorage(key, combinedData);
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
>>>>>>> b55242e6c7922f33cc807d440258b1197f1c4dc0
}