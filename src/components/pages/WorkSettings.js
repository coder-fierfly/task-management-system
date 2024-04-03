import React, { useState } from "react";
import DropdownList from "../mini-elements/DropdownList";

const WorkSettings = () => {

  // радиокнопки
  const [selectedOptionSuccess, setSelectedOptionSuccess] = useState("");
  const [selectedOptionTranslate, setSelectedOptionTranslate] = useState("teacher");
  // чекбоксы
  const [checkboxValues, setCheckboxValues] = useState({
    checkboxLint: false,
    checkboxSuccess: false
  });

  // список со способами оповещения об ошибках
  const listOptionsErrLint = ["Option 11", "Option 22", "Option 33"];
  const [listValueErrLint, setListValueErrLint] = useState("");

  // Функция для обработки изменений в radio button
  const handleRadioChangeSuccess = (event) => {
    setSelectedOptionSuccess(event.target.value);
  };
  const handleRadioChangeTranslate = (event) => {
    setSelectedOptionTranslate(event.target.value);
  };

  // смена значений в checkbox
  const handleCheckboxChange = (checkboxName) => {
    if (checkboxName === "checkboxSuccess" && checkboxValues.checkboxSuccess) {
      // Сбросить выбранный вариант, если флажок снимается
      setSelectedOptionSuccess("");
    }
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };

  return (
    <div className="main-conn-wrap">
      <div className="form-container ws-container">
        <div className="label-center">
          <input className="checkbox"
            type="checkbox"
            id="lintCheckId"
            checked={checkboxValues.checkboxLint}
            onChange={() => handleCheckboxChange("checkboxLint")}
          />
          <label className="label" htmlFor="lintCheckId">
            Использование статического анализатора кода
          </label>
        </div>
        <p className="label">Способ оповещения об ошибках: </p>
        <DropdownList
          options={listOptionsErrLint}
          selectedValue={listValueErrLint}
          onSelectedValueChange={setListValueErrLint}
          id="listOptionsErrId"
        />
        <div>
          <div className="label-center">
            <input className="checkbox"
              type="checkbox"
              id="checkboxSuccessId"
              checked={checkboxValues.checkboxSuccess}
              onChange={() => handleCheckboxChange("checkboxSuccess")}
            />
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
              value="close"
              checked={selectedOptionSuccess === "close"}
              onChange={handleRadioChangeSuccess}
              disabled={!checkboxValues.checkboxSuccess}
            />
              <label className="label" htmlFor="radioClose">
                Закрыто</label></div>
            <div className="form_radio"><input
              className="radio"
              type="radio"
              name="successfully"
              id="radioApprove"
              value="approve"
              checked={selectedOptionSuccess === "approve"}
              onChange={handleRadioChangeSuccess}
              disabled={!checkboxValues.checkboxSuccess}
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
    </div>
  );
}

export default WorkSettings;