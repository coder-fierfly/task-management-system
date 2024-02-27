import React, { useState, useEffect } from 'react';
import "../App.css"
import DropdownList from './DropdownList';
import CreateNewTask from './CreateNewTask';
import ConfirmationWindow from './ConfirmationWindow';

// TODO: сделать чтобы тесты показывались после выбора задачи
function Tasks() {
  const listInputData = ['000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwwwwwwwwwwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww 000aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa ssssssssssssss dddddddddddddddd wwwww', '1', '2', '3']; // входные данные
  const listInputExpRes = ['0001', '11', '21', '31']; // входные данные
  const [listVOfThemes, setListVOfThemes] = useState(''); // тема
  const [listVOfTasks, setListVOfTasks] = useState(''); // задачи
  const [listVOfTests, setListVOfTests] = useState(''); // тесты
  const listOfThemes = ['A2', 'B2', 'AAA2', 'C2']; // список тем
  const listOfTests = ['A11', 'B11', 'C11']; // список тестов
  const listOfTasks = ['A1', 'B1', 'C1']; // список заданий
  const [nameOfTask, setNameOfTask] = useState('');
  const [nameConf, setConf] = useState('');
  const [descOfTask, setDeskOfTask] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // индекс текущего элемента
  const [inputData, setData] = useState(listInputData[currentIndex]); // входные данные
  const [inputExpRes, setExpRes] = useState(listInputExpRes[currentIndex]); // ожидаемый результат

  // сортировка списков и добавление варианта в начало
  listOfThemes.sort();
  listOfTasks.sort();
  listOfTests.sort();
  listOfThemes.unshift('Все темы');


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
  const handleSaveNewTask = () => {
    console.log("сохранить новые задачи")
  }

  useEffect(() => {
    setData(listInputData[currentIndex]);
    setExpRes(listInputExpRes[currentIndex]);
  }, [currentIndex]);

  return (
    <>
      <div className='main-conn-wrap t-w'>
        <div className='tasks-wrap'>
          <div className='dropdown-wrap'>
            <DropdownList
              options={listOfThemes}
              selectedValue={listVOfThemes}
              onSelectedValueChange={setListVOfThemes}
              outputLabel="Выберите тему"
            />
            <DropdownList
              options={listOfTasks}
              selectedValue={listVOfTasks}
              onSelectedValueChange={setListVOfTasks}
              outputLabel="Выберите задачу"
            />
            <div className="flex-line-tasks">
              <button onClick={handleYourIter} className="b-button left-btn">Добавить задачу себе в итерацию</button>
              <div>
                {/* кнопка информации */}
                <button onClick={handleInfoTask} className="b-button little-btn "><label className="label center-label info-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" fill="#1C274C" /></svg>
                </label></button></div>
              <div>
                {/* кнопка плюс */}
                <button onClick={handlePlusTask} className="b-button little-btn"><label className="label center-label">+</label></button></div>
              {/* кнопка мусорки */}
              <button onClick={handleTrashTask} className="b-button trash-btn">
                <div className='flex'>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
                    <rect width="19" height="19" transform="matrix(-1 0 0 1 19 0)" fill="url(#pattern0)" />
                    <defs>
                      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_224_221" transform="scale(0.0104167)" />
                      </pattern>
                      <image id="image0_224_221" width="96" height="96" xlinkHref="data:image/png;base64,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" />
                    </defs>
                  </svg>
                </div>
              </button>
            </div>
            <DropdownList
              options={listOfTests}
              selectedValue={listVOfTests}
              onSelectedValueChange={setListVOfTests}
              outputLabel="Выберите тест"
            />
            <div className="flex-line-right">
              <button onClick={handlePlusTest} className="b-button little-btn"><label className="label center-label">+</label></button>
              <button onClick={handleTrashTest} className="b-button little-btn">
                <div className='flex'>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
                    <rect width="19" height="19" transform="matrix(-1 0 0 1 19 0)" fill="url(#pattern0)" />
                    <defs>
                      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_224_221" transform="scale(0.0104167)" />
                      </pattern>
                      <image id="image0_224_221" width="96" height="96" xlinkHref="data:image/png;base64,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" />
                    </defs>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className='check-container form-width'>
            <div className='label-cont'>
              <label className="label center-label">Входные данные</label>
              <textarea className="input-field input-height" type="textarea" value={inputData}
                onChange={handleInputData} />
              <button onClick={handleLeft} className="b-button little-btn right-btn ">{'<'}</button>
            </div>

            <div className='label-cont'>
              <label className="label center-label">Ожидаемый результат</label>
              <textarea className="input-field input-height" type="text" value={inputExpRes}
                onChange={handleInputExpRes} />
              <button onClick={handleRight} className="b-button little-btn">{'>'}</button>
            </div>
          </div>
          <button onClick={handleViewTests} className="b-button b-width">Сохранить</button>

          <CreateNewTask isOpen={isCreateNewTaskOpen} onClose={closeCreateNewTask} passedName={nameOfTask} passedDesc={descOfTask} />
          <ConfirmationWindow isOpen={isConfOpen} onClose={closeConf} delBtn={setDel} whatDel={nameConf} />
        </div>
      </div>
    </>
  );
}

export default Tasks;