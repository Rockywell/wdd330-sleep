import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name.split(" -", 1)[0]}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
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
        this.initSort();
        this.renderList(this.products);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    initSort() {
        const sortSelect = document.querySelector("#sort");
        if (!sortSelect) return;

        sortSelect.addEventListener("change", () => {
            const sortBy = sortSelect.value;
            const sorted = this.sortProducts(this.products, sortBy);
            this.renderList(sorted);
        });
    }

    sortProducts(list, sortBy) {
        const sorted = [...list];
        switch (sortBy) {
            case "name-asc":
                sorted.sort((a, b) =>
                    a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
                );
                break;
            case "name-desc":
                sorted.sort((a, b) =>
                    b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
                );
                break;
            case "price-asc":
                sorted.sort((a, b) =>
                    a.FinalPrice - b.FinalPrice
                );
                break;
            case "price-desc":
                sorted.sort((a, b) =>
                    b.FinalPrice - a.FinalPrice
                );
                break;
            default:
        }
        
        return sorted;
    }
}

