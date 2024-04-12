export const putCreateNewTask = (chosenTheme, chosenTask, inputName, descOfTask, inputConf, setLoading) => {
    console.log("chosenTask", chosenTask)
    setLoading(true)
    fetch('/api/v1/tasks/addOrUpdateTask', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
            if (!response.ok) {
                throw new Error('Ошибка сервера: ' + response.status);
            }
            console.log(response.text());
        })
        .then(setLoading(false))
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}