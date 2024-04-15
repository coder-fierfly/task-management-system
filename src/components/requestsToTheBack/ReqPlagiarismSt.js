export const getPlagiarism = ({ inputNumber, setListOfStudents, setLoading, setMessage }) => {
    setMessage("Loading...");
    return new Promise((resolve, reject) => {
        fetch(`api/v1/plagiat/getPlagiat/${inputNumber}`, {
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
