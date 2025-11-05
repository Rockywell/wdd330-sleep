// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);


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


//Event Listener

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
export function getParam() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');

  return product;
}