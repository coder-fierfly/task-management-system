import React from 'react';

const PersonalAcc = ({ handleLogout }) => {
    const handleLogoutClick = () => {
        handleLogout();
    };
    return (
        <div className='main-conn-wrap per-acc-wrap'>
            <h1>Личный кабинет</h1>
            <div className='little-per-wrap'>
                <p>Имя: </p>
                <p>API KEY: </p>
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
                        <tr>
                            <td>1</td>
                            <td>Проект A</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Проект B</td>
                        </tr>
                        {/* Добавьте другие строки, если необходимо */}
                    </tbody>
                </table>
            </div>
            <button className="b-button" onClick={handleLogoutClick}>Выйти</button>
        </div>
    );
};

export default PersonalAcc;