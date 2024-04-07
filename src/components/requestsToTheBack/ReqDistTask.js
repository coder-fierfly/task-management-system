export const fetchStudentsList = (setMessage, setStudentList) => {
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
  
  export const fetchTasksList = (setTasks) => {
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
    })
    .catch(error => {
      console.error('Ошибка в запросе к серверу:', error.message);
    });
  };
  