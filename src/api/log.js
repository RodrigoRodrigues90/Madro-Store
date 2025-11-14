export default function logUser(values) {         
    const backendEndpoint = "https://expressjs-puce.vercel.app/auth/login" ;
    //local
    //const backendEndpoint = 'http://localhost:3333/auth/login';
    return new Promise((resolve, reject) => {
        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            }
            )
            .catch((e) => {
                reject("Erro interno, Tente Mais tarde. \u{1F622}");
            })
    }
    )
}
