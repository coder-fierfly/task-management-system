import React from 'react';
import '../../App.css';

const DropdownList = ({ options, selectedValue, onSelectedValueChange, outputLabel, id, disabled }) => {
    return (
        <select className="dropdown" id={id} value={selectedValue} onChange={(e) => onSelectedValueChange(e.target.value)} disabled={disabled}>
            <option value='' disabled hidden>{outputLabel}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropdownList;