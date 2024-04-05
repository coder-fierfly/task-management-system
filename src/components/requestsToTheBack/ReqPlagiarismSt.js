
export const fetchPlagiarism = ({ inputNumber, setListOfStudents, setLoading, setMessage }) => {
    setMessage("Loading...");
    console.log("inputNumber " + inputNumber)
    var plagiat = "api/v1/plagiat/getPlagiat/" + inputNumber;
    fetch(plagiat, {
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
            console.log(data.studentPlagiatPercentage)
            const listOfStudents = data.studentPlagiatPercentage;
            setListOfStudents(listOfStudents);

            setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
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