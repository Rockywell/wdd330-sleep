import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") ?? [];

    // ✅ If cart is empty, show a message and stop
    if (cartItems.length === 0) {
        document.querySelector(".product-list").innerHTML = `
      <p class="empty-cart">Your cart is currently empty.</p>
    `;
        return;
    }

    // Otherwise, build cart items
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
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

renderCartContents();