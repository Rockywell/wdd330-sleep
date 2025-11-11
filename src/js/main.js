function updateCartCount() {
  const cartCountElement = document.querySelector('.cart-count');
  const cart = getLocalStorage("so-cart") ?? [];
  cartCountElement.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartCount);
