import cartActionTypes from "../Redux/cart/actiontype";

export default function calculateFrete(dispatch, cep) {

  const requestBody = {
    from: { postal_code: '88052-600' },
    to: { postal_code: cep },
    products: [
      {
        id: 'x',
        width: 11,
        height: 17,
        length: 11,
        weight: 0.3,
        insurance_value: 29.90,
        quantity: 1
      },
    ],
    services: "28,29"
  };
  const options = {
    method: 'POST',
    headers: {
      origin: "*",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  };
  // const backendEndpoint = 'http://localhost:3333/api/frete'
  const backendEndpoint = 'https://expressjs-puce.vercel.app/api/frete'

  return new Promise((resolve, reject) => {
    fetch(backendEndpoint, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        const servicos = data.ShippingSevicesArray || [];
        console.log(servicos)
        dispatch({
          type: cartActionTypes.FRETE,
          payload: { servicos }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

}

