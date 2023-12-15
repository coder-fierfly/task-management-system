import React from 'react';

const DropdownList = ({ options, selectedValue, onSelectedValueChange }) => {
    return (
        <div className='dropdown-wrapper'>
            <select className="dropdown" value={selectedValue} onChange={(e) => onSelectedValueChange(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownList;