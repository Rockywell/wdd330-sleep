export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

export function create(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}
