import React, { useState } from 'react';
import Connection from './Сonnection';
import WorkSettings from './WorkSettings';
import Tasks from './Tasks';
import DistributionOfTasks from './DistributionOfTasks';
import PersonalAcc from './PersonalAcc';
import Authorization from './Authorization';
import { Navigate } from 'react-router-dom';
import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export default function TabPanel() {
  const [activeButton, setActiveButton] = useState(1);
  const [isLogged, setLogged] = useState(false);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleLogin = () => {
    setLogged(true);

  };

  const handleLogout = () => {
    setLogged(false);
  };

  return (
    <>
      <Router>
        <div className='all-header'>
          <div className="my-header">
            <div className="per-acc-group" id="224:641">
              <Link
                to={isLogged ? '/personal-acc' : '/authorization'}>
                <button className={activeButton === 5 ? 'per-acc-btn-active' : 'per-acc-btn'} onClick={() => handleClick(5)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
                    <ellipse cx="12.4997" cy="5.65968" rx="4.16667" ry="3.77297" fill="#1C274C" />
                    <ellipse cx="12.4997" cy="16.0352" rx="7.29167" ry="3.77297" fill="#1C274C" />
                  </svg>
                  <p className="per-text">{isLogged ? 'Личный кабинет' : 'Авторизация'}</p>
                </button>
              </Link>
            </div>
          </div>
          <div className='group_head_btns'>
            <Link to='/con'>
              <button
                className={activeButton === 0 ? 'conn-btn-active' : 'conn-btn'}
                onClick={() => handleClick(0)}

              > <p>Подключение</p>
              </button>
            </Link>
            <Link to='/set'>
              <button
                className={activeButton === 1 ? 'set-btn-active' : 'set-btn'}
                onClick={() => handleClick(1)}
              >
                <p>Настройки работы</p>
              </button>
            </Link>
            <Link to='/tasks'>
              <button
                className={activeButton === 2 ? 'main-tasks-btn-active' : 'main-tasks-btn'}
                onClick={() => handleClick(2)}
              >
                <p>Задачи</p>
              </button>
            </Link>
            <Link to='distribution'>
              <button
                className={activeButton === 3 ? 'main-dist-btn-active' : 'main-dist-btn'}
                onClick={() => handleClick(3)}
              >
                <p>Распределение задач</p>
              </button>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path='/con' element={<Connection />} />
          <Route path='/set' element={<WorkSettings />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/distribution' element={<DistributionOfTasks />} />
          <Route path='/personal-acc' element={isLogged ? <PersonalAcc handleLogout={handleLogout} /> : <Navigate to="/authorization" />} />
          <Route path='/authorization' element={!isLogged ? <Authorization handleLogin={handleLogin} /> : <Navigate to="/personal-acc" />}
          />
        </Routes>
      </Router>
    </>
  );
}
