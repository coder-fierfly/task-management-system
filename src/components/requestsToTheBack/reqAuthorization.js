export const getIterations = (username, password, setToken, setMessage) => {
    // return new Promise((resolve, reject) => {
    fetch('/auth/sign-in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": "JonJon",
            "password": "123123123"
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка: ' + response.status);
            }
            return response.text();
        })
        .then(result => {
            console.log("result ", result)
            setToken(result);
        })
        .catch(error => {
            setMessage('Ошибка при выполнении запроса:', error);
        });
    // });
}