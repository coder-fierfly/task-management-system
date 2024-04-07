
export const fetchConRobotSettings = (setMCheckboxVal, setSelectedOptionTranslate, setLoading, setMessage) => {
    fetch('/api/v1/robotSettings', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                setMessage('Ошибка сервера: ' + response.status);
                throw new Error('Ошибка сервера: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const { showErrorResponse, checkAllIterations } = data;
            setMCheckboxVal({
                checkboxShowAns: showErrorResponse,
                checkboxAllIterations: checkAllIterations
            })
            // Устанавливаем состояние загрузки в false после получения данных
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                setMessage('Время ожидания запроса истекло');
            } else {
                setMessage(error.message);
                console.error('Ошибка в запросе к серверу:', error.message);
            }
        });
};