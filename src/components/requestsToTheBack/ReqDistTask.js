export const getStudentsList = (setMessage, setStudentList, chosenIteration, token, setToken) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/v1/issueChecker/getStudentsList/${chosenIteration}`, {
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
        var updatedStudentList = data.studentList.map(student => ({
          ...student,
          isChecked: false
        }));
        updatedStudentList.unshift({ studentId: '0', studentName: 'Выбрать всех', isChecked: false });
        setStudentList(updatedStudentList);
        resolve();
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          setMessage('Время ожидания запроса истекло');
        } else {
          setMessage(error.message);
          console.error('Ошибка в запросе к серверу:', error.message);
        }
        reject(error);
      });
  });
};

export const getTasksList = (setTasks, chosenProject, chosenIteration, token, setToken, setMessage) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/v1/issueChecker/getTasksList/${chosenProject}/${chosenIteration}`, {
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
        var updatedIssueList = data.issueList.map(task => ({
          ...task,
          isChecked: false
        }));
        updatedIssueList.unshift({ issueId: '0', issueSubject: 'Выбрать всё', isChecked: false });
        setTasks(updatedIssueList);
        resolve();
      })
      .catch(error => {
        console.error('Ошибка:', error.message);
        reject(error);
      });
  });
};

export const postAssign = (dataToPass, token, setToken, setMessage) => {
  fetch(`/api/v1/issueChecker/assignTasksToStudents`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dataToPass)
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
      console.error('Ошибка при выполнении запроса:', error.message);
    });
}
