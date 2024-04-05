import React, { useState, useEffect } from 'react';
import '../../App.css';
import DropdownList from '../mini-elements/DropdownList';
import Plagiarism from '../mini-elements/Plagiarism';
import MoreInfo from '../mini-elements/MoreInfo';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { fetchConRobotSettings } from '../requestsToTheBack/ReqConWorkSettings';
import { fetchPlagiarism } from '../requestsToTheBack/ReqPlagiarismSt';



const Connection = () => {
    // выпадающие списки руководитель, проект и итерация
    const [chosenProject, setChosenProject] = useState('');
    const [chosenIterations, setChosenIterations] = useState('');
    const [listOfIterations, setListOfIterations] = useState('');
    // здесь хранится введенный url
    const [inputUrl, setInputUrl] = useState('');


    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Loading...')

    const [listOfProjects, setListOfProjects] = useState([]);

    // значения checkbox
    const [checkboxValues, setMCheckboxValues] = useState({
        checkboxShowAns: false,
        checkboxAllIterations: false,
    });

    const [listOfStudents, setListOfStudents] = useState('');



    useEffect(() => {
        setMessage('Loading...');
        fetchConRobotSettings(setMCheckboxValues, setLoading, setMessage);
    }, []);

    useEffect(() => {
        fetch('/api/v1/settings/42', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    setMessage('Ошибка сервера: ' + response.status);
                    throw new Error('Ошибка сервера: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                setInputUrl(data.url);
                const transformedData = data.projectsList.map(project => ({
                    name: project.projectName,
                    id: project.projectId
                }));
                setListOfProjects(transformedData);
                setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    setMessage('Время ожидания запроса истекло');
                } else {
                    setMessage(error.message);
                    console.error('Ошибка в запросе к серверу:', error.message);
                }
            });
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
        setChosenIterations(''); // сброс выбранной задачи при изменении темы
    }

    const handleIterationsChange = (id) => {
        setChosenIterations(id)
    }




    const [inputNumber, setInputNumber] = useState('');

    const [isPlagiarismOpen, setPlagiarismOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // TODO: список сделать правильные опции чтобы они были в списках
    // варианты в выпадающем списке


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
    };

    // открытие окошка плагиата
    const openPlagiarism = () => {
        fetchPlagiarism({ inputNumber, setListOfStudents, setLoading, setMessage })
        // if (loading) {
        setTimeout(10)
        setPlagiarismOpen(true);
        // }
    };

    //закрытие окошка плагиата
    const closePlagiarism = () => {
        setPlagiarismOpen(false);
    };

    // нажата проверить задачу
    const handleCheckTask = () => {
        console.log('Кнопка проверить задачу нажата')
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
                            // id="listOfProjectsId"
                            />

                            <div className="label-container">  <p className="label">Выберите итерацию:</p>
                            </div>
                            <DropdownList
                                options={listOfIterations}
                                selectedValue={chosenIterations}
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