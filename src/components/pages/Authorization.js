import React, { useState } from 'react';
import { getIterations } from '../requestsToTheBack/reqAuthorization';
import ErrorWindow from '../mini-elements/ErrorWindow';


const Authorization = ({ handleLogin }) => {
    const [logValue, setLogValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);  // загрузка
    const [message, setMessage] = useState('Loading...'); // сообщение в окне загрузки

    const handleLogChange = (e) => {
        setLogValue(e.target.value);
    };
    const handlePassChange = (e) => {
        setPassValue(e.target.value);
    };
    const handleLoginClick = () => {
        // setLoading(true)
        getIterations(logValue, passValue, setToken, setMessage)
        // setLoading(false)
        // TODO:
        handleLogin();
    };
    return (
        <div className='main-auth-group'>
            {/* {loading ? <div> <ErrorWindow isOpen={loading} error={message} /></div> : <> */}
            <div className='auth-group'>
                <p className='auth-label'>Авторизация</p>
                <div className='log_group'><p className='log-pass-label'>Логин</p><input className='log-pass-holder'
                    type="text"
                    value={logValue}
                    onChange={handleLogChange}
                /></div>
                <div className='log_group'><p className='log-pass-label'>Пароль</p><input className='log-pass-holder'
                    type='password'
                    value={passValue}
                    onChange={handlePassChange}
                /></div>
                <div className='enter-btn-wrapper'>
                    <button className='enter-btn' onClick={handleLoginClick}>Войти</button>
                </div>
            </div>
            {/* </>} */}
        </div>
    );
};

export default Authorization;