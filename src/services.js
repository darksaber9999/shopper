import { COMMERCE_API, COMMERCE_URL } from "./constants";

class CommerceService {
  async fetchProducts() {
    return new Promise(async (success, failure) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("X-Authorization", `${COMMERCE_API}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const productsURL = `${COMMERCE_URL}products`;

        const response = await fetch(productsURL, requestOptions);
        if (response.ok) {
          const json = await response.json();
          const data = json.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price.formatted,
            quantity: item.inventory.available,
            category: item.categories[0].name,
            image: item.image,
          }));
          success({ response, data });
        } else {
          failure({ error: "Invalid http request" });
        }
      } catch (error) {
        failure(error);
      }
    })
  }

  async fetchCategories() {
    return new Promise(async (success, failure) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("X-Authorization", `${COMMERCE_API}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const categoriesURL = `${COMMERCE_URL}categories`;

        const response = await fetch(categoriesURL, requestOptions);
        if (response.ok) {
          const json = await response.json();
          const data = json.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            numProducts: item.products,
          }));
          success({ response, data });
        } else {
          failure({ error: "Invalid http request" });
        }
      } catch (error) {
        failure(error);
      }
    })
  }

}

export default CommerceService;