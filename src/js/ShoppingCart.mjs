import { getLocalStorage, setLocalStorage, addLocalStorage, renderListWithTemplate } from "./utils.mjs";

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
    <input type="number" min="1" value="${item.Quantity ?? 1}" class="quantity-input" data-id="${item.Id}" />
    </label>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    static storageKey = "so-cart";

    static get list() { return getLocalStorage(this.storageKey) ?? [] }
    static set list(newItems) { setLocalStorage(this.storageKey, newItems) }

    static get totalQuantity() {
        return this.list.reduce((sum, item) => sum + (item.Quantity ?? 0), 0);
    }
    static get totalPrice() {
        return this.list.reduce((sum, item) => sum + (item.FinalPrice ?? 0), 0);
    }

    constructor(cartItems, productListElement = document.querySelector(".product-list")) {
        this.cartItems = cartItems ?? ShoppingCart.list;
        this.productListElement = productListElement;
        // this.category
    }

    init() {
        this.renderCartContents();

        this.productListElement.addEventListener('change', (event) => {
            // In case the event comes from something inside the input, climb up to the .quantity-input
            const input = event.target.closest('.quantity-input');
            if (!input || !this.productListElement.contains(input)) return;

            const newQuantity = parseInt(input.value, 10);

            const productId = input.dataset.id;
            const item = this.cartItems.find(p => p.Id === productId);

            if (!item) return;

            item.Quantity = newQuantity;
            item.FinalPrice = item.ListPrice * newQuantity;

            ShoppingCart.list = this.cartItems;

            ShoppingCart.updateCartCount();
            this.renderCartContents();
        });
    }

    renderCartContents() {

        const cartFooter = document.querySelector(".cart-footer");
        const cartTotal = document.querySelector(".cart-total");

        // If cart is empty, show a message and stop
        if (this.cartItems.length === 0) {
            cartFooter.classList.add("hide");
            this.productListElement.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
        } else {
            renderListWithTemplate(cartItemTemplate, this.productListElement, this.cartItems, "afterbegin", true);


            cartTotal.textContent = `($${ShoppingCart.totalPrice})`;
            cartFooter.classList.remove("hide");
        }
    }


    static updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = this.totalQuantity;
    }

    static addCart(...products) {
        let cart = this.list;

        products.forEach(product => {
            let selectedProduct = cart.find(item => item.Id === product.Id);

            if (selectedProduct) {
                selectedProduct.Quantity++
            } else {
                selectedProduct = { ...product, Quantity: 1 };
                cart.push(selectedProduct);
            }

            selectedProduct.FinalPrice = selectedProduct.ListPrice * selectedProduct.Quantity;
        })

        this.list = cart;
    }

    static emptyCart() {
        this.list = [];
    }
}