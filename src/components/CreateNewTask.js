import React, { useState, useEffect } from 'react';
import "../App.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CreateNewTask = ({ isOpen, onClose, passedName, passedDesc }) => {

    const [inputName, setInputName] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // применение переданной информации к полям
    useEffect(() => {
        setInputName(passedName);
        setInputDesc(passedDesc);
    }, [passedName, passedDesc]);

    // изменение в поле названия задачи
    const handleInputName = (event) => {
        setInputName(event.target.value);
    }

    // изменение в поле описания задачи
    const handleInputDesc = (event) => {
        setInputDesc(event.target.value);
    }

    const onCloseBtn = () => {
        setExpanded('panel1');
        onClose();
    }

    const handleSave = () => {
        console.log("сохраняем")
    }

    // если закрыто, то не отображается
    if (!isOpen) {
        return null;
    }
    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="close-btn-container">
                    <button className="clear-btn" onClick={onCloseBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
                <div className="popup-content">
                    <div className="new-task-wrapper">
                        <div>
                            <div>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography>
                                            Описание задачи
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='desk-wrap'>
                                        <input className="input-field" id="inputNumId" type="text" value={inputName}
                                            onChange={handleInputName} placeholder="Название" />
                                        <input className="input-field" type="text" value={inputDesc}
                                            onChange={handleInputDesc} placeholder="Описание" />
                                        <button onClick={handleSave} className="b-button right-btn save-btn">Сохранить</button>

                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography>Тесты</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                    >
                                        <Typography >
                                            Настройка проверки решений
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewTask;


