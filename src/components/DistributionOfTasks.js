import React, { useState } from 'react';
import { DataContext } from '../App';
import "../App.css";
function DistributionOfTasks() {

  // TODO: добавить подписи над списками и вынести чек-бокс из списка
  const initialCheckboxes = [
    { id: 0, label: 'Выбрать всех', isChecked: false },
    { id: 1, label: 'Option 1', isChecked: false },
    { id: 2, label: 'Option 2', isChecked: false },
    { id: 3, label: 'Option 3', isChecked: false },
    { id: 4, label: 'Option 4', isChecked: false },
    { id: 5, label: 'Option 5', isChecked: false },
    { id: 6, label: 'Option 6', isChecked: false },
    { id: 7, label: 'Option 7', isChecked: false },
  ];

  const initialCheckboxes1 = [
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

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [checkboxes1, setCheckboxes1] = useState(initialCheckboxes1);

  const handleCheckboxChange = (id) => {
    if (id === 0) {
      console.log("затопали")
      // Получаем информацию о том, был ли чекбокс "Выбрать всех" выбран
      const selectAllChecked = checkboxes.find((checkbox) => checkbox.id === 0)?.isChecked || false;

      // Обновляем состояние всех чекбоксов в зависимости от состояния "Выбрать всех"
      const updatedCheckboxes = checkboxes.map((checkbox) => ({
        ...checkbox,
        isChecked: !selectAllChecked,
      }));
      setCheckboxes(updatedCheckboxes);
    } else {
      console.log("hejj")
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        )
      );
    }
  };

  const handleCheckboxChange1 = (id) => {
    if (id === 0) {
      console.log("затопали")
      // Получаем информацию о том, был ли чекбокс "Выбрать всех" выбран
      const selectAllChecked = checkboxes1.find((checkbox) => checkbox.id === 0)?.isChecked || false;

      // Обновляем состояние всех чекбоксов в зависимости от состояния "Выбрать всех"
      const updatedCheckboxes = checkboxes1.map((checkbox) => ({
        ...checkbox,
        isChecked: !selectAllChecked,
      }));
      setCheckboxes1(updatedCheckboxes);
    } else {
      console.log("hejj")
      setCheckboxes1((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
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
        <h3 className='h3-class'>Студенты</h3>
        <div className='padding-wrap'>
          <input
            className='checkbox'
            type="checkbox"
            checked={checkboxes[0].isChecked}
            onChange={() => handleCheckboxChange(checkboxes[0].id)}
          />
          <label>
            {checkboxes[0].label}
          </label>
        </div>
        <div className="checkbox-list">
          <div className='scroll-checkbox'>
            {checkboxes.slice(1).map((checkbox) => (
              <div key={checkbox.id}>
                <input
                  className='checkbox'
                  type="checkbox"
                  checked={checkbox.isChecked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
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
        <h3 className='h3-class'>Задачи</h3>
        <div className='padding-wrap'>
          <input
            className='checkbox'
            type="checkbox"
            checked={checkboxes1[0].isChecked}
            onChange={() => handleCheckboxChange1(checkboxes1[0].id)}
          />
          <label>
            {checkboxes1[0].label}
          </label>
        </div>
        <div className="checkbox-list">
          <div className='scroll-checkbox'>
            {checkboxes1.slice(1).map((checkbox) => (
              <div key={checkbox.id}>
                <input
                  className='checkbox'
                  type="checkbox"
                  checked={checkbox.isChecked}
                  onChange={() => handleCheckboxChange1(checkbox.id)}
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
        <button className="b-button margin-btn" onClick={handleClickDownloadList}>Загрузить списки</button>
        <button className="b-button margin-btn" onClick={handleClickCopy}>Раскопировать "всё-всем"</button>
        <button className="b-button margin-btn" onClick={handleClickAppoint}>Назначить выделенное</button>
      </div>
    </div >
  );
}

export default DistributionOfTasks;