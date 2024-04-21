export const getIterations = (username, password, setToken, setMessage) => {
    return new Promise((reject) => {
        fetch('/api/v1/auth/sign-in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Ошибка: ' + response.status);
                }
                return response.text();
            })
            .then(result => {
                const jsonResponse = JSON.parse(result);
                const token = jsonResponse.token;
                setToken(token);
            })
            .catch(error => {
                setMessage('Ошибка при выполнении запроса:', error);
                reject(error); // Отклоняем promise в случае ошибки
            });
    })
};