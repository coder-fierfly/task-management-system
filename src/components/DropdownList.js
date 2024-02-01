import React from 'react';

const DropdownList = ({ options, selectedValue, onSelectedValueChange, outputLabel, id }) => {
    return (
        <select className="dropdown" id={id} value={selectedValue} onChange={(e) => onSelectedValueChange(e.target.value)}>
            <option value="" disabled hidden>{outputLabel}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropdownList;