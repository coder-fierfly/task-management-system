import React, { useState, useEffect } from 'react';
import Connection from './pages/Сonnection';
import WorkSettings from './pages/WorkSettings';
import Tasks from './pages/Tasks';
import DistributionOfTasks from './pages/DistributionOfTasks';
import PersonalAcc from './pages/PersonalAcc';
import Authorization from './pages/Authorization';
import { Navigate } from 'react-router-dom';
import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IterationContext from './IterationContext';

export default function TabPanel() {
  const [activeButton, setActiveButton] = useState(() => {
    // Проверка состояния активной кнопки при первом рендеринге компонента
    if (window.location.pathname === '/personal-acc' || window.location.pathname === '/authorization' || window.location.pathname === "/") {
      return 5;
    }
    const storedActiveButton = localStorage.getItem('activeButton');
    return storedActiveButton ? parseInt(storedActiveButton) : 5;
  });

  const [isLogged, setLogged] = useState(() => {
    // Проверка состояния авторизации при первом рендеринге компонента
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged === 'true';
  }); //вошел пользователь в аккаунт или нет

  useEffect(() => {
    // Сохраняем состояние активной кнопки в локальное хранилище при изменении
    localStorage.setItem('activeButton', activeButton);
  }, [activeButton]);

  // переход по вкладкам, назначение активной
  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleLogin = () => {
    setLogged(true);
    localStorage.setItem('isLogged', 'true');
  };

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem('isLogged');
  };

  //взятие данных из localStorage или же имеющихся
  const [chosenIteration, setChosenIteration] = useState(() => {
    const savedIteration = localStorage.getItem('chosenIteration');
    return savedIteration ? JSON.parse(savedIteration) : '';
  });

  const [chosenProject, setChosenProject] = useState(() => {
    const savedProject = localStorage.getItem('chosenProject');
    return savedProject ? JSON.parse(savedProject) : '';
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? JSON.parse(savedToken) : '';
  });

  // Сохраняем значения в localStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem('chosenIteration', JSON.stringify(chosenIteration));
  }, [chosenIteration]);

  useEffect(() => {
    localStorage.setItem('chosenProject', JSON.stringify(chosenProject));
  }, [chosenProject]);

  useEffect(() => {
    console.log("useEffect token chenge ", token)

    localStorage.setItem('token', JSON.stringify(token));
    if (token === "") {
      handleLogout();
    }
  }, [token]);


  return (
    <IterationContext.Provider value={{ chosenIteration, setChosenIteration, chosenProject, setChosenProject, token, setToken }}>
      <Router>
        <div className='all-header'>
          <div className="my-header">
            <div className="per-acc-group" id="224:641">
              <Link
                to={isLogged ? '/personal-acc' : '/authorization'}>
                <button className={(activeButton === 5 || window.location.pathname === '/personal-acc' || window.location.pathname === '/authorization') ? 'per-acc-btn-active' : 'per-acc-btn'} onClick={() => handleClick(5)}>
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
                > <p className="per-text" >Главная</p>
                </button>
              </Link>
              <Link to='/set'>
                <button
                  className={window.location.pathname === '/set' ? 'set-btn-active' : 'set-btn'}
                  onClick={() => handleClick(1)}
                >
                  <p className="per-text">Настройки работы</p>
                </button>
              </Link>
              <Link to='/tasks'>
                <button
                  className={window.location.pathname === '/tasks' ? 'main-tasks-btn-active' : 'main-tasks-btn'}
                  onClick={() => handleClick(2)}
                >
                  <p className="per-text">Задачи</p>
                </button>
              </Link>
              <Link to='distribution'>
                <button
                  className={window.location.pathname === '/distribution' ? 'main-dist-btn-active' : 'main-dist-btn'}
                  onClick={() => handleClick(3)}
                >
                  <p className="per-text">Распределение задач</p>
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
    </IterationContext.Provider>
  );
}

function PrivateRoute({ children, isLogged }) {
  return isLogged ? children : <Navigate to="/authorization" />;
}
