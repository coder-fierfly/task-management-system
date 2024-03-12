import React, { useState } from 'react';
import { DataContext } from '../App';
import "../App.css";
const DistributionOfTasks = () => {


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
    { id: 1, label: 'Option 2', isChecked: false },
    { id: 2, label: 'Option 3', isChecked: false },
    { id: 3, label: 'Option 4', isChecked: false },
    { id: 4, label: 'Option 5', isChecked: false },
    { id: 5, label: 'Option 6', isChecked: false },
    { id: 6, label: 'Option 7', isChecked: false },
    { id: 7, label: 'Option 8', isChecked: false },
    { id: 8, label: 'Option 9', isChecked: false },
    { id: 10, label: 'Option 10', isChecked: false },
    { id: 11, label: 'Option 11', isChecked: false },
    { id: 12, label: 'Option 12', isChecked: false },
  ];

  const [students, setStudents] = useState(initialStudents);
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
      <div className='checkbox-wrap'>
        <label className='label-class' >Студенты</label>
        <div className='padding-wrap'>
          <input
            className='checkbox'
            type="checkbox"
            checked={students[0].isChecked}
            onChange={() => handleStudentsChange(students[0].id)}
          />
          <label>
            {students[0].label}
          </label>
        </div>
        <div className="checkbox-list">
          <div className='scroll-checkbox'>
            {students.slice(1).map((checkbox) => (
              <div key={checkbox.id}>
                <input
                  className='checkbox'
                  type="checkbox"
                  checked={checkbox.isChecked}
                  onChange={() => handleStudentsChange(checkbox.id)}
                />
                <label>
                  {checkbox.label}
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
        <button className="b-button margin-btn" onClick={handleClickCopy}>Раскопировать "всё-всем"</button>
        <button className="b-button margin-btn" onClick={handleClickAppoint}>Назначить выделенное</button>
      </div>
    </div >
  );
}

export default DistributionOfTasks;