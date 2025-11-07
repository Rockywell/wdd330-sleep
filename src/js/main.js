import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('../json/tents.json');
const listElement = document.querySelector('.product-list');

const tentList = new ProductList('tents', dataSource, listElement);
tentList.init();

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cartCountElement.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartCount);

