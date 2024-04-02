import React, { useEffect, useState } from 'react';
import '../../App.css';
import ErrorWindow from '../mini-elements/ErrorWindow';
const DistributionOfTasks = () => {

  const [studentList, setStudentList] = useState(null);
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
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
        data.studentList.forEach(student => {
          student.isChecked = false;
        });
        data.studentList.unshift({ studentId: 0, studentName: 'Выбрать всех', isChecked: false });
        setStudentList(data.studentList);
        setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          setMessage('Время ожидания запроса истекло');
        } else {
          setMessage(error.message);
          console.error('Ошибка в запросе к серверу:', error.message);
        }
      });;
  }, []);


  const [tasksList, settasksList] = useState(null);

  // fetch('/api/v1/issueChecker/getTasksList/42/42', {

  //  method: 'get',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     data.tasksList.forEach(task => {
  //       task.isChecked = false;
  //     });

  //     data.tasksList.unshift({ taskId: 0, taskSubject: 'Выбрать все', isChecked: false });
  //     settasksList(data.studentList);
  //     setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
  //   });



  // TODO: сделать 2 id, один списка, id user или задачи

  const initialStudents = [
    { id: 0, label: 'Выбрать всех', isChecked: false },
    { id: 1, label: 'Option 1', isChecked: false },
    { id: 2, label: 'Option 2', isChecked: false },
    { id: 3, label: 'Option 3', isChecked: false },
    { id: 4, label: 'Option 4', isChecked: false },
    { id: 5, label: 'Option 5', isChecked: false },
    { id: 6, label: 'Option 6', isChecked: false },
    { id: 7, label: 'Option 7', isChecked: false },
  ];

  const initialTasks = [
    { id: 0, label: 'Выбрать всё', isChecked: false },
    { id: 1, label: 'МКАД', isChecked: false },
    { id: 2, label: 'Складирование ноутбуков', isChecked: false }
  ];

  const [loading, setLoading] = useState(true);


  const [students, setStudents] = useState(studentList);
  const [tasks, setTasks] = useState(initialTasks);

  const handleStudentsChange = (id) => {

    if (id === 0) {
      // Получаем информацию о том, был ли чекбокс "Выбрать всех" выбран
      const selectAllChecked = students.find((checkbox) => checkbox.id === 0)?.isChecked || false;

      // Обновляем состояние всех чекбоксов в зависимости от состояния "Выбрать всех"
      const updatedStudents = students.map((checkbox) => ({
        ...checkbox,
        isChecked: !selectAllChecked,
      }));
      setStudents(updatedStudents);
    } else {
      setStudents((prevStudents) =>
        prevStudents.map((checkbox) =>
          checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        )
      );
    }
  };

  const handleTasksChange = (id) => {
    if (id === 0) {
      // Получаем информацию о том, был ли чекбокс "Выбрать всех" выбран
      const selectAllChecked = tasks.find((checkbox) => checkbox.id === 0)?.isChecked || false;

      // Обновляем состояние всех чекбоксов в зависимости от состояния "Выбрать всех"
      const updatedStudents = tasks.map((checkbox) => ({
        ...checkbox,
        isChecked: !selectAllChecked,
      }));
      setTasks(updatedStudents);
    } else {
      setTasks((prevStudents) =>
        prevStudents.map((checkbox) =>
          checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        )
      );
    }
  };

  const handleClickDownloadList = () => {
    console.log("загрузить")
  };

  const handleClickCopy = () => {
    console.log("раскопировать")
  }

  const handleClickAppoint = () => {
    console.log("назначить выделенное")
  }


  return (
    <div className='main-conn-wrap distr-wrap'>

      {loading ? <><br /><div>
        <ErrorWindow isOpen={loading} error={message} />

      </div><br /> </> : <>
        <div className='checkbox-wrap'>

          <label className='label-class' >Студенты</label>
          <div className='padding-wrap'>
            <input
              className='checkbox'
              type="checkbox"
              checked={studentList[0].isChecked}
              onChange={() => handleStudentsChange(students[0].studentId)}
            />
            <label>
              {studentList[0].studentName}
              {/* {studentList[0].studentId}
            {studentList[0].isChecked} */}
            </label>
          </div>
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
                    {/* {checkbox.studentId} */}

                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='checkbox-wrap'>
          <label className='label-class'>Задачи</label>
          <div className='padding-wrap'>
            <input
              className='checkbox'
              type="checkbox"
              checked={tasks[0].isChecked}
              onChange={() => handleTasksChange(tasks[0].id)}
            />
            <label>
              {tasks[0].label}
            </label>
          </div>
          <div className="checkbox-list">
            <div className='scroll-checkbox'>
              {tasks.slice(1).map((checkbox) => (
                <div key={checkbox.id}>
                  <input
                    className='checkbox'
                    type="checkbox"
                    checked={checkbox.isChecked}
                    onChange={() => handleTasksChange(checkbox.id)}
                  />
                  <label>
                    {checkbox.label}
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
      </>}

    </div >
  );
}

export default DistributionOfTasks;