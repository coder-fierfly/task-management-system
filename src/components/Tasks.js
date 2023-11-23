import React, { useState } from 'react';
import "../App.css"
import DropdownList from './DropdownList';

function Tasks() {
  const [inputData, setData] = useState(''); // входные данные
  const [inputExpRes, setExpRes] = useState(''); // ожидаемый результат
  const [listVOfThemes, setListVOfThemes] = useState(''); // тема
  const [listVOfTasks, setListVOfTasks] = useState(''); // задачи
  const [listVOfTests, setListVOfTests] = useState(''); // тесты
  const listOfThemes = ['A2', 'B2', 'C2']; // список тем
  const listOfTests = ['A11', 'B11', 'C11']; // список тестов
  const listOfTasks = ['A1', 'B1', 'C1']; // список заданий

  // реагирует на изменение в поле ввода с входными данными
  const handleInputData = (event) => {
    setData(event.target.value);
  };

  // реагирует на изменение в поле ввода с ожидаемым результатом
  const handleInputExpRes = (event) => {
    setExpRes(event.target.value);
  };

  // кнопки лево и право
  const handleLeft = () => {
    console.log('левый');
  }
  const handleRight = () => {
    console.log('правый');
  }

  // кнопки к задачам, плюс, корзина и информация
  const handlePlusTask = () => {
    console.log("кнопка плюс задача");
  }
  const handleTrashTask = () => {
    console.log("кнопка задачки в мусор")
  }
  const handleInfoTask = () => {
    console.log("кнопка информации о задачке")
  }

  // кнопки к тесту плюс, корзина
  const handlePlusTest = () => {
    console.log("кнопка плюс тест")
  }
  const handleTrashTest = () => {
    console.log("кнопка теста в мусор")
  }

  const handleYourIter = () => {
    console.log("добавить задачу себе в итерацию")
  }

  const handleSaveNewTask = () => {
    console.log("сохранить новые задачи")
  }

  return (
    <>
      <h1>Все известные задачи</h1>
      <div className="form-container">
        <div className='flex-line'>
          <label className="label">Выберите тему:</label>
          <DropdownList
            options={listOfThemes}
            selectedValue={listVOfThemes}
            onSelectedValueChange={setListVOfThemes}
          />
        </div>
        <br />
        <div className='flex-line'>
          <label className="label">Выберите задачу:</label>
          <DropdownList
            options={listOfTasks}
            selectedValue={listVOfTasks}
            onSelectedValueChange={setListVOfTasks}
          />
        </div>
        <div className="flex-line">
          <button onClick={handlePlusTask} className="b-button">+</button>
          <button onClick={handleTrashTask} className="b-button">trash</button>
          <button onClick={handleInfoTask} className="b-button">i</button>
        </div>

        <div className='flex-line'>
          <label className="label">Выберите тест:</label>
          <DropdownList
            options={listOfTests}
            selectedValue={listVOfTests}
            onSelectedValueChange={setListVOfTests}
          />
        </div>
        <div className="flex-line">
          <button onClick={handlePlusTest} className="b-button">+</button>
          <button onClick={handleTrashTest} className="b-button">trash</button>
        </div>
        <label className="label">Входные данные</label>
        <label className="label">Ожидаемый результат</label>
        <input className="input-field" type="text" value={inputData}
          onChange={handleInputData} />
        <input className="input-field input-height" type="text" value={inputExpRes}
          onChange={handleInputExpRes} />

        <button onClick={handleLeft} className="b-button">L</button>
        <button onClick={handleRight} className="b-button">R</button>
        <button onClick={handleSaveNewTask} className="b-button">Сохранить "новые" задачи проекта</button>
        <button onClick={handleYourIter} className="b-button">Добавить задачу себе в итерацию</button>
      </div>
    </>
  );
}

export default Tasks;