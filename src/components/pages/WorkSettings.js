import React, { useState, useEffect, useContext } from "react";
import DropdownList from "../mini-elements/DropdownList";
import ErrorWindow from '../mini-elements/ErrorWindow';
import { getRobotSettings, putRobotSettings } from '../requestsToTheBack/ReqWorkSettings';
import IterationContext from '../IterationContext';


const WorkSettings = () => {
  const { token, setToken } = useContext(IterationContext);

  // радиокнопки
  const [selectedOptionSuccess, setSelectedOptionSuccess] = useState("");
  const [selectedOptionTranslate, setSelectedOptionTranslate] = useState("teacher");
  // чекбоксы
  const [checkboxValues, setCheckboxValues] = useState(false);
  const [message, setMessage] = useState('Загрузка...');
  const [loading, setLoading] = useState(true);

  // список со способами оповещения об ошибках
  const listOptionsErrLint = [{ name: "По умолчанию", id: "FULL_INFO" }, { name: "Только количество ошибок", id: "COUNT_ONLY" }, { name: "Только наличие ошибок", id: "ARE_ERRORS_ONLY" }];
  const [errLint, setErrLint] = useState("FULL_INFO");

  useEffect(() => {
    setLoading(true);
    setMessage('Загрузка...');
    getRobotSettings(
      setCheckboxValues,
      setErrLint,
      setSelectedOptionSuccess,
      setSelectedOptionTranslate,
      setMessage,
      token,
      setToken
    )
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.log('Ошибка при получении настроек:', error);
      });
  }, []);

  // Функция для обработки изменений в radio button
  const handleRadioChangeSuccess = (event) => {
    var selOption = event.target.value === "true";
    setSelectedOptionSuccess(selOption);
    setMessage('Загрузка...');
    setLoading(true);
    putRobotSettings(checkboxValues, errLint, selOption, selectedOptionTranslate, setMessage, setLoading, token, setToken)
  };
  const handleRadioChangeTranslate = (event) => {
    setSelectedOptionTranslate(event.target.value);
    setMessage('Загрузка...');
    setLoading(true);
    putRobotSettings(checkboxValues, errLint, selectedOptionSuccess, event.target.value, setMessage, setLoading, token, setToken)
  };

  const handleErrChange = (event) => {
    setErrLint(event);
    putRobotSettings(checkboxValues, event, selectedOptionSuccess, selectedOptionTranslate, setMessage, setLoading, token, setToken)
  }

  // смена значений в checkbox
  const handleCheckboxChange = (event) => {
    setCheckboxValues(event.target.checked)
    putRobotSettings(event.target.checked, errLint, selectedOptionSuccess, selectedOptionTranslate, setMessage, setLoading, token, setToken)
  };

  return (
    <div className="main-conn-wrap">
      {loading ? <><div>
        <ErrorWindow isOpen={loading} error={message} />

      </div></> : <>
        <div className="form-container ws-container">
          <div className="label-center">
            <input className="checkbox"
              type="checkbox"
              id="lintCheckId"
              checked={checkboxValues}
              onChange={handleCheckboxChange}
            />
            <label className="label" htmlFor="lintCheckId">
              Использование статического анализатора кода
            </label>
          </div>
          <p className="label">Способ оповещения об ошибках: </p>
          <DropdownList
            options={listOptionsErrLint}
            selectedValue={listOptionsErrLint.find(option => option.id === errLint).name}
            onSelectedValueChange={handleErrChange}
            id="listOptionsErrId"
            outputLabel={listOptionsErrLint.find(option => option.id === errLint).name}
          />
          <div>
            <div className="label-center">
              <p>
                Статус задачи при успешной проверке
              </p>
            </div>
            <div className="label-container radio-conn">
              <div className="form_radio margin-form"><input
                className="radio"
                type="radio"
                id="radioClose"
                name="successfully"
                value="true"
                checked={selectedOptionSuccess === true}
                onChange={handleRadioChangeSuccess}
              />
                <label className="label" htmlFor="radioClose">
                  Закрыто</label></div>
              <div className="form_radio"><input
                className="radio"
                type="radio"
                name="successfully"
                id="radioApprove"
                value="false"
                checked={selectedOptionSuccess === false}
                onChange={handleRadioChangeSuccess}
              />
                <label className="label" htmlFor="radioApprove">
                  Принято
                </label></div>
            </div>
          </div>
          <div>
            <p className="label">
              Назначение задачи по результатам проверки
            </p>
            <div className="label-container radio-conn">
              <div className="form_radio margin-form ">
                <input
                  className="radio"
                  id="toStudent"
                  type="radio"
                  name="translateTasksTo"
                  value="student"
                  checked={selectedOptionTranslate === "student"}
                  onChange={handleRadioChangeTranslate}
                />
                <label className="label" htmlFor="toStudent">На студента</label>
              </div>
              <div className="form_radio">
                <input className="radio" id="toTeacher" type="radio" name="radio" value="teacher"
                  checked={selectedOptionTranslate === "teacher"}
                  onChange={handleRadioChangeTranslate} />
                <label className="label" htmlFor="toTeacher">На преподавателя</label>
              </div>
            </div>
          </div>
        </div>
      </>}
    </div>
  );
}

export default WorkSettings;