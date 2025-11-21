const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  let json = res.json();

  if (res.ok) {
    return json;
  } else {
    throw { name: "ServicesError", message: await json };
  }
}

export default class ExternalServices {
  async getData(category) {
    return fetch(`${baseURL}products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);

    return fetch(`${baseURL}product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async checkout(payload) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    // console.log(payload);

    return await fetch(`${baseURL}checkout/`, options).then(convertToJson)
  }
}
