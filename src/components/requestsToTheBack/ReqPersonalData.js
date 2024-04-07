export const fetchPersonalData = async () => {
    try {
        const response = await fetch('/api/v1/settings/42', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = `Ошибка сервера: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Время ожидания запроса истекло');
        } else {
            throw new Error(`Ошибка в запросе к серверу: ${error.message}`);
        }
    }
};
