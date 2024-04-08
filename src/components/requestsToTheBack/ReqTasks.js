
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
        .then(response => response.json())
        .then(data => {
            setChosenTheme(value);
            const taskArray = data.tasksInTheme.map(task => ({
                id: task.taskId,
                taskSubject: task.taskSubject,
                taskDescription: task.taskDescription,
                themeId: task.themeId,
                name: task.folderName
            }));
            setListTask('');
            setListTask(taskArray);
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
        .then(response => response.json())
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

export const handleIter = (chosenTask, setMessage) => {
    fetch('/api/v1/tasks/addIssue', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "taskId": chosenTask,
          // TODO: IterationId найти
          "iterationId": "IterationId"
        })
      })
        .then(response => {
          console.log("response.status ", response.status);
          if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
          }
        })
        .catch(error => {
          setMessage('Ошибка при выполнении запроса:', error);
        });
}