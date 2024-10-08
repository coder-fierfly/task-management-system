import React, { useState, useEffect, useContext, useCallback } from 'react';
import '../../App.css';
import DropdownList from '../mini-elements/DropdownList';
import MoreInfo from '../mini-elements/MoreInfo';
import ErrorWindow from '../mini-elements/ErrorWindow';
import ChooseTask from '../mini-elements/ChooseTask';
import { getConRobotSettings, putConRobotSettings, postStartChecking, getIterations, getAllTasks, postCheckTask, getStartChecking } from '../requestsToTheBack/ReqConWorkSettings';
import { getPersonalData } from '../requestsToTheBack/ReqPersonalData';
import IterationContext from '../IterationContext';


const Connection = () => {
    const { chosenIteration, setChosenIteration, chosenProject, setChosenProject, token, setToken } = useContext(IterationContext);
    const [logs, setLogs] = useState(() => {
        const savedLogs = localStorage.getItem('logs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });    // логи

    useEffect(() => {
        localStorage.setItem('logs', JSON.stringify(logs));
    }, [logs]);

    // выпадающие списки проект и итерация и задач
    const [listOfIterations, setListOfIterations] = useState([]);
    const [listOfProjects, setListOfProjects] = useState([]);
    const [listOfTasks, setListOfTasks] = useState([]);
    // здесь хранится введенный url
    const [inputUrl, setInputUrl] = useState('');
    const [loading, setLoading] = useState(true);  // загрузка
    const [message, setMessage] = useState('Загрузка...'); // сообщение в окне загрузки

    // значения checkbox
    const [checkboxValues, setMCheckboxValues] = useState({
        checkboxShowAns: false,
        checkboxAllIterations: false,
        needLint: false,
        assignTasksToStudent: false
    });

    const [listOfStudents, setListOfStudents] = useState('');     // список студентов
    const [inputNumber, setInputNumber] = useState();    // номер задачи
    const [isPlagiarismOpen, setPlagiarismOpen] = useState(false);    // открытие окна плагиата
    const [isOpen, setIsOpen] = useState(false);    // кнопка закрытия окошек
    const [chosenTask, setChosenTask] = useState();


    useEffect(() => {
        setMessage('Загрузка...');
        getConRobotSettings(setMCheckboxValues, setLoading, token, setToken);
        getAllTasks(setListOfTasks, token, setToken).then(() => {
            getPersonalData(token, setToken, setMessage)
                .then(data => {
                    setInputUrl(data.url);
                    const transformedData = data.projectsList.map(project => ({
                        name: project.projectName,
                        id: project.projectId
                    }));
                    setListOfProjects(transformedData);
                    setLoading(false);
                })
                .catch(error => {
                    setMessage(error.message);
                    console.log('Ошибка в запросе к серверу:', error.message);
                });
        });
        setLoading(false);
    }, []);

    // изменение выбранного проекта
    const handleProjectChange = (value) => {
        setLoading(true);
        getIterations(value, setListOfIterations, setLoading, token, setToken, setMessage).then(() => {
            setChosenProject(value);
        });
        setChosenIteration(''); // сброс выбранной задачи при изменении темы
    }

    // изменение итераций
    const handleIterationsChange = (id) => {
        console.log("handleIterationsChange")
        setChosenIteration(id)
    }


    // открытие отчета
    const toggleModal = () => {
        getLogs();
        setIsOpen(!isOpen);
    };

    // сменяет значение в checkbox
    const handleCheckboxChange = (checkboxName) => {
        setMCheckboxValues((prevValues) => {
            const updatedValues = {
                ...prevValues,
                [checkboxName]: !prevValues[checkboxName],
            };
            // Сохраняем настройки при каждом изменении чекбокса
            putConRobotSettings(updatedValues, setMessage, setLoading, token, setToken);
            return updatedValues;
        });
    };

    // реагирует на изменение в поле ввода с url
    const handleInputChange = (event) => {
        setInputUrl(event.target.value);
    };

    // изменение в поле ввода номера задачи
    const handleInputNumber = (event) => {
        const value = event.target.value;
        // Проверка на правильность ввода числа
        if (!/^\d+$/.test(value)) {
            setError('Пожалуйста, введите корректное число');
        } else {
            setInputNumber(value);
            setError('');
        }
    }

    //текст ошибки
    const [error, setError] = useState('');
    const [errorCheck, setErrorCheck] = useState('');
    const [idStart, setIdStart] = useState(0);

    // нажатие на кнопку начать проверку
    const handleStartChecking = () => {
        console.log('Кнопка проверки была нажата');
        getLogs();
        if (chosenProject && chosenIteration) {
            postStartChecking(chosenProject, chosenIteration, checkboxValues, token, setToken, setMessage);
            setIsOpen(true);
        } else {
            setErrorCheck("Вы не выбрали проект или итерацию");
        }
    };

    // получение логов
    const getLogs = useCallback(() => {
        console.log("idStart ", idStart)
        getStartChecking(idStart, setLogs, setMessage, token, setToken).then((logs) => {
            if (logs.length > 0) {
                const lastLog = logs[logs.length - 1];
                const lastRecordId = lastLog.recordId;
                console.log("lastRecordId ", lastRecordId)
                setIdStart(lastRecordId);
            }
        });
    }, [idStart, setLogs, setMessage]);

    useEffect(() => {
        if (idStart !== 0 && isOpen) {
            const intervalId = setInterval(getLogs, 180000); // 3 минуты
            return () => clearInterval(intervalId);
        }
    }, [getLogs, idStart, isOpen]);

    // открытие окошка плагиата
    const openPlagiarism = () => {
        setPlagiarismOpen(true);
    };

    //закрытие окошка плагиата
    const closePlagiarism = () => {
        setPlagiarismOpen(false);
    };

    // нажата проверить задачу
    const handleCheckTask = () => {
        console.log('Кнопка проверить задачу нажата')
        if (inputNumber) {
            setError("")
            postCheckTask(inputNumber, chosenProject, checkboxValues, token, setToken);
            getLogs();
            setIsOpen(true);
        } else {
            setError("Вы не выбрали задачу")
        }
    }

    useEffect(() => {
        // Проверка, что chosenIteration и chosenProject не пустые
        if (chosenIteration && chosenProject) {
            // Вызов функций handleProjectChange и handleIterationsChange
            handleProjectChange(chosenProject);
            handleIterationsChange(chosenIteration);
        }
    }, [chosenIteration, chosenProject]);


    return (
        <>
            <IterationContext.Provider value={{ chosenIteration, setChosenIteration, chosenProject, setChosenProject }}>
                {loading ? <div> <ErrorWindow isOpen={loading} error={message} /></div> : <>
                    {/* <Plagiarism isOpen={isPlagiarismOpen} onClose={closePlagiarism} listOfStudents={listOfStudents} /> */}
                    <div className='main-conn-wrap connection-wrap'>
                        <div className='mini-conn-wrap'>
                            <div className="form-container">
                                <div className='label-container'><label htmlFor="urlInputId" className="label">Введите url ресурса:</label></div>
                                <input id="urlInputId" className="input-field" type="text" value={inputUrl}
                                    onChange={handleInputChange} />
                                <div className="label-container">  <p className="label">Выберите проект:</p></div>
                                <DropdownList
                                    options={listOfProjects}
                                    selectedValue={chosenProject}
                                    onSelectedValueChange={handleProjectChange}
                                    id="chosenPro"
                                />
                                <div className="label-container">  <p className="label">Выберите итерацию:</p>
                                </div>
                                <DropdownList
                                    options={listOfIterations}
                                    selectedValue={chosenIteration}
                                    onSelectedValueChange={handleIterationsChange}
                                    id="listOfIterId"
                                    disabled={!chosenProject}
                                />
                            </div>
                            <div className='check-container'>
                                <div className='label-center'>
                                    <input className='checkbox'
                                        type="checkbox"
                                        id="checkboxShowAnsId"
                                        checked={checkboxValues.checkboxShowAns}
                                        onChange={() => handleCheckboxChange('checkboxShowAns')}
                                    />
                                    <label htmlFor="checkboxShowAnsId" className="label">
                                        Показывать ответ в случае ошибки
                                    </label>
                                </div>
                                <div className='label-center'> <input className='checkbox'
                                    type="checkbox"
                                    id="checkboxAllIterId"
                                    checked={checkboxValues.checkboxAllIterations}
                                    onChange={() => handleCheckboxChange('checkboxAllIterations')}
                                />
                                    <label htmlFor="checkboxAllIterId" className="label">Проверять все итерации проекта</label></div>
                            </div>
                            <div className='mess-per-wrap class-err'> {errorCheck && <div className="error-message">{errorCheck}</div>}</div>
                            <div className="b-wrapper">
                                <button onClick={handleStartChecking} className="b-button start-check">Начать проверку</button>
                                <div onClick={toggleModal} >
                                    <p className="more-info-xKP">
                                        Отчет
                                    </p>
                                </div>
                            </div>
                            <div className="form-container">

                                <div>
                                    <input className="input-field" id="inputNumId" type="textarea" defaultValue={inputNumber}
                                        onChange={handleInputNumber} placeholder="Введите номер задачи" />
                                    {error && <div className="error-message">{error}</div>}</div>
                                <div className='flex-class'>  <button onClick={handleCheckTask} className="b-button b-height">Проверить задачу</button>
                                    <button onClick={openPlagiarism} className="b-button b-height">Плагиат</button></div>
                            </div>
                        </div>
                    </div >
                    <MoreInfo isOpen={isOpen} toggleModal={toggleModal} logs={logs} />
                    <ChooseTask isOpen={isPlagiarismOpen} onClose={closePlagiarism} listOfTasks={listOfTasks} token={token} setToken={setToken} />
                </>}
            </IterationContext.Provider>
        </>
    );
}

export default Connection;