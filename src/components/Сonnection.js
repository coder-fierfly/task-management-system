import React, { useState } from 'react';
import "../App.css"
import DropdownList from './DropdownList';
import Plagiarism from './Plagiarism';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreInfo from './MoreInfo';

function Connection() {
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

    const [isMoreInfoOpen, setMoreInfoOpen] = useState(false);

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
        setInputNumber(event.target.value);
    }

    // нажатие на кнопку начать проверку
    const handleStartChecking = () => {
        console.log('Кнопка проверки была нажата');
    };

    // нажатие на скачивание
    const handleDownload = () => {
        console.log('Кнопка скачать нажата')
    }
    // проверка на плагиат
    const openPlagiarism = () => {
        setPlagiarismOpen(true);
    };

    const closePlagiarism = () => {
        setPlagiarismOpen(false);
    };

    const openMoreInfo = () => {
        setMoreInfoOpen(true);
    };


    const closeMoreInfo = () => {
        setMoreInfoOpen(false);
    };

    // нажата проверить задачу
    const handleCheckTask = () => {
        console.log('Кнопка проверить задачу нажата')
    }


    return (
        <>
            <Plagiarism isOpen={isPlagiarismOpen} onClose={closePlagiarism} listOfStudents={listOfStudents} />

            <div className='main-conn-wrap'>
                <div>
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
                        <div className="label-container">  <p className="label">Выберите итерацию:</p></div>
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
                    <div className="form-container">
                        <input className="input-field" id="inputNumId" type="text" value={inputNumber}
                            onChange={handleInputNumber} placeholder="Введите номер задачи" />
                        <div className='flex-class'>  <button onClick={handleCheckTask} className="b-button">Проверить задачу</button>
                            <button onClick={openPlagiarism} className="b-button">Плагиат</button></div>

                    </div>
                    <div className="b-wrapper">
                        <button onClick={handleStartChecking} className="b-button start-check">Начать проверку</button>
                        <button onClick={toggleModal} class="b-button group-62-Dsb">
                            <p class="more-info-xKP">
                                MORE
                                <br />
                                INFO
                            </p>
                        </button>
                    </div>
                </div>
            </div >
            {/* <div className='dowland-wrapper'><button onClick={handleDownload} className="b-button dowland-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 19" fill="none">
                    <path d="M13.9497 4.54026C14.3403 4.93078 14.3403 5.56395 13.9497 5.95447C13.5592 6.34499 12.9261 6.34499 12.5355 5.95447L10 3.41894V13C10 13.5523 9.55229 14 9 14C8.44771 14 8 13.5523 8 13V3.41894L5.46447 5.95447C5.07394 6.34499 4.44078 6.34499 4.05025 5.95447C3.65973 5.56395 3.65973 4.93078 4.05025 4.54026L8.11612 0.474393C8.60427 -0.013762 9.39573 -0.013763 9.88388 0.474393L13.9497 4.54026Z" fill="#09244B" />
                    <path d="M1 12C1.55228 12 2 12.4477 2 13V17H16V13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13V17C18 18.1046 17.1046 19 16 19H2C0.895431 19 0 18.1046 0 17V13C0 12.4477 0.447715 12 1 12Z" fill="#09244B" />
                </svg></button></div> */}
            <MoreInfo isOpen={isOpen} toggleModal={toggleModal} />
        </>
    );
}

export default Connection;