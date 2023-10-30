import React from 'react';
import { Link } from 'react-router-dom';

function Head() {
    console.log('Рендер компонента Section1');
    return (
        <div>
            <div>
                <Link to="/сonnection">Connection </Link>
                <Link to="/workSettings">WorkSettings </Link>
                <Link to="/tasks">Tasks </Link>
                <Link to="/distributionOfTasks">DistributionOfTasks </Link>
            </div>
        </div>
    );
}

export default Head;