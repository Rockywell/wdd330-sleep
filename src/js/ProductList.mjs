import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name.split(" -", 1)[0]}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    };

    async init() {
        document.querySelector(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);

        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);
        this.addQuickViewListeners();
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    addQuickViewListeners() {
        this.listElement.addEventListener("click", (e) => {
            if (e.target.classList.contains("quick-view-btn")) {
                const productId = e.target.dataset.id;
                const product = this.products.find(p => p.Id == productId);

                console.log("Quick View clicked:", productId, product);

                if (product) {
                    this.showQuickView(product);
                } else {
                    console.log("Product not found for ID:", productId);   
                }
            }
        });
    }

    showQuickView(product) {
        const modal = document.getElementById("quick-view-modal");
        modal.querySelector("#modal-title").textContent = product.NameWithoutBrand;
        modal.querySelector("#modal-image").src = product.Images.PrimaryMedium;
        modal.querySelector("#modal-description").innerHTML = product.DescriptionHtmlSimple || "No description available.";
        modal.querySelector("#modal-price").textContent = `$${product.FinalPrice}`;

        modal.classList.remove("hidden");

        modal.querySelector(".close-btn").addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }
}

