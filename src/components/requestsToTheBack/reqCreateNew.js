export const putCreateNewTask = (chosenTheme, chosenTask, inputName, descOfTask, inputConf, setLoading, setMessage, token, setToken) => {
    setLoading(true)
    fetch('/api/v1/tasks/addOrUpdateTask', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            taskSubject: inputName,
            taskId: chosenTask,
            taskDescription: descOfTask,
            themeId: chosenTheme,
            folderName: "",
            config: inputConf
        })
    })
        .then(response => {
            if (response.status === 403) {
                setToken('')
            } else if (!response.ok) {
                setMessage('Ошибка сервера: ' + response.status);
            } else {
                return response.text();
            }
        })
        .then(result => {
            console.log('Результат:', result);
        })
        .then(setLoading(false))
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}