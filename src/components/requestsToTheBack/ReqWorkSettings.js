
export const fetchRobotSettings = (setCheckboxValues, setSelectedOptionTranslate, setLoading, setMessage) => {
  setMessage("Loading...");
  fetch('/api/v1/robotSettings', {
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
      const { needLint, assignTasksToStudent, lintInformation } = data;
      setCheckboxValues({
        checkboxLint: needLint,
        lintInformation: lintInformation,
        checkboxSuccess: false
      });
      setSelectedOptionTranslate(assignTasksToStudent ? "student" : "teacher");
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