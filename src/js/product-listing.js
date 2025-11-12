import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const productList = document.querySelector(".product-list");

const listing = new ProductList(category, dataSource, productList);
listing.init();
