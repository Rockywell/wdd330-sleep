import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutForm = document.querySelector("form");

const order = new CheckoutProcess("order-summary");
order.init();

document.querySelector("#orderSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  order.checkout(checkoutForm);
});
