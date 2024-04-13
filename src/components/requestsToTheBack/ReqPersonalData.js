export const getPersonalData = () => {
    return new Promise((resolve, reject) => {
        // TODO: 42 поменять
        fetch('/api/v1/settings/42', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    const errorMessage = `Ошибка сервера: ${response.status}`;
                    reject(new Error(errorMessage));
                }
                return response.json();
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
