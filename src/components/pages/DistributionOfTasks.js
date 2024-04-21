import React, { useEffect, useState, useContext } from 'react';
import '../../App.css';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { getStudentsList, getTasksList, postAssign } from '../requestsToTheBack/ReqDistTask';
import IterationContext from '../IterationContext';

const DistributionOfTasks = () => {

  const [studentList, setStudentList] = useState([]); // лист студентов
  const [tasks, setTasks] = useState([]); // лист с задачами
  const [message, setMessage] = useState('Loading...'); // сообщение
  const [loading, setLoading] = useState(true); // статус загрузки
  const { chosenIteration, chosenProject, token, setToken } = useContext(IterationContext); // выбранные задачи и проект

  // делаем поиск студентов и задач
  useEffect(() => {
    setLoading(true);
    if (chosenIteration) {
      Promise.all([getStudentsList(setMessage, setStudentList, chosenIteration, token, setToken), getTasksList(setTasks, chosenProject, chosenIteration, token, setToken)])
        .then(() => {
          if (studentList && tasks) {
            setLoading(false);
          }
        })
        .catch(error => {
          setMessage(error.toString()); // Преобразуем объект Error в строку
        });
    }
  }, [chosenIteration]);

  // функция для выбора студентов
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

  // функция для выбора задач
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

  // обновление списков
  const handleClickDownloadList = () => {
    console.log("обновление списков")
    setLoading(true);
    Promise.all([getStudentsList(setMessage, setStudentList, chosenIteration, token, setToken), getTasksList(setTasks, chosenProject, chosenIteration, token, setToken)])
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setMessage(error)
      });
  };

  // назначение выделенного
  const handleClickAppoint = async () => {
    console.log("назначить выделенное")
    const selectedStudents = studentList.filter(student => student.isChecked && student.studentId !== "0"); // Фильтрация исключает элемент "Выбрать всех"
    const selectedTasks = tasks.filter(task => task.isChecked && task.issueId !== "0");
    if (selectedStudents.length !== 0 && selectedTasks.length !== 0) {
      const dataToPass = {
        tasksList: selectedTasks.map(({ isChecked, ...rest }) => rest), // Исключаем isChecked из объектов
        studentList: selectedStudents.map(({ isChecked, ...rest }) => rest)
      };
      postAssign(dataToPass, token, setToken);
    }
  };

  return (
    <>
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
                {studentList.length === 0 ? (
                  <p>Выберите итерацию</p>
                ) : (
                  studentList.slice(1).map((checkbox) => (
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
                  ))
                )}
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
                {tasks.length === 0 ? (
                  <p>Выберите задачу</p>
                ) : (
                  tasks.slice(1).map((checkbox) => (
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
                  ))
                )}
              </div>
            </div>
          </div>
          <div className='btn-row-cont'>
            <button className="b-button margin-btn" onClick={handleClickDownloadList}>Обновить списки</button>
            <button className="b-button margin-btn" onClick={handleClickAppoint}>Назначить выделенное</button>
          </div>
        </>}
      </div>
    </>
  );
}

export default DistributionOfTasks;