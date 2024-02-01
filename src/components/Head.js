import React from 'react';
import { Link } from 'react-router-dom';


function Head() {
    console.log('Рендер компонента Section1');
    return (
        <div>
            <div>
                <Link to="/сonnection">Главная</Link>
                <Link to="/workSettings">Настройка работы </Link>
                <Link to="/tasks">Задачи </Link>
                <Link to="/distributionOfTasks">Распределение задач </Link>
            </div>
        </div>
    );
}

export default Head;