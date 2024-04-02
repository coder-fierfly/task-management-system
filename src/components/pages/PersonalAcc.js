import React, { useEffect, useState } from 'react';
import ErrorWindow from '../mini-elements/ErrorWindow';


const PersonalAcc = ({ handleLogout }) => {

    const [PersonalData, setPersonalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Loading...')

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
                setPersonalData(data);
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
    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3001/api/v1/setting');
    //         const jsonData = await response.json();
    //         setData(jsonData);
    //         console.log(jsonData);
    //     } catch (error) {
    //         console.error('Ошибка при получении данных:', error);
    //     }
    // };

    // useEffect(() => {
    //     const apiUrl = 'http://localhost:3001/api/v1/setting';
    //     axios.get(apiUrl).then((resp) => {
    //         const allPersons = resp.data;
    //         setAppState(allPersons);
    //     });
    // }, [setAppState]);
    // console.log(appState)
    // const express = require('express');
    // const cors = require('cors');
    // const app = express();

    // const corsOptions = {
    //     origin: 'http://localhost:3000',
    // };

    // app.use(cors(corsOptions));

    // app.listen(3001, () => {
    //     console.log('Сервер запущен на порту 3001');
    // });

    const handleLogoutClick = () => {
        handleLogout();
    };

    // axios.get('http://localhost:3001/api/v1/setting') // Замените URL на ваш API
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Ошибка при получении данных:', error);
    //     });
    return (
        <>
            {loading ? <><div className='main-conn-wrap mess-per-wrap' >         <ErrorWindow isOpen={loading} error={message} />
            </div> </> : <>
                <div className='main-conn-wrap per-acc-wrap'>

                    <h1>Личный кабинет</h1>
                    <div className='little-per-wrap'>
                        <p><span className='bold-span'>Имя: </span>{PersonalData.userDisplayName}</p>
                        <p><span className='bold-span'>Имя в редмайн: </span> {PersonalData.name} </p>
                        <p><span className='bold-span'>API KEY: </span>{PersonalData.apikey} </p>
                    </div>
                    <div>
                        <h2>Таблица проектов</h2>
                        <table className='table-style'>
                            <thead>
                                <tr>
                                    <th>Id проекта в Redmine</th>
                                    <th>Отображаемое имя в списке</th>
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