import React from 'react';

const DropdownList = ({ options, selectedValue, onSelectedValueChange }) => {
    return (
        <select value={selectedValue} onChange={(e) => onSelectedValueChange(e.target.value)}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropdownList;