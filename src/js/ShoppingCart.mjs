import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

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
  <label class="cart-card__quantity">
    Qty:
    <input type="number" min="1" value="${item.quantity ?? 1}" class="quantity-input" data-id="${item.Id}" />
    </label>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    static get allItems() { return getLocalStorage("so-cart") ?? [] };

    constructor(cartItems, productList = document.querySelector(".product-list")) {
        this.cartItems = cartItems ?? ShoppingCart.allItems;
        this.productList = productList;
        // this.category
    }

    init() {
        this.renderCartContents();
    }

    renderCartContents() {
        // If cart is empty, show a message and stop


        if (this.cartItems.length === 0) {
            this.productList.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
        } else {
            let total = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice ?? item.ListPrice) * (item.quantity ?? 1), 0);

            const cartFooter = document.querySelector(".cart-footer");
            const cartTotal = document.querySelector(".cart-total");


            renderListWithTemplate(cartItemTemplate, this.productList, this.cartItems);
            this.productList.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (event) => {
                    const newQuantity = parseInt(event.target.value);
                    const productId = event.target.dataset.id;

                    const item = this.cartItems.find(p => p.Id === productId);
                    if (item && newQuantity > 0) {
                        item.quantity = newQuantity;
                        item.FinalPrice = item.ListPrice * newQuantity;
                        localStorage.setItem("so-cart", JSON.stringify(this.cartItems));
                        this.renderCartContents();

                    }
                });
            });

            cartTotal.textContent = `($${total})`;
            cartFooter.classList.toggle("hide");
        }
    }


    static updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = ShoppingCart.allItems.length;
    }

    static emptyCart() {
        setLocalStorage("so-cart", []);
        ShoppingCart.updateCartCount();
    }
}