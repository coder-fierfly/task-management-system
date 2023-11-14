import React, { useState } from 'react';
import "../App.css"
import DropdownList from './DropdownList';

function Connection() {
    const [listVOfDirectors, setListVOfDirectors] = useState('');
    const [listVOfProjects, setListVOfProjects] = useState('');
    const [listVOfIterations, setListVOfIterations] = useState('');

    // TODO список сделать правильные опции чтобы они были в списках
    // варианты в выпадающем списке
    const listOfDirectors = ['Option 1', 'Option 2', 'Option 3'];
    const listOfProjects = ['A2', 'B2', 'C2'];
    const listOfIterations = ['A3', 'B3', 'C3'];

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

    const [inputUrl, setInputUrl] = useState('');
    // реагирует на изменение в поле ввода
    const handleInputChange = (event) => {
        setInputUrl(event.target.value);
    };

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
            </div>
            <div className="b-wrapper">
                <button className="b-button">Начать проверку</button>
                <button className="b-button">Скачать результаты</button>
            </div>

        </>
    );
}

export default Connection;