import { getLocalStorage, setLocalStorage } from "./utils.mjs";


const cartItems = "so-cart";

function removeItem(productId) {
    const cart = getLocalStorage(cartItems) ?? [];
    const updatedCart = cart.filter(
        (item) => item.Id !== productId
    );
    setLocalStorage(cartItems, updatedCart)
    return updatedCart;
}


this.productList.addEventListener("click", (e) => {
    const button = e.target.closest(".deleteButton");
    if (!button) return;
    const productId = button.dataset.id;
    removeItem(productId);
})