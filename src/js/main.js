import ProductData from './ProductData.mjs';
import ProductList from "./ProductList.mjs";

// const template = document.querySelector(".product-card");
const productList = document.querySelector(".product-list");

const tentSource = new ProductData("tents");

const tents = new ProductList("Tents", tentSource, productList);
tents.init();