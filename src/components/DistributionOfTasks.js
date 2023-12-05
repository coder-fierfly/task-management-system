import React, { useState } from 'react';
import { DataContext } from '../App';
import "../App.css";
function DistributionOfTasks() {

  const initialCheckboxes = [
    { id: 1, label: 'Option 1', isChecked: false },
    { id: 2, label: 'Option 2', isChecked: false },
    { id: 3, label: 'Option 3', isChecked: false },
    { id: 4, label: 'Option 4', isChecked: false },
    { id: 5, label: 'Option 5', isChecked: false },
    { id: 6, label: 'Option 6', isChecked: false },
    { id: 7, label: 'Option 7', isChecked: false },
    { id: 8, label: 'Option 8', isChecked: false },
    { id: 9, label: 'Option 9', isChecked: false },
    { id: 10, label: 'Option 10', isChecked: false },
    { id: 11, label: 'Option 11', isChecked: false },
    { id: 12, label: 'Option 12', isChecked: false },
  ];

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [isVisible, setIsVisible] = useState(false);

  const handleCheckboxChange = (id) => {
    setCheckboxes(prevCheckboxes =>
      prevCheckboxes.map(checkbox =>
        checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
      )
    );
  };

  const handleClickDownloadList = () => {
    setIsVisible(true);
    console.log("загрузить")
  };

  const handleClickCopy = () => {
    console.log("раскопировать")
  }

  const handleClickAppoint = () => {
    console.log("назначить выделенное")
  }


  return (
    <div>
      <button onClick={handleClickDownloadList}>Загрузить списки</button>
      <button onClick={handleClickCopy}>Раскопировать "всё-всем"</button>
      <button onClick={handleClickAppoint}>Назначить выделенное</button>
      {/* {isVisible && ( */}
      <div style={{ maxHeight: '200px', maxWidth: '200px', overflowY: 'auto', backgroundColor: 'beige' }}>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id}>
            <label>
              <input
                type="checkbox"
                checked={checkbox.isChecked}
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
      <br></br>
      {/* )} */}
      <div style={{ maxHeight: '200px', maxWidth: '200px', overflowY: 'auto', backgroundColor: 'beige' }}>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id}>
            <label>
              <input
                type="checkbox"
                checked={checkbox.isChecked}
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DistributionOfTasks;