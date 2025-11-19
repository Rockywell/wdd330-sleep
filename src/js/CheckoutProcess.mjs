import ShoppingCart from './ShoppingCart.mjs';


export default class CheckoutProcess {
    //static allItems = getLocalStorage("so-cart") ?? [];
    static allItems = ShoppingCart.allItems;
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        //this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.calculateItemSummary();
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
        this.tax = (subtotal * 0.06);

        return this.tax + subtotal;

        //this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} .order-tax`);


        tax.innerText = `$${this.tax.toFixed(2)}`;
    }
    
}
    
