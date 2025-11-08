import { renderListWithTemplate } from "./utils.mjs";

// 🧩 Template function
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/${product.Id}.html">
      <img src="../public/images/${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    const filteredProducts = products.filter(
      (product) => product.Category === this.category,
    );

    // Use the reusable utility function
    this.renderList(filteredProducts);
  }

  renderList(list) {
    // Here we call the new utility function
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}
