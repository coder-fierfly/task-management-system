import React, { useState } from 'react';
import '../../App.css';
import DropdownList from '../mini-elements/DropdownList';
import Plagiarism from '../mini-elements/Plagiarism';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreInfo from '../mini-elements/MoreInfo';

const Connection = () => {
    // в личном кабе долджны быть данные из файлика имя, id проекта, человекочитаемое имя, apikey для реда.
    // итерации будут грузится из реда 
    // кнопку начать проверку побольше

    // выпадающие списки руководитель, проект и итерация
    const [listVOfProjects, setListVOfProjects] = useState('');
    const [listVOfIterations, setListVOfIterations] = useState('');
    // здесь хранится введенный url
    const [inputUrl, setInputUrl] = useState('https://www.hostedredmine.com/');

    const [inputNumber, setInputNumber] = useState('');

    const [isPlagiarismOpen, setPlagiarismOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // TODO: список сделать правильные опции чтобы они были в списках
    // варианты в выпадающем списке

    const listOfProjects = ['A2', 'B2', 'C2'];
    const listOfIterations = ['A3', 'B3', 'C3'];
    const listOfStudents = ['A', 'B', 'C'];


    // значения checkbox
    const [checkboxValues, setCheckboxValues] = useState({
        checkboxShowAns: false,
        checkboxAllIterations: false,
    });

    // сменяет значение в checkbox
    const handleCheckboxChange = (checkboxName) => {
        console.log("handleCheckboxChange");
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
        const value = event.target.value;
        setInputNumber(value);
        // Проверка на правильность ввода числа
        if (!/^\d+$/.test(value)) {
            setError('Пожалуйста, введите корректное число');
        } else {
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
        setPlagiarismOpen(true);
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
                            selectedValue={listVOfProjects}
                            onSelectedValueChange={setListVOfProjects}
                            id="listOfProjectsId"
                        />
                        <div className="label-container">  <p className="label">Выберите итерацию:</p>
                        </div>
                        <DropdownList
                            options={listOfIterations}
                            selectedValue={listVOfIterations}
                            onSelectedValueChange={setListVOfIterations}
                            id="listOfIterId"
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
        </>
    );
}

export default Connection;