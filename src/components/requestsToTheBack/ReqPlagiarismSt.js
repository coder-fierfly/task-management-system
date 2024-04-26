export const getPlagiarism = (chosenTasks, setListOfStudents, setMessage, token, setToken) => {
    setMessage("Загрузка...");
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/plagiat/getPlagiat/${chosenTasks}`, {
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
                    return;
                } else if (!response.ok) {
                    setMessage('Ошибка сервера: ' + response.status);
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                const listOfStudents = data.studentPlagiatPercentage;
                setListOfStudents(listOfStudents);
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


export const getDiffPlagiarism = (taskId, student, otherStudent, setMessage, token, setToken, setCode, setStudents) => {
    setMessage("Загрузка...");
    const encodedStudent = encodeURIComponent(student);
    const encodedOtherStudent = encodeURIComponent(otherStudent);
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/plagiat/getPlagiatOfTwoIssues/${taskId}/${encodedStudent}/${encodedOtherStudent}`, {
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
                    return;
                } else if (!response.ok) {
                    setMessage('Ошибка сервера: ' + response.status);
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                setStudents(Object.keys(data.twoIssuesDto))
                console.log("aaaaaaaaaaaa", Object.values(data.twoIssuesDto))
                setCode(Object.values(data.twoIssuesDto))
                const listOfStudents = data.studentPlagiatPercentage;

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

