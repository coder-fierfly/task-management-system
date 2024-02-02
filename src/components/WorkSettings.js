import React, { useState, useEffect } from 'react';
import DropdownList from './DropdownList';
// import _debounce from 'lodash/debounce';
// import useDebounce from './useDebounce';

function WorkSettings() {

  // State для отслеживания выбранной радиокнопки
  const [selectedOptionSuccess, setSelectedOptionSuccess] = useState('');
  const [selectedOptionTranslate, setSelectedOptionTranslate] = useState('teacher');
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
    <div className='main-conn-wrap'>
      <div className="form-container">
        <div className='label-center'>
          <input className='checkbox'
            type="checkbox"
            id="lintCheckId"
            checked={checkboxValues.checkboxLint}
            onChange={() => handleCheckboxChange('checkboxLint')}
          />
          <label className="label" htmlFor="lintCheckId">
            Требуется Lint?
          </label>
        </div>
        <br />
        <div className='label-center'>
          <input className='checkbox'
            type="checkbox"
            id="limitErrCheckId"
            checked={checkboxValues.checkboxErrorLimit}
            onChange={() => handleCheckboxChange('checkboxErrorLimit')}
          />
          <label className="label" htmlFor="limitErrCheckId">
            Порог ошибок (Java,C++)
          </label>
        </div>
        <input className="input-field" type="text" id="limitErrInputId" value={inputValue}
          onChange={handleInputChange} />
        <div className='label-center'>
          <input className='checkbox'
            type="checkbox"
            id="ratingCheckId"
            checked={checkboxValues.checkboxRating}
            onChange={() => handleCheckboxChange('checkboxRating')}
          />
          <label className="label" htmlFor="ratingCheckId">
            Допустимый рейтинг (Python)
          </label>
        </div>

        <DropdownList
          options={listOptionsRating}
          selectedValue={listValueRating}
          onSelectedValueChange={setListRating}
          id="listRatingId"
        />
        <p className="label">Как оповещать об ошибках линта:</p>
        <DropdownList
          options={listOptionsErrLint}
          selectedValue={listValueErrLint}
          onSelectedValueChange={setListValueErrLint}
          id="listOptionsErrId"
        />
        <div>
          <div className='label-center'>
            <input className='checkbox'
              type="checkbox"
              id="checkboxSuccessId"
              checked={checkboxValues.checkboxSuccess}
              onChange={() => handleCheckboxChange('checkboxSuccess')}
            />
            <label className="label" htmlFor="checkboxSuccessId">
              Успешно проверенные задачи:
            </label>
          </div>
          <div className='label-container'>
            <div className='form_radio margin-form'><input
            className='radio'
              type="radio"
              name="successfully"
              value="close"
              checked={selectedOptionSuccess === 'close'}
              onChange={handleRadioChangeSuccess}
            />
              <p className="label">
                Close</p></div>

            <div className='form_radio'><input
            className='radio'
              type="radio"
              name="successfully"
              value="approve"
              checked={selectedOptionSuccess === 'approve'}
              onChange={handleRadioChangeSuccess}
            />
              <p className="label">
                Approve
              </p></div>
          </div>
        </div>
        <br />
        <div>
          <p className="label">
            На кого переводить задачи?
          </p>
          <div className='label-container'>
            <div className='form_radio margin-form'>
              <input
              className='radio'
                type="radio"
                name="translateTasksTo"
                value="student"
                checked={selectedOptionTranslate === 'student'}
                onChange={handleRadioChangeTranslate}
              />
              <p className="label">Студент</p>
            </div>
            <div className="form_radio">
              <input className="radio" id="contactChoice1" type="radio" name="radio" value="teacher"
                checked={selectedOptionTranslate === 'teacher'}
                onChange={handleRadioChangeTranslate} />
              <p className="label">Преподаватель</p>
            </div>
          </div>

        </div>
      </div>
      {/* <div className="b-wrapper"><button onClick={handleSaveSettings} className="b-button">Сохранить настройки</button></div> */}

    </div>
  );
}

export default WorkSettings;