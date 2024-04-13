
export const getConRobotSettings = (setMCheckboxVal, setMessage) => {
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
            const { showErrorResponse, checkAllIterations, needLint, assignTasksToStudent } = data;
            setMCheckboxVal({
                checkboxShowAns: showErrorResponse,
                checkboxAllIterations: checkAllIterations,
                needLint: needLint,
                assignTasksToStudent: assignTasksToStudent
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

export const getStartChecking = (idStart, setLogs, setMessage, setStop) => {
    console.log("getStartChecking");
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/issueChecker/getLogs/${idStart}`, {
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
                console.log(data);
                if (data.length === 0) {
                    console.log("мало")
                    setStop(true);
                }
                setLogs(prevLogs => [...prevLogs, ...data]);
                resolve(data); // Резолвим данные после успешного получения
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    setMessage('Время ожидания запроса истекло');
                } else {
                    setMessage(error.message);
                    console.error('Ошибка в запросе к серверу:', error.message);
                }
                reject(error); // Реджектим ошибку в случае неудачи
            });
    });
};




export const putConRobotSettings = (checkboxValues, setMessage, setLoading) => {
    const { checkboxAllIterations, checkboxShowAns } = checkboxValues;
    fetch('/api/v1/robotSettings', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "checkAllIterations": checkboxAllIterations,
                "showErrorResponse": checkboxShowAns
            })
    })
        .then(response => {
            if (!response.ok) {
                setMessage('Ошибка сервера: ' + response.status);
                throw new Error('Ошибка сервера: ' + response.status);
            }
            setLoading(false);
            return response.text();
        })
        .then(result => {
            console.log('Результат:', result);
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

export const postStartChecking = (chosenProject, chosenIteration, checkboxValues) => {
    fetch('/api/v1/issueChecker/startFullCheck', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            projectId: chosenProject,
            iteration: chosenIteration,
            settings: {
                checkAllIterations: checkboxValues.checkboxAllIterations,
                showErrorResponse: checkboxValues.checkboxShowAns,
                needLint: checkboxValues.needLint,
                assignTasksToStudent: checkboxValues.assignTasksToStudent
            }
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.status);
            }
            return response.text();
        })
        .then(result => {
            console.log('Результат:', result);
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
};

export const getIterations = (value, setListOfIterations, setLoading) => {
    return new Promise((resolve, reject) => {
        var iterations = "/api/v1/project/iterations/" + value;
        fetch(iterations, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })

            .then(data => {
                const transformedData = data.projectIterations.map((projectIteration, index) => ({
                    id: index + 1,
                    name: projectIteration
                }));
                console.log(transformedData)
                setListOfIterations(transformedData);
                setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
                resolve(); // Разрешаем обещание после успешного выполнения всех операций
            })
            .catch(error => {
                setListOfIterations('');
                console.error('Нет таких данных:', error);
                reject(error); // Отклоняем обещание в случае ошибки
            });
    });
}

export const postCheckTask = (inputNumber, chosenProject, checkboxValues) => {
    fetch('/api/v1/issueChecker/startCheckSingleIssue', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "taskId": inputNumber,
            "projectId": chosenProject,
            "settings":
            {
                "checkAllIterations": checkboxValues.checkboxAllIterations,
                "showErrorResponse": checkboxValues.checkboxShowAns,
                "needLint": checkboxValues.needLint,
                "assingTasksToStudent": checkboxValues.assignTasksToStudent
            }
        })
    })
        .then(response => {
            console.log("response.status ", response.status);
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.status);
            }
            return response.text();
        })
        .then(result => {
            console.log('Результат:', result);
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}