
export const getAllTopics = (setThemeList, setLoading, setMessage, token, setToken) => {
    fetch('/api/v1/tasks/getAllTopics', {
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
            const transformedData = data.themeListList.map(theme => ({
                name: theme.themeName,
                id: theme.themeId
            }));
            setThemeList(transformedData);
            setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
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

export const getTasks = (value, setChosenTheme, setListTask, setMessage, token, setToken) => {
    fetch(`/api/v1/tasks/getTasks/${value}`, {
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
            setChosenTheme(value);
            const taskArray = data.tasksInTheme.map(task => ({
                id: task.taskId,
                taskSubject: task.taskSubject,
                taskDescription: task.taskDescription,
                themeId: task.themeId,
                name: task.folderName,
                config: task.config
            }));

            const sortedTasks = [...taskArray].sort((a, b) => {
                // Приведение значений к нижнему регистру для регистронезависимой сортировки
                const taskSubjectA = a.taskSubject.toLowerCase();
                const taskSubjectB = b.taskSubject.toLowerCase();
                if (taskSubjectA < taskSubjectB) {
                    return -1;
                }
                if (taskSubjectA > taskSubjectB) {
                    return 1;
                }
                return 0;
            });
            setListTask('');
            setListTask(sortedTasks);
        }).catch(error => {
            setListTask('');
            setMessage('Нет таких данных:', error);
        });
};

export const getTests = (value, setListTest, setChosenTask, setMessage, token, setToken) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/tasks/getTests/${value}`, {
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
                const testArray = data.taskTests.map(task => ({
                    id: task.testId,
                    name: task.testId,
                    inputData: task.inputData,
                    outPutData: task.outPutData
                }));
                setListTest(testArray);
                setChosenTask(value);
                resolve(); // Разрешаем Promise после успешного выполнения
            })
            .catch(error => {
                setMessage('Error fetching data:', error);
                reject(error); // Отклоняем Promise в случае ошибки
            });
    });
};

export const handleIter = (chosenTask, setMessage, chosenIteration, token, setToken) => {
    fetch('/api/v1/tasks/addIssue', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "taskId": chosenTask,
            "iterationId": chosenIteration
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
            setMessage('Ошибка при выполнении запроса:', error);
        });
}

export const putTest = (chosenTask, inputData, inputExpRes, setLoading, token, setToken, setMessage) => {
    fetch('/api/v1/tasks/addOrUpdateTest', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            testId: 0,
            taskId: chosenTask,
            inputData: inputData,
            outPutData: inputExpRes
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
            setLoading(false);
        })
        .catch(error => {
            console.log('Произошла ошибка:', error);
        });
}

export const postIssue = (chosenTask, setMessage, chosenIteration, token, setToken) => {
    fetch('/api/v1/tasks/addIssue', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "taskId": chosenTask,
            "iterationId": chosenIteration
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
            setMessage('Ошибка при выполнении запроса:', error);
        });
}