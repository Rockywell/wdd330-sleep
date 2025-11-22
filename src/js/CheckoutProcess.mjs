import {
    formDataToJSON,
    alertMessage,
    removeAllAlerts
} from './utils.mjs';

import ShoppingCart from './ShoppingCart.mjs';
import ExternalServices from './ExternalServices.mjs';

const checkoutServices = new ExternalServices();

let formatCurrency = (value) => `$${value.toFixed(2)}`;

export default class CheckoutProcess {
    static items = ShoppingCart.list;

    constructor(outputSelector) {
        //this.key = key;
        this.outputSelector = outputSelector;
        //this.list = [];

        this.taxRate = 0.06;

        // this.itemTotal = 0;
        // this.shipping = 0;
        // this.orderTotal = 0;
    }

    get outputElement() {
        return document.querySelector(this.outputSelector)
    }

    get itemTotal() {
        return ShoppingCart.totalPrice
    }

    get shipping() {
        return 10 + (CheckoutProcess.items.length > 1 ?
            (CheckoutProcess.items.length - 1) * 2
            :
            0);
    }

    get tax() {
        return this.calculateOrderSubtotal() * this.taxRate
    }


    init() {
        this.displayOrderTotals();
        // console.log('Checkout process initialized');
    }


    calculateOrderSubtotal() {
        return this.itemTotal + this.shipping;
    }

    calculateOrderTotal() {
        return this.tax + this.calculateOrderSubtotal();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

        const container = this.outputElement;
        const selectors = [".orderTotal", ".tax", ".shipping", ".final-total"];

        const [subTotal, tax, shipping, finalTotal] = selectors.map(
            selector =>
                container.querySelector(`${selector} span`)
        );


        subTotal.innerText = formatCurrency(this.calculateOrderSubtotal());
        tax.innerText = formatCurrency(this.tax);
        shipping.innerText = formatCurrency(this.shipping);
        finalTotal.innerText = formatCurrency(this.calculateOrderTotal());
    }

    packageItems() {

        return CheckoutProcess.items.map(item => {
            return {
                id: item.Id,
                price: item.FinalPrice,
                name: item.Name,
                quantity: 1,
            }
        });

    }

    async checkout(form = document.forms["checkout"]) {
        const formData = formDataToJSON(form);

        const order = {
            ...formData,
            orderDate: new Date().toISOString(),
            orderTotal: this.calculateOrderTotal(),
            tax: this.tax,
            shipping: this.shipping,
            items: this.packageItems(),
        }


        try {
            const response = await checkoutServices.checkout(order);
            ShoppingCart.emptyCart();
            ShoppingCart.updateCartCount();
            location.assign("/checkout/success.html");
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }

            console.log(err);
        }
    }

}
