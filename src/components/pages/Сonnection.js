import React, { useState, useEffect } from 'react';
import '../../App.css';
import DropdownList from '../mini-elements/DropdownList';
import Plagiarism from '../mini-elements/Plagiarism';
import MoreInfo from '../mini-elements/MoreInfo';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { fetchConRobotSettings } from '../requestsToTheBack/ReqConWorkSettings';
import { fetchPlagiarism } from '../requestsToTheBack/ReqPlagiarismSt';
import { fetchPersonalData } from '../requestsToTheBack/ReqPersonalData';


const Connection = () => {
    // TODO: отчет сделать 
    const [chosenProject, setChosenProject] = useState(''); // выбранный проект
    const [chosenIteration, setChosenIteration] = useState(''); // выбранная итерация
    // выпадающие списки проект и итерация
    const [listOfIterations, setListOfIterations] = useState([]);
    const [listOfProjects, setListOfProjects] = useState([]);
    // здесь хранится введенный url
    const [inputUrl, setInputUrl] = useState('');
    const [loading, setLoading] = useState(true);  // загрузка
    const [message, setMessage] = useState('Loading...'); // сообщение в окне загрузки

    // значения checkbox
    const [checkboxValues, setMCheckboxValues] = useState({
        checkboxShowAns: false,
        checkboxAllIterations: false,
        needLint: false,
        assignTasksToStudent: false
    });


    const [listOfStudents, setListOfStudents] = useState('');     // список студентов
    const [inputNumber, setInputNumber] = useState('');    // номер задачи
    const [isPlagiarismOpen, setPlagiarismOpen] = useState(false);    // открытие окна плагиата
    const [isOpen, setIsOpen] = useState(false);    // кнопка закрытия окошек

    useEffect(() => {
        setMessage('Loading...');
        fetchConRobotSettings(setMCheckboxValues, setLoading, setMessage);
        fetchPersonalData()
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
                console.error('Ошибка в запросе к серверу:', error.message);
            });
        setLoading(false);
    }, []);


    const handleProjectChange = (value) => {
        setLoading(true);
        var iterations = "/api/v1/project/iterations/" + value;
        fetch(iterations, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setChosenProject(value)
                const transformedData = data.projectIterations.map((projectIteration, index) => ({
                    id: index + 1,
                    name: projectIteration
                }));
                setListOfIterations(transformedData);
                setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
            }).catch(error => {
                setListOfIterations('');
                console.error('Нет таких данных:', error);
            });;
        setChosenIteration(''); // сброс выбранной задачи при изменении темы
    }

    const handleIterationsChange = (id) => {
        setChosenIteration(id)
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // сменяет значение в checkbox
    const handleCheckboxChange = (checkboxName) => {
        console.log("handleCheckboxChange");
        setMCheckboxValues((prevValues) => ({
            ...prevValues,
            [checkboxName]: !prevValues[checkboxName],
        }));
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

    // нажатие на кнопку начать проверку
    const handleStartChecking = () => {
        console.log('Кнопка проверки была нажата');
        fetch('/api/v1/issueChecker/startFullCheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId: chosenProject,
                iteration: chosenIteration,
                settings: {
                    checkAllIterations: checkboxValues.checkboxAllIterations,
                    showErrorResponse: checkboxValues.checkboxShowAns,
                    needLint: checkboxValues.needLint,
                    assignTasksToStudent: checkboxValues.assignTasksToStudent // Обратите внимание на правильное написание свойства
                }
            })
        })
            .then(response => {
                console.log("response.status ", response.status);
                if (!response.ok) {
                    // Обработка ошибок, если необходимо
                    throw new Error('Ошибка сети: ' + response.status);
                }
                // Обрабатывайте ответ, если необходимо
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка при выполнении запроса:', error);
            });
    };

    // открытие окошка плагиата
    const openPlagiarism = () => {
        fetchPlagiarism({ inputNumber, setListOfStudents, setLoading, setMessage })
        // if (loading) {
        // setTimeout(10)
        console.log("!!! " + !listOfStudents)
        if (listOfStudents) {
            setPlagiarismOpen(true);
        } else {
            setError("Нет такого задания")
        }
        // }
    };

    //закрытие окошка плагиата
    const closePlagiarism = () => {
        setPlagiarismOpen(false);
    };

    // нажата проверить задачу
    const handleCheckTask = () => {
        console.log('Кнопка проверить задачу нажата')
        fetch('/api/v1/issueChecker/startCheckSingleIssue', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "taskId": inputNumber,
                "projectId": chosenProject,
                "settings":
                {
                    "checkAllIterations": checkboxValues.checkboxAllIterations,
                    "showErrorResponse": checkboxValues.checkboxShowAns,
                    "needLint": checkboxValues.needLint,
                    "assingTasksToStudent": checkboxValues.assignTasksToStudent
                }
            })
        })
            .then(response => {
                console.log("response.status ", response.status);
                if (!response.ok) {
                    // Обработка ошибок, если необходимо
                    throw new Error('Ошибка сети: ' + response.status);
                }
                // Обрабатывайте ответ, если необходимо
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка при выполнении запроса:', error);
            });
    }

    return (
        <>
            {loading ? <div> <ErrorWindow isOpen={loading} error={message} /></div> : <>
                <Plagiarism isOpen={isPlagiarismOpen} onClose={closePlagiarism} listOfStudents={listOfStudents} />
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
                <MoreInfo isOpen={isOpen} toggleModal={toggleModal} />
            </>}
        </>
    );
}

export default Connection;