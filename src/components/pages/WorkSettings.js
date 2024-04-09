import React, { useState, useEffect } from "react";
import DropdownList from "../mini-elements/DropdownList";
import ErrorWindow from '../mini-elements/ErrorWindow';
import { fetchRobotSettings } from '../requestsToTheBack/ReqWorkSettings';

const WorkSettings = () => {
  // радиокнопки
  const [selectedOptionSuccess, setSelectedOptionSuccess] = useState("");
  const [selectedOptionTranslate, setSelectedOptionTranslate] = useState("teacher");
  // чекбоксы
  // TODO: статус задачи при успешной проверке
  const [checkboxValues, setCheckboxValues] = useState(false);
  const [message, setMessage] = useState('Loading...')
  const [loading, setLoading] = useState(true);

  // список со способами оповещения об ошибках
  // TODO: список со способами оповещения об ошибках
  const listOptionsErrLint = [{ name: "По умолчанию", id: "FULL_INFO" }, { name: "Только количество ошибок", id: "COUNT_ONLY" }, { name: "Только наличие ошибок", id: "ARE_ERRORS_ONLY" }];
  const [errLint, setErrLint] = useState("");

  useEffect(() => {
    setMessage('Loading...');
    // "needCloseTasks":true значит Close, false — approve.
    fetchRobotSettings(setCheckboxValues, listOptionsErrLint, setErrLint, setSelectedOptionSuccess, setSelectedOptionTranslate, setLoading, setMessage);
  }, []);

  // Функция для обработки изменений в radio button
  const handleRadioChangeSuccess = (event) => {
    // TODO: обработчик
    setSelectedOptionSuccess(event.target.value === "true");
  };
  const handleRadioChangeTranslate = (event) => {
    // TODO: обработчик
    setSelectedOptionTranslate(event.target.value);
  };

  const handleErrChange = (event) => {
    setErrLint(event);
  }

  // смена значений в checkbox
  const handleCheckboxChange = (event) => {
    // TODO: обработчик
    console.log("handleCheckboxChange   ", errLint)
    setCheckboxValues(event.target.checked)
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
            selectedValue={errLint}
            onSelectedValueChange={handleErrChange}
            id="listOptionsErrId"
            outputLabel={errLint}
          />
          <div>
            <div className="label-center">
              <label htmlFor="checkboxSuccessId">
                Статус задачи при успешной проверке
              </label>
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
            <label className="label">
              Назначение задачи по результатам проверки
            </label>
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