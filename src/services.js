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

        const response = await fetch(COMMERCE_URL, requestOptions);
        if (response.ok) {
          const json = await response.json();
          const data = json.data.map((item) => ({
            name: item.name,
            description: item.description,
            price: item.price.formatted,
            quantity: item.inventory.available,
            category: item.categories[0].name,
            image: item.image,
          }));

          // Remove
          console.log(data);

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