import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('../json/tents.json');
const listElement = document.querySelector('.product-list');

const tentList = new ProductList('tents', dataSource, listElement);
tentList.init();