import React, { useState } from 'react';
import "../App.css"

function Connection() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value); 
    };

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);

    const handleCheckboxChange = (checkboxNumber, isChecked) => {
        if (checkboxNumber === 1) {
            setChecked1(isChecked);
        } else if (checkboxNumber === 2) {
            setChecked2(isChecked);
        }
    };

    return (
        <>
            <div className="form-container">
                <label className="label">Введите url ресурса:</label>
                <input className="input-field" type="text" />
                <label className="label">Выберите руководителя проектов:</label>
                {/* TODO список сделать правильные опции чтобы они были в списках*/}

                <select className="input-field" value={selectedOption} onChange={handleChange}>
                    <option value="">Выберите...</option>
                    <option value="option1">Опция 1</option>
                    <option value="option2">Опция 2</option>
                    <option value="option3">Опция 3</option>
                </select>
                <label className="label">Выберите проект:</label>
                <select className="input-field" value={selectedOption} onChange={handleChange}>
                    <option value="">Выберите...</option>
                    <option value="option1">Опция 1</option>
                    <option value="option2">Опция 2</option>
                    <option value="option3">Опция 3</option>
                </select>
                <label className="label">Выберите проект:</label>
                <select className="input-field" value={selectedOption} onChange={handleChange}>
                    <option value="">Выберите...</option>
                    <option value="option1">Опция 1</option>
                    <option value="option2">Опция 2</option>
                    <option value="option3">Опция 3</option>
                </select>
                <label className="label">Выберите итерацию:</label>
                <select className="input-field" value={selectedOption} onChange={handleChange}>
                    <option value="">Выберите...</option>
                    <option value="option1">Опция 1</option>
                    <option value="option2">Опция 2</option>
                    <option value="option3">Опция 3</option>
                </select>
                <label className="label">
                    <input
                        type="checkbox"
                        checked={isChecked1}
                        onChange={() => handleCheckboxChange(1, !isChecked1)}
                    />
                    Показывать ответ в случае ошибки
                </label>
                <label className="label">
                    <input
                        type="checkbox"
                        checked={isChecked2}
                        onChange={() => handleCheckboxChange(2, !isChecked2)}
                    />
                    Проверять все итерации проекта
                </label>

            </div>
            <button>Начать проверку</button>
            <button>Скачать результаты</button>
        </>
    );
}

export default Connection;