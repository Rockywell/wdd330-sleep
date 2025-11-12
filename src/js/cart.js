import { getLocalStorage } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart") ?? [];


function renderCartContents() {
  // If cart is empty, show a message and stop
  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
  } else {
    let total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");

    productList.innerHTML = cartItems.map(item => cartItemTemplate(item)).join('');
    cartTotal.textContent = `($${total})`;
    cartFooter.classList.toggle("hide");
  }
}

function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

function updateCartCount() {
  const cartCountElement = document.querySelector('.cart-count');
  cartCountElement.textContent = cartItems.length;
}


document.addEventListener('DOMContentLoaded', renderCartContents, updateCartCount);