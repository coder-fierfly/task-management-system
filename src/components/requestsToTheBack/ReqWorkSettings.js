export const getRobotSettings = (setCheckboxValues, setErrLint, setSelectedOptionSuccess, setSelectedOptionTranslate, setMessage) => {
  return new Promise((resolve, reject) => {
    fetch('/api/v1/robotSettings', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          setMessage('Ошибка сервера: ' + response.status);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const { needLint, assignTasksToStudent, needCloseTasks, lintInformation } = data;
        setCheckboxValues(needLint);
        setSelectedOptionTranslate(assignTasksToStudent ? "student" : "teacher");
        setSelectedOptionSuccess(needCloseTasks);
        if (!lintInformation) {
          setErrLint("FULL_INFO");
        } else {
          setErrLint(lintInformation);
        }
        resolve(); // Разрешаем Promise
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          setMessage('Время ожидания запроса истекло');
        } else {
          setMessage(error.message);
          console.error('Ошибка в запросе к серверу:', error.message);
        }
        reject(error); // Отклоняем Promise
      });
  });
};


export const putRobotSettings = (checkboxValues, errLint, selectedOptionSuccess, selectedOptionTranslate, setMessage, setLoading) => {
  const assignTasksToStudent = selectedOptionTranslate === "student";
  console.log('putRobotSettings')
  fetch('/api/v1/robotSettings', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "needLint": checkboxValues,
        "assignTasksToStudent": assignTasksToStudent,
        "lintInformation": errLint,
        "needCloseTasks": selectedOptionSuccess
      })
  })
    .then(response => {
      if (!response.ok) {
        setMessage('Ошибка сервера: ' + response.status);
        throw new Error('Ошибка сервера: ' + response.status);
      }
      return response.text();
    })
    .then(result => {
      console.log('Результат:', result);
      setLoading(false);
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