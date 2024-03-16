/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../../App.css';
import DropdownList from '../mini-elements/DropdownList';
import CreateNewTask from '../mini-elements/CreateNewTask';
import ConfirmationWindow from '../mini-elements/ConfirmationWindow';
import getAllTopics from '../jsons/getAllTopics.json'; // Используем require
// TODO: сделать чтобы тесты показывались после выбора задачи
// TODO: handleSetDel что надо передавать?
function Tasks() {

  const [listTheme, setSelectedTheme] = useState('');

  const listInputData = ['000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwwwwwwwwwwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww', '1', '2', '3']; // входные данные
  const listInputExpRes = ['0001', '11', '21', '31']; // входные данные

  const [chosenTask, setChosenTask] = useState(''); // задача выбранная
  const [chosenTest, setChosenTest] = useState(''); // тест выбранный
  const [chosenTheme, setChosenTheme] = useState(''); // тема выбранная

  const listOfTestName = ['A11', 'B11', 'C11']; // список тестов
  const listTask = ['A1', 'B1', 'C1']; // список заданий
  const [nameOfTask, setNameOfTask] = useState('');
  const [nameConf, setConf] = useState('');
  const [descOfTask, setDeskOfTask] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // индекс текущего элемента
  const [inputData, setData] = useState(listInputData[currentIndex]); // входные данные
  const [inputExpRes, setExpRes] = useState(listInputExpRes[currentIndex]); // ожидаемый результат

  const themeList = getAllTopics.listOfThemes;
  const themeNamesArray = themeList.map((theme) => theme.themeName);

  if (listTheme.length === 0) {
    setSelectedTheme(themeNamesArray);
  }

  themeNamesArray.sort();
  themeNamesArray.unshift('Все темы');

  // сортировка списков и добавление варианта в начало
  listOfTestName.sort();

  // реагирует на изменение в поле ввода с входными данными
  const handleInputData = (event) => {
    setData(event.target.value);
  };

  const setDel = () => {
    console.log("удаляяяем")
  }

  const [isCreateNewTaskOpen, setCreateNewTaskOpen] = useState(false);
  const [isConfOpen, setConfOpen] = useState(false);

  // просмотр тестов
  const handleViewTests = () => {
    console.log("Кнопка просмотр текстов нажата");
  }

  // реагирует на изменение в поле ввода с ожидаемым результатом
  const handleInputExpRes = (event) => {
    setExpRes(event.target.value);
  };

  // кнопки лево и право
  const handleLeft = () => {
    const newIndex = currentIndex === 0 ? listInputData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }
  const handleRight = () => {
    const newIndex = currentIndex === listInputData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  // кнопки к задачам, плюс, корзина и информация
  const handlePlusTask = () => {
    setNameOfTask('');
    setDeskOfTask('');
    setCreateNewTaskOpen(true);
    console.log("кнопка плюс задача");
  }
  const closeCreateNewTask = () => {
    setCreateNewTaskOpen(false);
  };

  const closeConf = () => {
    setConfOpen(false);
  };

  const handleThemeChange = (value) => {
    setChosenTheme(value);
    setChosenTask(''); // сброс выбранной задачи при изменении темы
  }

  const handleTaskChange = (value) => {
    setChosenTask(value);
    setChosenTest(''); // сброс выбранного теста при изменении задачи
  }

  const handleTrashTask = () => {
    setConf('задачу');
    setConfOpen(true);
    console.log("кнопка задачки в мусор")
  }

  const handleTrashTest = () => {
    setConf('тест');
    setConfOpen(true);
    console.log("кнопка теста в мусор")
  }

  const handleInfoTask = () => {
    setNameOfTask('название');
    setDeskOfTask('инфа много много');
    setCreateNewTaskOpen(true);
    console.log("кнопка информации о задачке")
  }

  // кнопки к тесту плюс, корзина
  const handlePlusTest = () => {
    console.log("кнопка плюс тест")
  }

  const handleYourIter = () => {
    console.log("добавить задачу себе в итерацию")
  }
  const handleSaveNew = () => {
    console.log("сохранить")
  }

  useEffect(() => {
    setData(listInputData[currentIndex]);
    setExpRes(listInputExpRes[currentIndex]);
  }, [currentIndex, listInputData, listInputExpRes]);

  return (
    <>

      <div className='main-conn-wrap t-w'>
        <div className='tasks-wrap'>
          <div className='dropdown-wrap'>
            <DropdownList
              options={listTheme}
              selectedValue={chosenTheme}
              onSelectedValueChange={handleThemeChange}
              outputLabel="Выберите тему"
            />
            <DropdownList
              options={listTask}
              selectedValue={chosenTask}
              onSelectedValueChange={handleTaskChange}
              outputLabel="Выберите задачу"
              disabled={!chosenTheme} // задачи будут недоступны, если тема не выбрана
            />
            <div className="flex-line-tasks">
              <button onClick={handleYourIter} className="b-button left-btn" disabled={!chosenTask}>Добавить задачу себе в итерацию</button>
              <div>
                {/* кнопка информации */}
                <button onClick={handleInfoTask} className="b-button little-btn" disabled={!chosenTask}><label className="label center-label info-btn">
                  {chosenTask ? <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    fill="#1C274C" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                      fill="#AAAAAA" /></svg>}
                </label></button></div>
              <div>
                {/* кнопка плюс */}
                <button onClick={handlePlusTask} className="b-button little-btn" disabled={!chosenTheme}>+</button></div>
              {/* кнопка мусорки */}
              <button onClick={handleTrashTask} className="b-button trash-btn" disabled={!chosenTheme}>
                <div className='flex'>
                  {chosenTask ?
                    <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#AAAAAA" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                  }
                </div>
              </button>

            </div>
            <DropdownList
              options={listOfTestName}
              selectedValue={chosenTest}
              onSelectedValueChange={setChosenTest}
              outputLabel="Выберите тест"
              disabled={!chosenTask} // тесты будут недоступны, если задача не выбрана
            />
            <div className="flex-line-right">
              <button onClick={handlePlusTest} className="b-button little-btn" disabled={!chosenTest}>+</button>
              <button onClick={handleTrashTest} className="b-button trash-btn help" disabled={!chosenTest}>
                <div className='flex'>
                  <div className='flex'>
                    {chosenTest ?
                      <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#AAAAAA" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                    }
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className='check-container form-width'>
            <div className='label-cont'>
              <label className="label center-label">Входные данные</label>
              <textarea className="input-field input-height" type="textarea" value={inputData}
                onChange={handleInputData} />
              <button onClick={handleLeft} className="b-button little-btn right-btn" disabled={!chosenTask}>{'<'}</button>
            </div>

            <div className='label-cont'>
              <label className="label center-label">Ожидаемый результат</label>
              <textarea className="input-field input-height" type="text" value={inputExpRes}
                onChange={handleInputExpRes} />
              <button onClick={handleRight} className="b-button little-btn" disabled={!chosenTask}>{'>'}</button>
            </div>
          </div>
          <button onClick={handleViewTests} className="b-button b-width">Сохранить</button>
          <CreateNewTask isOpen={isCreateNewTaskOpen} onClose={closeCreateNewTask} passedName={nameOfTask} passedDesc={descOfTask} saveBtn={handleSaveNew} />
          <ConfirmationWindow isOpen={isConfOpen} onClose={closeConf} delBtn={setDel} whatDel={nameConf} />
        </div>
      </div>
    </>
  );
}

export default Tasks;