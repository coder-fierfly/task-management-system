import React, { useState } from 'react';
import "../App.css";

const CreateNewTask = ({ isOpen, onClose }) => {


    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [isExpanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const handleInputChange = (e, setInput) => {
        setInput(e.target.value);
    };

    const handleSubmit = () => {
        // Ваша логика обработки данных, например, отправка на сервер
        console.log('Данные отправлены:', input1, input2, input3);
    };

    if (!isOpen) {
        return null;
    }
    return (
        <div className="popup-overlay1">
            <div className="popup">
                <div className="popup-content">
                    <p>Ваше всплывающее окно здесь</p>
                    <button onClick={onClose}>Закрыть</button>
                    <>
                        <button onClick={toggleExpand}>
                            {isExpanded ? 'Свернуть' : 'Развернуть окно'}
                        </button>
                        {isExpanded && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Поле 1"
                                    value={input1}
                                    onChange={(e) => handleInputChange(e, setInput1)}
                                />
                                <input
                                    type="text"
                                    placeholder="Поле 2"
                                    value={input2}
                                    onChange={(e) => handleInputChange(e, setInput2)}
                                />
                                <input
                                    type="text"
                                    placeholder="Поле 3"
                                    value={input3}
                                    onChange={(e) => handleInputChange(e, setInput3)}
                                />
                                <button onClick={handleSubmit}>Отправить данные</button>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default CreateNewTask;


