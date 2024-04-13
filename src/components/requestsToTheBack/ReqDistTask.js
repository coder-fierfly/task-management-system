export const getStudentsList = (setMessage, setStudentList, chosenIteration) => {
  return new Promise((resolve, reject) => {
    console.log("chosenIteration!!! ", chosenIteration)
    var buff = `/api/v1/issueChecker/getStudentsList/${chosenIteration}`;
    console.log("buff", buff)
    fetch(buff, {
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

export const getTasksList = (setTasks, chosenProject, chosenIteration) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/v1/issueChecker/getTasksList/${chosenProject}/${chosenIteration}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        var updatedIssueList = data.issueList.map(task => ({
          ...task,
          isChecked: false
        }));
        updatedIssueList.unshift({ issueId: '0', issueSubject: 'Выбрать всё', isChecked: false });
        setTasks(updatedIssueList);
        resolve();
      })
      .catch(error => {
        console.error('Ошибка в запросе к серверу:', error.message);
        reject(error);
      });
  });
};

export const postAssign = (dataToPass) => {
  fetch(`/api/v1/issueChecker/assignTasksToStudents`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToPass)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log('Результат:', result);
    })
    .then(data => {
      console.log('Ответ от сервера:', data);
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса:', error.message);
    });
}
