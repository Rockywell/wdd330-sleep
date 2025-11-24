import CheckoutProcess from "./CheckoutProcess.mjs";

const cartKey = "so-cart";
const checkout = new CheckoutProcess(cartKey);
checkout.calculateItemSubtotal();

document.querySelector("input[name='zip']").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document.querySelector("#checkout-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;

  const result = await checkout.checkout(form);

  console.log("Server Response:", result);
  // NEXT HOMEWORK will handle success/failure
});
