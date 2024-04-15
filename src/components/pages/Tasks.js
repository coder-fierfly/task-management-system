/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import DropdownList from '../mini-elements/DropdownList';
import CreateNewTask from '../mini-elements/CreateNewTask';
import ConfirmationWindow from '../mini-elements/ConfirmationWindow';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { getAllTopics, getTasks, getTests, handleIter, putTest, postIssue } from '../requestsToTheBack/ReqTasks';
import IterationContext from '../IterationContext';


function Tasks() {
  const [taskChange, setTaskChange] = useState(true); // смена задач
  const [themeList, setThemeList] = useState([]); // лист тем
  const [selectedTheme, setSelectedTheme] = useState(''); // выбранная тема
  const [listTask, setListTask] = useState([]); // список заданий
  const [listTest, setListTest] = useState([]); // список тестов
  const [inputData, setData] = useState(); // входные данные
  const [inputExpRes, setExpRes] = useState(); // ожидаемый результат
  const [chosenTask, setChosenTask] = useState(''); // задача выбранная
  const [chosenTest, setChosenTest] = useState(''); // тест выбранный
  const [config, setConfig] = useState(''); // текст конфигурации задачи
  const [chosenTheme, setChosenTheme] = useState(''); // тема выбранная 
  const [message, setMessage] = useState('Loading...'); // сообщение в окне загрузки
  const [loading, setLoading] = useState(true); // статус загрузки
  const [nameOfTask, setNameOfTask] = useState(''); // название задачи
  const [nameConf, setConf] = useState(''); // конфигурация
  const [descOfTask, setDeskOfTask] = useState(''); // описание задачи
  const [isCreateNewTaskOpen, setCreateNewTaskOpen] = useState(false); // открыто ли окно создания задачи
  const [isConfOpen, setConfOpen] = useState(false); // открыта ли конфигурация
  const { chosenIteration, chosenProject } = useContext(IterationContext); // выбранные итерация и проект
  const [key, setKey] = useState(0); // для обновления dropdown

  // запрос тем
  useEffect(() => {
    getAllTopics(setThemeList, setLoading, setMessage);
    setLoading(false);
  }, []);
  const themeNamesArray = themeList.map((theme) => theme.themeName);
  if (selectedTheme.length === 0) {
    setSelectedTheme(themeNamesArray);
  }

  // сортировка
  themeNamesArray.sort();
  themeNamesArray.unshift('Все темы');

  // реагирует на изменение в поле ввода с входными данными
  const handleInputData = (event) => {
    setData(event.target.value);
  };

  // кнопка для удаления
  const setDel = () => {
    console.log("удаляяяем")
  }

  // просмотр тестов
  const handleSaveTests = () => {
    console.log("handleSaveTests");
    putTest(chosenTask, inputData, inputExpRes, setLoading);
  }

  // реагирует на изменение в поле ввода с ожидаемым результатом
  const handleInputExpRes = (event) => {
    setExpRes(event.target.value);
  };

  // кнопки лево и право
  const handleLeft = () => {
    console.log("handleLeft")
    const testIdAsNumber = +chosenTest;
    const currentIndex = listTest.findIndex(test => test.id === testIdAsNumber);
    if (currentIndex > 0) {
      handleTestChange(listTest[currentIndex - 1].id);
    }
  }
  const handleRight = () => {
    const testIdAsNumber = +chosenTest;
    const currentIndex = listTest.findIndex(test => test.id === testIdAsNumber);
    if (currentIndex < listTest.length - 1) {
      handleTestChange(listTest[currentIndex + 1].id);
    }
  }

  // кнопки к задачам, плюс, корзина и информация
  const handlePlusTask = () => {
    console.log("кнопка плюс задача");
    setTaskChange(false);
    setChosenTask('');
    setCreateNewTaskOpen(true);
  }

  // Обновляем ключ каждый раз, когда изменяется selectedValue
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [chosenTask]);

  // информация о задаче
  const handleInfoTask = () => {
    setTaskChange(true);
    const foundTask = listTask.find(task => task.id === chosenTask);
    setNameOfTask(foundTask.taskSubject);
    setDeskOfTask(foundTask.taskDescription);
    setConfig(foundTask.config)
    setCreateNewTaskOpen(true);
    console.log("кнопка информации о задачке")
  }

  // закрытие создания новой задачи
  const closeCreateNewTask = () => {
    setCreateNewTaskOpen(false);
  };

  // сменя задачи
  const handleTaskChange = (value) => {
    getTests(value, setListTest, setChosenTask, setMessage);
    setLoading(false);
    setChosenTask(value)
    setChosenTest(''); // сброс выбранного теста при изменении задачи
  }

  // закрытие конфигурации
  const closeConf = () => {
    setConfOpen(false);
  };

  // изменение темы
  const handleThemeChange = (value) => {
    getTasks(value, setChosenTheme, setListTask, setMessage);
    setChosenTask(''); // сброс выбранной задачи при изменении темы
    setLoading(false);
  }

  // задача в мусор
  const handleTrashTask = () => {
    setConf('задачу');
    setConfOpen(true);
    console.log("кнопка задачки в мусор")
  }

  // изменение теста
  const handleTestChange = (testId) => {
    console.log("handleTestChange");
    setChosenTest(testId);
    const testIdAsNumber = +testId;
    const test = listTest.find(test => test.id === testIdAsNumber);
    if (test) {
      const { inputData, outPutData } = test;
      setData(inputData)
      setExpRes(outPutData)
    } else {
      console.error("Test with ID", testIdAsNumber, "not found.");
    }
  }

  // кнопка теста в мусор
  const handleTrashTest = () => {
    setConf('тест');
    setConfOpen(true);
    console.log("кнопка теста в мусор")
  }

  // кнопки к тесту плюс, корзина
  const handlePlusTest = () => {
    setData('');
    setExpRes('');
    console.log("кнопка плюс тест");
  }

  // добавить задачу себе в итерацию
  const handleYourIter = () => {
    console.log("добавить задачу себе в итерацию")
    postIssue(chosenTask, setMessage, chosenIteration);
    handleIter(chosenTask, setMessage, chosenIteration);
  }

  return (
    <>
      <div className='main-conn-wrap t-w'>
        <div className='tasks-wrap'>
          {loading ? <div> <ErrorWindow isOpen={loading} error={message} /></div> : <>
            <div className='dropdown-wrap'>
              <DropdownList
                options={themeList}
                selectedValue={chosenTheme}
                onSelectedValueChange={handleThemeChange}
                outputLabel="Выберите тему"
              />
              <div key={key}>
                <DropdownList
                  options={listTask}
                  selectedValue={chosenTask}
                  onSelectedValueChange={(value) => {
                    handleTaskChange(value);
                    setChosenTask(value);
                  }}
                  outputLabel="Выберите задачу"
                  disabled={!chosenTheme} // задачи будут недоступны, если тема не выбрана
                />
              </div>
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
                <button onClick={handleTrashTask} className="b-button trash-btn" disabled={true}>
                  <div className='flex'>
                    {/* {chosenTask ?
                      <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                      : */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#AAAAAA" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                    {/* } */}
                  </div>
                </button>
              </div>
              <DropdownList
                key={chosenTest}
                options={listTest}
                selectedValue={chosenTest}
                onSelectedValueChange={handleTestChange}
                outputLabel="Выберите тест"
                disabled={!chosenTask} // тесты будут недоступны, если задача не выбрана
              />
              <div className="flex-line-right">
                <button onClick={handlePlusTest} className="b-button little-btn" disabled={!chosenTask}>+</button>
                <button onClick={handleTrashTest} className="b-button trash-btn help" disabled={true}>
                  <div className='flex'>
                    <div className='flex'>
                      {/* {chosenTest ? */}
                      {/* <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                         : */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#AAAAAA" height="19" viewBox="0 -960 960 960" width="19"><path d="M256.478-105.869q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237v-560.391h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044v-560.391Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478-745.478v560.391-560.391Z" /></svg>
                      {/* } */}
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className='check-container form-width'>
              <div className='label-cont'>
                <label className="label center-label">Входные данные</label>
                <textarea className="input-field input-height" type="textarea" value={inputData}
                  onChange={handleInputData} disabled={!chosenTask} />
                <button onClick={handleLeft} className="b-button little-btn right-btn" disabled={!chosenTask}>{'<'}</button>
              </div>

              <div className='label-cont'>
                <label className="label center-label">Ожидаемый результат</label>
                <textarea className="input-field input-height" type="text" value={inputExpRes}
                  onChange={handleInputExpRes} disabled={!chosenTask} />
                <button onClick={handleRight} className="b-button little-btn" disabled={!chosenTask}>{'>'}</button>
              </div>
            </div>
            <button onClick={handleSaveTests} className="b-button b-width" disabled={!chosenTask}>Сохранить</button>
            <CreateNewTask isOpen={isCreateNewTaskOpen} onClose={closeCreateNewTask} passedName={nameOfTask} passedDesc={descOfTask} passedConf={config} taskChange={taskChange} themeList={themeList} chosenTheme={chosenTheme} chosenTask={chosenTask} descOfTask={descOfTask} setLoading={setLoading} />
            <ConfirmationWindow isOpen={isConfOpen} onClose={closeConf} delBtn={setDel} whatDel={nameConf} />
          </>}
        </div>
      </div>
    </>
  );
}

export default Tasks;