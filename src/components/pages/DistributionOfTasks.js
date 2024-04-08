import React, { useEffect, useState } from 'react';
import '../../App.css';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { fetchStudentsList, fetchTasksList } from '../requestsToTheBack/ReqDistTask';
// import fetch from 'node-fetch';

const DistributionOfTasks = () => {

  const [studentList, setStudentList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('Loading...')
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchStudentsList(setMessage, setStudentList),
        fetchTasksList(setTasks)
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);




  const handleStudentsChange = (id) => {
    if (id === '0') {
      // Получаем информацию о том, был ли чекбокс "Выбрать всех" выбран
      const selectAllChecked = studentList.find((checkbox) => checkbox.studentId === '0')?.isChecked || false;
      // Обновляем состояние всех чекбоксов в зависимости от состояния "Выбрать всех"
      const updatedStudents = studentList.map((checkbox) => ({
        ...checkbox,
        isChecked: !selectAllChecked,
      }));
      setStudentList(updatedStudents);
    } else {
      setStudentList((prevStudents) =>
        prevStudents.map((checkbox) =>
          checkbox.studentId === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        )
      );
    }
  };

  const handleTasksChange = (id) => {
    if (id === '0') {
      // Получаем информацию о том, был ли чекбокс "Выбрать все" выбран
      const selectAllChecked = tasks.find((checkbox) => checkbox.issueId === '0')?.isChecked || false;
      // Обновляем состояние всех чекбоксов в зависимости от состояния "Выбрать все"
      const updatedStudents = tasks.map((checkbox) => ({
        ...checkbox,
        isChecked: !selectAllChecked,
      }));
      setTasks(updatedStudents);
    } else {
      setTasks((prevStudents) =>
        prevStudents.map((checkbox) =>
          checkbox.issueId === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        )
      );
    }
  };

  const handleClickDownloadList = () => {
    console.log("загрузить")
  };

  const dataToSend = {
    tasksList: [
      { taskId: '12345', taskSubject: 'Шашки' }
    ],
    studentList: [
      { studentId: '123457', studentName: 'Пупкин Василий' }
    ]
  };

  const handleClickAppoint = async () => {
    console.log("назначить выделенное")
    // fetch(`/api/v1/issueChecker/assignTasksToStudents/1`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "tasksList": [{ "taskId": "12345", "taskSubject": "Шашки" }],
    //     "studentList": [{ "studentId": "123457", "studentName": "Пупкин Василий" }]
    //   })
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       setMessage('Ошибка сервера: ' + response.status);
    //       throw new Error('Ошибка сервера: ' + response.status);
    //     }
    //     // Обрабатывайте ответ, если необходимо
    //   })
    //   .catch(error => {
    //     if (error.name === 'AbortError') {
    //       setMessage('Время ожидания запроса истекло');
    //     } else {
    //       setMessage(error.message);
    //       console.error('Ошибка в запросе к серверу:', error.message);
    //     }
    //   });

    fetch(`/api/v1/issueChecker/assignTasksToStudents/1`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Обработайте полученные данные
        console.log('Ответ от сервера:', data);
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error.message);
      });
  };

  return (
    <div className='main-conn-wrap distr-wrap'>

      {loading ? <><br /><div>
        <ErrorWindow isOpen={loading} error={message} />

      </div><br /> </> : <>
        <div className='checkbox-wrap'>
          <label className='label-class' >Студенты</label>
          {studentList.length > 0 && (
            <div key={studentList[0].studentId} className='padding-wrap'>
              <input
                className='checkbox'
                type="checkbox"
                checked={studentList[0].isChecked}
                onChange={() => handleStudentsChange(studentList[0].studentId)}
              />
              <label>
                {studentList[0].studentName}
              </label>
            </div>
          )}
          <div className="checkbox-list">
            <div className='scroll-checkbox'>
              {studentList.slice(1).map((checkbox) => (
                <div key={checkbox.studentId}>
                  <input
                    className='checkbox'
                    type="checkbox"
                    checked={checkbox.isChecked}
                    onChange={() => handleStudentsChange(checkbox.studentId)}
                  />
                  <label>
                    {checkbox.studentName}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='checkbox-wrap'>
          <label className='label-class'>Задачи</label>
          {tasks.length > 0 && (
            <div key={tasks[0].issueId} className='padding-wrap'>
              <input
                className='checkbox'
                type="checkbox"
                checked={tasks[0].isChecked}
                onChange={() => handleTasksChange(tasks[0].issueId)}
              />
              <label>
                {tasks[0].issueSubject}
              </label>
            </div>
          )}
          <div className="checkbox-list">
            <div className='scroll-checkbox'>
              {tasks.slice(1).map((checkbox) => (
                <div key={checkbox.issueId}>
                  <input
                    className='checkbox'
                    type="checkbox"
                    checked={checkbox.isChecked}
                    onChange={() => handleTasksChange(checkbox.issueId)}
                  />
                  <label>
                    {checkbox.issueSubject}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='btn-row-cont'>
          <button className="b-button margin-btn" onClick={handleClickDownloadList}>Обновить списки</button>
          <button className="b-button margin-btn" onClick={handleClickAppoint}>Назначить выделенное</button>
        </div>
        {/* {response && <p>Ответ от сервера: {JSON.stringify(response)}</p>} */}
      </>}

    </div >
  );
}

export default DistributionOfTasks;