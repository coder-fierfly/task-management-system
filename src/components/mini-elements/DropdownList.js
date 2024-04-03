import React, { useState } from 'react';
import '../../App.css';

const DropdownList = ({ options, selectedValue, onSelectedValueChange, outputLabel, id, disabled }) => {
    const [selected, setSelected] = useState(selectedValue);

    const handleSelectedValueChange = (value) => {
        setSelected(value);
        onSelectedValueChange(value);
    };
    return (
        <select className="dropdown" id={id} value={selected} onChange={(e) => handleSelectedValueChange(e.target.value)} disabled={disabled}>
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