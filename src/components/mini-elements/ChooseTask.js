import React, { useState } from 'react';
import '../../App.css';
import DropdownList from './DropdownList';
import Plagiarism from './Plagiarism';
import { getPlagiarism } from '../requestsToTheBack/ReqPlagiarismSt';
import ErrorWindow from '../mini-elements/ErrorWindow';


const ChooseTask = ({ isOpen, onClose, listOfTasks, token, setToken }) => {
    const [listOfStudents, setListOfStudents] = useState('');     // список студентов
    const [loading, setLoading] = useState(false);  // загрузка
    const [chosenTask, setChosenTask] = useState('');
    const [nameTask, setNameTask] = useState('');

    const [message, setMessage] = useState('Загрузка...'); // сообщение в окне загрузки
    const [isPlagiarismOpen, setPlagiarismOpen] = useState(false);    // открытие окна плагиата
    const [err, setErr] = useState(false)

    const onCloseBtn = () => {
        console.log("onCloseBtn")
        onClose();
        setPlagiarismOpen(false);
        setChosenTask('');
    }

    // открытие окошка плагиата
    const openPlagiarism = () => {
        if (chosenTask !== '') {
            setErr(false);
            setLoading(true);
            getPlagiarism(chosenTask, setListOfStudents, setMessage, token, setToken)
                .then((listOfStudents) => {
                    if (listOfStudents) {
                        setPlagiarismOpen(true);
                    }
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Ошибка: ', error);
                    setMessage('Произошла ошибка при загрузке данных',  error);
                });
        } else {
            setErr(true);
        }
    };

    // изменение выбранного проекта
    const handleTaskChange = (value) => {
        setChosenTask(value);
        var buff = listOfTasks.find((task) => task.id === value);
        setNameTask(buff.name);
    }

    // если закрыто, то не отображается
    if (!isOpen) {
        return null;
    }
    return (
        <> {loading ? <div> <ErrorWindow isOpen={loading} error={message} /></div> : <div className="popup-overlay">
            <div className="popup">
                <div className="close-btn-container plag-top">
                    <p className="vertical-center">{!isPlagiarismOpen ? "Плагиат" : nameTask}</p>
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
                                        />
                                        <div className='btn-text'> {err && <p>Вы не выбрали задачу.</p>}<button className='b-button width-btn' onClick={openPlagiarism}>Ок</button>
                                        </div>
                                    </div>
                                        : <Plagiarism isOpen={isPlagiarismOpen} listOfStudents={listOfStudents} taskId={chosenTask} token={token} setToken={setToken} setMessage={setMessage} onClose={onClose} nameTask={nameTask} setPlagiarismOpen={setPlagiarismOpen} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}</>

    );
};

export default ChooseTask;


