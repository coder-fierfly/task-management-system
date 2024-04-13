import React, { useEffect, useState, useContext } from 'react';
import '../../App.css';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { getStudentsList, getTasksList, postAssign } from '../requestsToTheBack/ReqDistTask';
import IterationContext from '../IterationContext';

const DistributionOfTasks = () => {

  const [studentList, setStudentList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('Loading...')
  const [loading, setLoading] = useState(true);
  const { chosenIteration, chosenProject } = useContext(IterationContext);
  console.log("chosenIteration@!@!", chosenIteration);
  console.log("chosenProject! ", chosenProject)


  useEffect(() => {
    console.log("!!chosenIteration ", chosenIteration)
    console.log("chosenProject! ", chosenProject)
    setLoading(false);
    if (chosenIteration) {
      Promise.all([getStudentsList(setMessage, setStudentList, chosenIteration), getTasksList(setTasks,chosenProject,chosenIteration)])
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setMessage(error.toString()); // Преобразуем объект Error в строку
        });
    }
  }, [chosenIteration]);




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
    console.log("обновление списков")
    setLoading(true);
    Promise.all([getStudentsList(setMessage, setStudentList), getTasksList(setTasks)])
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setMessage(error)
      });
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

      postAssign(dataToPass);
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
    </>

  );
}

export default DistributionOfTasks;