
export const getConRobotSettings = (setMCheckboxVal, setMessage, token, setToken) => {
    fetch('/api/v1/robotSettings', {
        method: 'get',
        headers: {
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
                console.log('Ошибка в запросе к серверу:', error.message);
            }
        });
};

export const getStartChecking = (idStart, setLogs, setMessage, token, setToken) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/issueChecker/getLogs/${idStart}`, {
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
                setLogs(prevLogs => [...prevLogs, ...data]);
                resolve(data); // Разрешить после успешного получения
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    setMessage('Время ожидания запроса истекло');
                } else {
                    setMessage(error.message);
                    console.log('Ошибка в запросе к серверу:', error.message);
                }
                reject(error); // Отклонять ошибку в случае неудачи
            });
    });
};




export const putConRobotSettings = (checkboxValues, setMessage, setLoading, token, setToken) => {
    const { checkboxAllIterations, checkboxShowAns } = checkboxValues;
    fetch('/api/v1/robotSettings', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                "checkAllIterations": checkboxAllIterations,
                "showErrorResponse": checkboxShowAns
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
            console.log("Результат: ", result)
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                setMessage('Время ожидания запроса истекло');
            } else {
                setMessage(error.message);
                console.log('Ошибка в запросе к серверу:', error.message);
            }
        });
};

export const postStartChecking = (chosenProject, chosenIteration, checkboxValues, token, setToken, setMessage) => {
    fetch('/api/v1/issueChecker/startFullCheck', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
            console.log("Результат: ", result)
        })
        .catch(error => {
            console.log('Ошибка при выполнении запроса:', error);
        });
};

export const getIterations = (value, setListOfIterations, setLoading, token, setToken, setMessage) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/project/iterations/${value}`, {
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
                const transformedData = data.projectIterations.map((projectIteration, index) => ({
                    id: index + 1,
                    name: projectIteration
                }));
                setListOfIterations(transformedData);
                setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
                resolve(); // Разрешаем обещание после успешного выполнения всех операций
            })
            .catch(error => {
                setListOfIterations('');
                console.log('Нет таких данных:', error);
                reject(error); // Отклоняем обещание в случае ошибки
            });
    });
}


export const getAllTasks = (setListOfTasks, token, setToken, setMessage) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/tasks/getAllTasks`, {
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
                let ListOfTasks = [];
                data.forEach(task => {
                    // Извлекаем только taskSubject и taskId
                    const { taskSubject, taskId } = task;
                    // Создаем объект с нужными полями
                    const taskData = { name: taskSubject, id: taskId };
                    ListOfTasks.push(taskData);

                });
                setListOfTasks(ListOfTasks);
                resolve(); // Разрешаем обещание после успешного выполнения всех операций
            })
            .catch(error => {
                console.log('Нет таких данных:', error);
                reject(error); // Отклоняем обещание в случае ошибки
            });
    });
}


export const postCheckTask = (inputNumber, chosenProject, checkboxValues, token, setToken, setMessage) => {
    fetch('/api/v1/issueChecker/startCheckSingleIssue', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
            console.log("Результат: ", result)
        })
        .catch(error => {
            console.log('Ошибка при выполнении запроса:', error);
        });
}