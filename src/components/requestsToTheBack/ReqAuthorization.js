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
                if (response.status === 403) {
                    setToken('')
                    return;
                } else if (!response.ok) {
                    setMessage('Ошибка сервера: ' + response.status);
                    return;
                }
                return response.text();
            })
            .then(result => {
                if (!result) return;
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