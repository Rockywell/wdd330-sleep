import ShoppingCart from './ShoppingCart.mjs';
import { formDataToJSON } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class CheckoutProcess {
    //static allItems = getLocalStorage("so-cart") ?? [];
    static allItems = ShoppingCart.allItems;
    constructor(outputSelector) {
        //this.key = key;
        this.outputSelector = outputSelector;
        //this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = () => this.calculateOrderSubtotal() * 0.06;
        this.orderTotal = 0;
    }

    init() {
        this.displayOrderTotals();
        console.log('Checkout process initialized');
    }


    calculateOrderSubtotal() {

        this.itemTotal = CheckoutProcess.allItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        this.shipping = 10 + CheckoutProcess.allItems.length > 1 ?
            (CheckoutProcess.allItems.length - 1) * 2
            : 0;
            
        return this.itemTotal + this.shipping;
    }

    calculateOrderTotal() {
        let subtotal = this.calculateOrderSubtotal();
        //this.tax = (subtotal * 0.06);

        return this.tax() + subtotal;

        //this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

        const subTotal = document.querySelector(
            this.outputSelector + ".orderTotal"
        );
        const tax = document.querySelector(
            this.outputSelector + " .tax"
        );
        const shipping = document.querySelector(
            this.outputSelector + " .shipping"
        );
        const finalTotal = document.querySelector(
            this.outputSelector + " .final-total"
        );

        subTotal.innerText = `$${this.calculateOrderSubtotal().toFixed(2)}`;
        tax.innerText = `$${this.tax().toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        finalTotal.innerText = `$${this.calculateOrderTotal().toFixed(2)}`;
    }

    packageItems() {

        return CheckoutProcess.allItems.map(item => {
            return {
                id: item.Id,
                price: item.FinalPrice,
                name: item.Name,
                quantity: 1,
            }
        });
        
    }
    
    async checkout(form) {
        const formData = formDataToJSON(form);

        const payload = {
            formData,
            items: this.packageItems(),
        }

        fetch(`${baseURL}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)


        });
    }

}
