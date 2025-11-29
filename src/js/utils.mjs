import ShoppingCart from "./ShoppingCart.mjs";

//HTML Functions

// wrapper for querySelector...returns matching element
export const qs = (selector, parent = document) => parent.querySelector(selector);

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.replaceChildren();

  let listTemplate = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, listTemplate);
}

export function renderWithTemplate(template, parentElement, data, callback) {

  parentElement.innerHTML = template;

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
}


//Local Storage

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// adds one or multiple data items to a local storage array
export function addLocalStorage(key, ...data) {
  let storage = getLocalStorage(key) ?? [];

  const combinedData = [].concat(storage, data);

  setLocalStorage(key, combinedData);
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}