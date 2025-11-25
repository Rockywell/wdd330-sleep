export default class ExternalServices {
  
  constructor() {
    this.url = "https://wdd330-backend.onrender.com/checkout";
  }

  async checkout(orderData) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    };

    const response = await fetch(this.url, options);
    return response.json();
  }
}
