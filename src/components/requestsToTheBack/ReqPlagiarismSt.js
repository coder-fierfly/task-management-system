export const getPlagiarism = ({ inputNumber, setListOfStudents, setLoading, setMessage, token, setToken }) => {
    setMessage("Загрузка...");
    return new Promise((resolve, reject) => {
        fetch(`api/v1/plagiat/getPlagiat/${inputNumber}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 403) {
                    setToken('')
                }
                if (!response.ok) {
                    setMessage('Ошибка сервера: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const listOfStudents = data.studentPlagiatPercentage;
                setListOfStudents(listOfStudents);
                setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
                resolve(listOfStudents); // Резолвим обещание с данными
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    setMessage('Время ожидания запроса истекло');
                } else {
                    setMessage(error.message);
                    console.error('Ошибка в запросе к серверу:', error.message);
                }
                reject(error); // Реджектим обещание с ошибкой
            });
    });
};
