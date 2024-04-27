export const getRobotSettings = (setCheckboxValues, setErrLint, setSelectedOptionSuccess, setSelectedOptionTranslate, setMessage, token, setToken) => {
  return new Promise((resolve, reject) => {
    fetch('/api/v1/robotSettings', {
      method: 'GET',
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
          console.log('Ошибка в запросе к серверу:', error.message);
        }
        reject(error); // Отклоняем Promise
      });
  });
};


export const putRobotSettings = (checkboxValues, errLint, selectedOptionSuccess, selectedOptionTranslate, setMessage, setLoading, token, setToken) => {
  const assignTasksToStudent = selectedOptionTranslate === "student";
  console.log('putRobotSettings')
  fetch('/api/v1/robotSettings', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
      if (error.name === 'AbortError') {
        setMessage('Время ожидания запроса истекло');
      } else {
        setMessage(error.message);
        console.log('Ошибка в запросе к серверу:', error.message);
      }
    });
};