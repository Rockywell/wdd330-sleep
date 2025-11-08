import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create a data source instance (JSON inside "public/json")
const dataSource = new ProductData("../public/json/tents.json");

// Select where to display the list in your HTML
const listElement = document.querySelector(".product-list");

// Create and initialize the ProductList
const tentsList = new ProductList("tents", dataSource, listElement);
tentsList.init();
