export const fetchStudentsList = (setMessage, setStudentList) => {
  return new Promise((resolve, reject) => {
    // TODO: 42 заменить
    fetch('/api/v1/issueChecker/getStudentsList/42', {
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

export const fetchTasksList = (setTasks) => {
  // TODO: 42/42 - заменить
  return new Promise((resolve, reject) => {
    fetch('/api/v1/issueChecker/getTasksList/42/42', {
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
