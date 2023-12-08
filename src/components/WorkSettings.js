import React, { useState, useEffect } from 'react';
import DropdownList from './DropdownList';
// import _debounce from 'lodash/debounce';
// import useDebounce from './useDebounce';

function WorkSettings() {
  // State для отслеживания выбранной радиокнопки
  const [selectedOptionSuccess, setSelectedOptionSuccess] = useState('');
  const [selectedOptionTranslate, setSelectedOptionTranslate] = useState('');
  const [checkboxValues, setCheckboxValues] = useState({
    checkboxLint: false,
    checkboxErrorLimit: false,
    checkboxRating: false,
    checkboxSuccess: false
  });

  const listOptionsRating = ['Option 1', 'Option 2', 'Option 3'];
  const [listValueRating, setListRating] = useState('');
  const listOptionsErrLint = ['Option 11', 'Option 22', 'Option 33'];
  const [listValueErrLint, setListValueErrLint] = useState('');

  // Функция для обработки изменений в radio button
  const handleRadioChangeSuccess = (event) => {
    setSelectedOptionSuccess(event.target.value);
  };
  const handleRadioChangeTranslate = (event) => {
    setSelectedOptionTranslate(event.target.value);
  };

  // смена значений в checkbox
  const handleCheckboxChange = (checkboxName) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
  };

  // Состояние для хранения измененных настроек
  const [debouncedSettings, setDebouncedSettings] = useState();

  // Эффект для обновления debouncedSettings при изменении настроек
  useEffect(() => {
    console.log("поменяли")
    setDebouncedSettings({
      selectedOptionSuccess,
      selectedOptionTranslate,
      checkboxValues,
      listValueRating,
      listValueErrLint,
      inputValue,
    });
  }, [
    selectedOptionSuccess,
    selectedOptionTranslate,
    checkboxValues,
    listValueRating,
    listValueErrLint,
    inputValue,
  ]);

  return (
    <>
      <div className="form-container">
        <label className="label">
          <input
            type="checkbox"
            checked={checkboxValues.checkboxLint}
            onChange={() => handleCheckboxChange('checkboxLint')}
          />
          Требуется Lint?
        </label>
        <br />
        <label className="label">
          <input
            type="checkbox"
            checked={checkboxValues.checkboxErrorLimit}
            onChange={() => handleCheckboxChange('checkboxErrorLimit')}
          />
          Порог ошибок (Java,C++)
        </label>
        <input className="input-field" type="text" value={inputValue}
          onChange={handleInputChange} />

        <label className="label">
          <input
            type="checkbox"
            checked={checkboxValues.checkboxRating}
            onChange={() => handleCheckboxChange('checkboxRating')}
          />
          Допустимый рейтинг (Python)
        </label>
        <DropdownList
          options={listOptionsRating}
          selectedValue={listValueRating}
          onSelectedValueChange={setListRating}
        />
        <label className="label">Как оповещать об ошибках линта:</label>
        <DropdownList
          options={listOptionsErrLint}
          selectedValue={listValueErrLint}
          onSelectedValueChange={setListValueErrLint}
        />
        <div><label className="label">
          <input
            type="checkbox"
            checked={checkboxValues.checkboxSuccess}
            onChange={() => handleCheckboxChange('checkboxSuccess')}
          />
          Успешно проверенные задачи:
        </label>
          <label><input
            type="radio"
            name="successfully"
            value="close"
            checked={selectedOptionSuccess === 'close'}
            onChange={handleRadioChangeSuccess}
          />
            Close</label>
          <label>
            <input
              type="radio"
              name="successfully"
              value="approve"
              checked={selectedOptionSuccess === 'approve'}
              onChange={handleRadioChangeSuccess}
            />
            Approve
          </label>
        </div>
        <br />
        <div><label><label>
          На кого переводить задачи?
          <input
            type="radio"
            name="translateTasksTo"
            value="student"
            checked={selectedOptionTranslate === 'student'}
            onChange={handleRadioChangeTranslate}
          />
          Студент
        </label>
          <label>
            <input
              type="radio"
              name="translateTasksTo"
              value="teacher"
              checked={selectedOptionTranslate === 'teacher'}
              onChange={handleRadioChangeTranslate}
            />
            Преподаватель
          </label>
        </label></div>

      </div>
      {/* <div className="b-wrapper"><button onClick={handleSaveSettings} className="b-button">Сохранить настройки</button></div> */}

    </>
  );
}

export default WorkSettings;