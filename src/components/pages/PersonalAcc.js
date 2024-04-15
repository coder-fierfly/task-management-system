import React, { useEffect, useState, useContext } from 'react';
import ErrorWindow from '../mini-elements/ErrorWindow';
import { getPersonalData } from '../requestsToTheBack/ReqPersonalData';
import IterationContext from '../IterationContext';



const PersonalAcc = ({ handleLogout }) => {
    const [PersonalData, setPersonalData] = useState(null); // личные данные
    const [loading, setLoading] = useState(true); // статус загрузки
    const [message, setMessage] = useState('Loading...'); // сообщение в окне загрузки
    const { chosenIteration, chosenProject } = useContext(IterationContext);

    useEffect(() => {
        setLoading(true);
        getPersonalData()
            .then(data => {
                console.log(data)
                setPersonalData(data);
                setLoading(false);
            })
            .catch(error => {
                setMessage(error.message);
                console.error('Ошибка в запросе к серверу:', error.message);
            });
    }, []);

    // разлогирование
    const handleLogoutClick = () => {
        handleLogout();
    };
    return (
        <>
            {loading ? <><div className='main-conn-wrap mess-per-wrap' >         <ErrorWindow isOpen={loading} error={message} />
            </div> </> : <>
                <div className='main-conn-wrap per-acc-wrap'>
                    <h1>Личный кабинет</h1>
                    <div className='little-per-wrap'>
                        <p><span className='bold-span'>Имя: </span>{PersonalData.userDisplayName}</p>
                        <p><span className='bold-span'>Имя в редмайн: </span>{PersonalData.name} </p>
                        <p><span className='bold-span'>API KEY: </span>{PersonalData.apikey} </p>
                    </div>
                    <div>
                        <h2>Список проектов</h2>
                        <table className='table-style'>
                            <thead>
                                <tr>
                                    <th>Идентификатор проекта в Redmine</th>
                                    <th>Наименование проекта</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PersonalData.projectsList.map((project, index) => (
                                    <tr key={index}>
                                        <td>{project.projectId}</td>
                                        <td>{project.projectName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="b-button" onClick={handleLogoutClick}>Выйти</button>

                </div>
            </>
            }
        </>
    );
};

export default PersonalAcc;