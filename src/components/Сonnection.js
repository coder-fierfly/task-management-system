import React, { useState } from 'react';
import "../App.css"
import DropdownList from './DropdownList';

function Connection() {
    // выпадающие списки руководитель, проект и итерация
    const [listVOfDirectors, setListVOfDirectors] = useState('');
    const [listVOfProjects, setListVOfProjects] = useState('');
    const [listVOfIterations, setListVOfIterations] = useState('');
    // здесь хранится введенный url
    const [inputUrl, setInputUrl] = useState('');

    const [inputNumber, setInputNumber] = useState('');

    // TODO список сделать правильные опции чтобы они были в списках
    // варианты в выпадающем списке
    const listOfDirectors = ['Option 1', 'Option 2', 'Option 3'];
    const listOfProjects = ['A2', 'B2', 'C2'];
    const listOfIterations = ['A3', 'B3', 'C3'];

    // значения checkbox
    const [checkboxValues, setCheckboxValues] = useState({
        checkboxShowAns: false,
        checkboxAllIterations: false,
    });

    // сменяет значение в checkbox
    const handleCheckboxChange = (checkboxName) => {
        setCheckboxValues((prevValues) => ({
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
        setInputNumber(event.target.value);
    }

    // нажатие на кнопку начать проверку
    const handleStartChecking = () => {
        console.log('Кнопка проверки была нажата');
        console.log(listVOfDirectors + ' руководитель')
    };

    // нажатие на скачивание
    const handleDownload = () => {
        console.log('Кнопка скачать нажата')
    }
    // проверка на плагиат
    const handleCheckForPlagiarism = () => {
        console.log('Кнопка плагиат нажата')
    }
    // нажата проверить задачу
    const handleCheckTask = () => {
        console.log('Кнопка проверить задачу нажата')
    }

    // просмотр тестов
    const handleViewTests = () => {
        console.log("Кнопка просмотр текстов нажата");
    }

    return (
        <>
            <div className="form-container">
                <label className="label">Введите url ресурса:</label>
                <input className="input-field" type="text" value={inputUrl}
                    onChange={handleInputChange} />
                <label className="label">Выберите руководителя проектов:</label>
                <DropdownList
                    options={listOfDirectors}
                    selectedValue={listVOfDirectors}
                    onSelectedValueChange={setListVOfDirectors}
                />

                <label className="label">Выберите проект:</label>
                <DropdownList
                    options={listOfProjects}
                    selectedValue={listVOfProjects}
                    onSelectedValueChange={setListVOfProjects}
                />

                <label className="label">Выберите итерацию:</label>
                <DropdownList
                    options={listOfIterations}
                    selectedValue={listVOfIterations}
                    onSelectedValueChange={setListVOfIterations}
                />
                <label className="label">
                    <input
                        type="checkbox"
                        checked={checkboxValues.checkboxShowAns}
                        onChange={() => handleCheckboxChange('checkboxShowAns')}
                    />
                    Показывать ответ в случае ошибки
                </label>
                <label className="label">
                    <input
                        type="checkbox"
                        checked={checkboxValues.checkboxAllIterations}
                        onChange={() => handleCheckboxChange('checkboxAllIterations')}
                    />
                    Проверять все итерации проекта
                </label>
                <div className='flex-line'>
                    <input className="input-field" type="number" value={inputNumber}
                        onChange={handleInputNumber} placeholder="Введите номер задачи" />
                    <button onClick={handleCheckTask} className="b-button">Проверить задачу</button>
                </div>
                <div className='flex-line'>
                    <button onClick={handleViewTests} className="b-button">Посмотреть тесты</button>
                    <button onClick={handleCheckForPlagiarism} className="b-button">Плагиат</button>
                </div>
            </div>

            <div className="b-wrapper">
                <button onClick={handleStartChecking} className="b-button">Начать проверку</button>
                <button onClick={handleDownload} className="b-button">Скачать результаты</button>
            </div>

        </>
    );
}

export default Connection;