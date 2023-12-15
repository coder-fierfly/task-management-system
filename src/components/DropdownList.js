import React from 'react';

const DropdownList = ({ options, selectedValue, onSelectedValueChange, outputLabel }) => {
    return (
        <select className="dropdown" value={selectedValue} onChange={(e) => onSelectedValueChange(e.target.value)}>
            <option value="" disabled hidden><label className="label">{outputLabel}</label></option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropdownList;