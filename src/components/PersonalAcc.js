import React from 'react';

const PersonalAcc = ({ handleLogout }) => {
    const handleLogoutClick = () => {
        handleLogout();
    };
    return (
        <div>
            <h1>Добро пожаловать в личный кабинет!</h1>
            <button onClick={handleLogoutClick}>Выйти</button>
        </div>
    );
};

export default PersonalAcc;