import React from 'react';

const PersonalAcc = ({ handleLogout }) => {
    const handleLogoutClick = () => {
        handleLogout();
    };
    return (
        <div className='main-conn-wrap'>
            <h1>Добро пожаловать в личный кабинет!</h1>
            <button className="b-button" onClick={handleLogoutClick}>Выйти</button>
        </div>
    );
};

export default PersonalAcc;