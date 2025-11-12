import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

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

export default class ShoppingCart {

    constructor(cartItems = getLocalStorage("so-cart") ?? [], productList = document.querySelector(".product-list")) {
        this.cartItems = cartItems;
        this.productList = productList;
        // this.caqtegory
    }

    init() {
        this.renderCartContents();
        this.updateCartCount();

    }

     renderCartContents() {
        // If cart is empty, show a message and stop
        

        if (this.cartItems.length === 0) {
            this.productList.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
        } else {
            let total = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

            const cartFooter = document.querySelector(".cart-footer");
            const cartTotal = document.querySelector(".cart-total");

            // this.productList.innerHTML = this.cartItems.map(item => cartItemTemplate(item)).join('');
            renderListWithTemplate(cartItemTemplate(), this.productList, this.cartItems) ;
            cartTotal.textContent = `($${total})`;
            cartFooter.classList.toggle("hide");
        }
    }



     updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = this.cartItems.length;
    }


    //renderCartContents();
    //ocument.addEventListener('DOMContentLoaded', updateCartCount);
}