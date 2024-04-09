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
    setLoading(true);
    Promise.all([fetchStudentsList(setMessage, setStudentList), fetchTasksList(setTasks)])
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setMessage(error)
      });
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
    // TODO: обновление списков
    console.log("обновление списков")
  };

  const handleClickAppoint = async () => {
    console.log("назначить выделенное")

    const selectedStudents = studentList.filter(student => student.isChecked && student.studentId !== "0"); // Фильтрация исключает элемент "Выбрать всех"
    const selectedTasks = tasks.filter(task => task.isChecked && task.issueId !== "0");

    console.log(selectedStudents)
    console.log(selectedTasks)
    console.log(selectedStudents && selectedTasks)
    if (selectedStudents.length !== 0 && selectedTasks.length !== 0) {
      console.log("(((((назначить выделенное)))))")
      const dataToPass = {
        tasksList: selectedTasks.map(({ isChecked, ...rest }) => rest), // Исключаем isChecked из объектов
        studentList: selectedStudents.map(({ isChecked, ...rest }) => rest)
      };
      const jsonData = JSON.stringify(dataToPass);

      // function downloadJSON(jsonData, filename) {
      //   const blob = new Blob([jsonData], { type: 'application/json' });
      //   const url = URL.createObjectURL(blob);

      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = filename;

      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      //   URL.revokeObjectURL(url);
      // }

      console.log(jsonData);

      // const filename = 'data.json';
      // downloadJSON(jsonData, filename);
      // TODO: ошибка с dataToPass Ошибка при выполнении запроса: Unexpected non-whitespace character after JSON at position 4 (line 1 column 5)
      fetch(`/api/v1/issueChecker/assignTasksToStudents`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToPass)
      })
        .then(response => {
          console.log(response.ok)
          if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
          }
          console.log("response", response)
          return response.text();
        })
        .then(data => {
          console.log('Ответ от сервера:', data);
        })
        .catch(error => {
          console.error('Ошибка при выполнении запроса:', error.message);
        });
    }
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