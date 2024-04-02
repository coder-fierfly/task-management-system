import React from 'react';
import '../../App.css';

const DropdownList = ({ options, onSelectedValueChange, outputLabel, id, disabled }) => {
    console.log(options.length)
    return (
        <select className="dropdown" id={id} onChange={(e) => onSelectedValueChange(e.target.value)} disabled={disabled}>
            <option value='123123' hidden>{outputLabel}</option>
            {options.length === 0 ? (
                <option disabled>Ничего не найдено</option>
            ) : (
                options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))
            )}
        </select>
    );
};

export default DropdownList;