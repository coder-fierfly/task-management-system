
export const getAllTopics = (setThemeList, setLoading, setMessage) => {
    fetch('/api/v1/tasks/getAllTopics', {
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
                console.error('Ошибка в запросе к серверу:', error.message);
            }
        });
};

export const getTasks = (value, setChosenTheme, setListTask, setMessage) => {
    var theme = "/api/v1/tasks/getTasks/" + value;
    fetch(theme, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response.json(); })
        .then(data => {
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

export const getTests = (value, setListTest, setChosenTask, setMessage) => {
    var test = "/api/v1/tasks/getTests/" + value;
    fetch(test, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => { return response.json(); })
        .then(data => {
            const testArray = data.taskTests.map(task => ({
                id: task.testId,
                name: task.testId,
                inputData: task.inputData,
                outPutData: task.outPutData
            }));
            setListTest("")
            setListTest(testArray);
            setChosenTask(value);
        }).catch(error => {
            setListTest("")
            setMessage('Error fetching data:', error);
        });;

};

export const handleIter = (chosenTask, setMessage, chosenIteration) => {
    fetch('/api/v1/tasks/addIssue', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "taskId": chosenTask,
            "iterationId": chosenIteration
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
            setMessage('Ошибка при выполнении запроса:', error);
        });
}

export const putTest = (chosenTask, inputData, inputExpRes, setLoading) => {
    fetch('/api/v1/tasks/addOrUpdateTest', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            testId: 0,
            taskId: chosenTask,
            inputData: inputData,
            outPutData: inputExpRes
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сервера: ' + response.status);
            }
            return response.text();
        })
        .then(result => {
            console.log('Результат:', result);
            setLoading(false);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}

export const postIssue = (chosenTask, setMessage, chosenIteration) => {
    fetch('/api/v1/tasks/addIssue', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "taskId": chosenTask,
            "iterationId": chosenIteration
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
            setMessage('Ошибка при выполнении запроса:', error);
        });
}