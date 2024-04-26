import React, { useState } from 'react';
import '../../App.css';
import DropdownList from './DropdownList';
import Plagiarism from './Plagiarism';
import { getPlagiarism } from '../requestsToTheBack/ReqPlagiarismSt';
import ReactDiffViewer from 'react-diff-viewer';

const ChooseTask = ({ isOpen, onClose, listOfTasks, token, setToken }) => {
    const [listOfStudents, setListOfStudents] = useState('');     // список студентов
    const [loading, setLoading] = useState(true);  // загрузка
    const [chosenTask, setChosenTask] = useState('');
    const [error, setError] = useState('');


    const [message, setMessage] = useState('Загрузка...'); // сообщение в окне загрузки
    const [isPlagiarismOpen, setPlagiarismOpen] = useState(false);    // открытие окна плагиата

    const onCloseBtn = () => {
        console.log("onCloseBtn")
        onClose();
        setPlagiarismOpen(false);
        setChosenTask('');
    }

    // открытие окошка плагиата
    const openPlagiarism = () => {
        console.log("chosenTask", chosenTask)
        if (chosenTask !== '') {
            setLoading(true);
            getPlagiarism(chosenTask, setListOfStudents, setMessage, token, setToken)
                .then((listOfStudents) => {
                    if (listOfStudents) {
                        console.log(listOfStudents)
                        setPlagiarismOpen(true);
                    } else {
                        setError('Задание с таким номером не найдено');
                    }
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Ошибка: ', error);
                    setMessage('Произошла ошибка при загрузке данных');
                });
        } else {
            setError("Вы не выбрали задачу")
        }
    };

    // изменение выбранного проекта
    const handleTaskChange = (value) => {
        setChosenTask(value);
    }

    // если закрыто, то не отображается
    if (!isOpen) {
        return null;
    }
    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="close-btn-container">
                    <button className="clear-btn" onClick={onCloseBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
                <div className="popup-content">
                    <div>
                        <div className="btn-wind">
                            <div className='chooseTask'>
                                <div className='btn-wrap-plag'>
                                    {!isPlagiarismOpen ? <div className='padd-wrap'>
                                        <DropdownList
                                            options={listOfTasks}
                                            selectedValue={chosenTask}
                                            onSelectedValueChange={handleTaskChange}
                                            outputLabel="Выберите задачу"
                                        /><button className='b-button width-btn' onClick={openPlagiarism}>Ок</button>
                                    </div>
                                        : <Plagiarism isOpen={isPlagiarismOpen} listOfStudents={listOfStudents} taskId={chosenTask} token={token} setToken={setToken} setMessage={setMessage} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseTask;


