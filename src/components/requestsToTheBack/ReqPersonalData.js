export const getPersonalData = (token, setToken, setMessage) => {
    return new Promise((resolve, reject) => {
        fetch('/api/v1/settings', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 403) {
                    setToken('')
                } else if (!response.ok) {
                    setMessage('Ошибка сервера: ' + response.status);
                } else {
                    return response.json();
                }
            })
            .then(data => resolve(data))
            .catch(error => {
                if (error.name === 'AbortError') {
                    reject(new Error('Время ожидания запроса истекло'));
                } else {
                    reject(new Error(`Ошибка в запросе к серверу: ${error.message}`));
                }
            });
    });
};
