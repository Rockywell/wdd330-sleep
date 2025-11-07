function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cartCountElement.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartCount);
