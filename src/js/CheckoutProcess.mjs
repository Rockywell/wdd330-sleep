import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.js";

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.services = new ExternalServices();
  }

  // Calculate subtotal and display
  calculateItemSubtotal() {
    const subtotal = this.list.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
    document.querySelector("#subtotal").innerText = subtotal.toFixed(2);
    this.subtotal = subtotal;
  }

  
  // Calculate tax, shipping, total
  calculateOrderTotal() {
    const tax = this.subtotal * 0.06;
    const shipping = 10 + (this.list.length - 1) * 2;
    const total = this.subtotal + tax + shipping;

    document.querySelector("#tax").innerText = tax.toFixed(2);
    document.querySelector("#shipping").innerText = shipping.toFixed(2);
    document.querySelector("#total").innerText = total.toFixed(2);

    this.tax = tax;
    this.shipping = shipping;
    this.orderTotal = total;

  }

  async checkout(form) {
  try {
    // (1) Create order object  
    // (2) Send to ExternalServices.checkout  
    // (3) Handle success → redirect to success page
  }
  catch (err) {
    // err.message contains the server JSON
    alertMessage("Order failed: " + err.message.error);
  }
}

  // Convert cart items for checkout object
  packageItems(items) {
    return items.map(item => ({
      id: item.id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity
    }));
  }

  // Build order and send it to server
  async checkout(form) {
    const formData = new FormData(form);
    const orderJson = Object.fromEntries(formData.entries());

    orderJson.orderDate = new Date().toISOString();
    orderJson.items = this.packageItems(this.list);
    orderJson.orderTotal = this.orderTotal.toFixed(2);
    orderJson.tax = this.tax.toFixed(2);
    orderJson.shipping = this.shipping;

    const response = await this.services.checkout(orderJson);
    return response;
  }
}

