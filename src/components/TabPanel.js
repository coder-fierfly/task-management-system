import React, { useState, useEffect } from 'react';
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
  const [activeButton, setActiveButton] = useState(0);
  const [isLogged, setLogged] = useState(() => {
    // Проверка состояния авторизации при первом рендеринге компонента
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged === 'true';
  }); //вошел пользователь в аккаунт или нет

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleLogin = () => {
    setLogged(true);
    localStorage.setItem('isLogged', 'true');
    console.log(" setLogged(true);")
  };

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem('isLogged');
  };

  // useEffect(() => {
  //   // Устанавливаем обработчик события перед выгрузкой страницы
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // })
  // useEffect(() => {
  //   sessionStorage.setItem('isLogged', isLogged);
  // }, [isLogged]);

  return (
    <>
      <Router>
        <div className='all-header'>
          <div className="my-header">
            <div className="per-acc-group" id="224:641">
              <Link
                to={isLogged ? '/personal-acc' : '/authorization'}>
                <button className={window.location.pathname === '/personal-acc' || window.location.pathname === '/authorization' ? 'per-acc-btn-active' : 'per-acc-btn'} onClick={() => handleClick(5)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
                    <ellipse cx="12.4997" cy="5.65968" rx="4.16667" ry="3.77297" fill="#1C274C" />
                    <ellipse cx="12.4997" cy="16.0352" rx="7.29167" ry="3.77297" fill="#1C274C" />
                  </svg>
                  <p className="per-text">{isLogged ? 'Личный кабинет' : 'Авторизация'}</p>
                </button>
              </Link>
            </div>
          </div>
          {isLogged ? (
            <div className='group_head_btns'>
              <Link to='/con'>
                <button
                  className={window.location.pathname === '/con' ? 'conn-btn-active' : 'conn-btn'}
                  onClick={() => handleClick(0)}
                > <p>Подключение</p>
                </button>
              </Link>
              <Link to='/set'>
                <button
                  className={window.location.pathname === '/set' ? 'set-btn-active' : 'set-btn'}
                  onClick={() => handleClick(1)}
                >
                  <p>Настройки работы</p>
                </button>
              </Link>
              <Link to='/tasks'>
                <button
                  className={window.location.pathname === '/tasks' ? 'main-tasks-btn-active' : 'main-tasks-btn'}
                  onClick={() => handleClick(2)}
                >
                  <p>Задачи</p>
                </button>
              </Link>
              <Link to='distribution'>
                <button
                  className={window.location.pathname === '/distribution' ? 'main-dist-btn-active' : 'main-dist-btn'}
                  onClick={() => handleClick(3)}
                >
                  <p>Распределение задач</p>
                </button>
              </Link>
            </div>
          ) : (<></>)}
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/authorization" />} />
          <Route path="/con" element={<PrivateRoute isLogged={isLogged}><Connection /></PrivateRoute>} />
          <Route path="/set" element={<PrivateRoute isLogged={isLogged}><WorkSettings /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute isLogged={isLogged}><Tasks /></PrivateRoute>} />
          <Route path="/distribution" element={<PrivateRoute isLogged={isLogged}><DistributionOfTasks /></PrivateRoute>} />
          <Route path='/personal-acc' element={isLogged ? <PersonalAcc handleLogout={handleLogout} /> : <Navigate to="/authorization" />} />
          <Route path='/authorization' element={!isLogged ? <Authorization handleLogin={handleLogin} /> : <Navigate to="/personal-acc" />}
          />
        </Routes>
      </Router>
    </>
  );
}

function PrivateRoute({ children, isLogged }) {
  return isLogged ? children : <Navigate to="/authorization" />;
}
