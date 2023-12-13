import React, { useState } from 'react';
import Connection from './Сonnection';
import WorkSettings from './WorkSettings';
import Tasks from './Tasks';
import DistributionOfTasks from './DistributionOfTasks';
import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export default function TabPanel() {
  const [activeButton, setActiveButton] = useState(0);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <div className="my-header">
        <div className="per-acc-group" id="224:641">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
            <ellipse cx="12.4997" cy="5.65968" rx="4.16667" ry="3.77297" fill="#1C274C" />
            <ellipse cx="12.4997" cy="16.0352" rx="7.29167" ry="3.77297" fill="#1C274C" />
          </svg>
          <p className="item--VVe" id="224:642">Личный кабинет</p>
        </div>
      </div>
      <Router>
        <div className='group_head_btns'>
          <Link to='/con'>
            <button
              className={activeButton === 0 ? 'conn-btn-active' : 'conn-btn'}
              onClick={() => handleClick(0)}
            >  Подключение
            </button>
          </Link>
          <Link to='/set'>
            <button
              className={activeButton === 1 ? 'set-btn-active' : 'set-btn'}
              onClick={() => handleClick(1)}
            >
              Настройки работы
            </button>
          </Link>
          <Link to='/tasks'>
            <button
              className={activeButton === 2 ? 'main-tasks-btn-active' : 'main-tasks-btn'}
              onClick={() => handleClick(2)}
            >
              Задачи
            </button>
          </Link>
          <Link to='distribution'>
            <button
              className={activeButton === 3 ? 'main-dist-btn-active' : 'main-dist-btn'}
              onClick={() => handleClick(3)}
            >
              Распределение задач
            </button>
          </Link>
        </div>
        <Routes>
          <Route path='/con' element={<Connection />} />
          <Route path='/set' element={<WorkSettings />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/distribution' element={<DistributionOfTasks />} />
        </Routes>
      </Router>
    </>
  );
}
