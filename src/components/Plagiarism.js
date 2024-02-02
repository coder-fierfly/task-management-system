import React from 'react';
import "../App.css";

const Plagiarism = ({ isOpen, onClose, listOfStudents }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="close-btn-container">
                    <button className="clear-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
                <div className="popup-content">
                <div className="table-container-wrapper">
                    <table className="table-container">
                        <thead>
                            <tr>
                                <th>Задание</th>
                                {listOfStudents.map((student, index) => (
                                    <th key={index}>{student}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {listOfStudents.map((student, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{student}</td>
                                    {listOfStudents.map((_, colIndex) => (
                                        <td key={colIndex + rowIndex}>{rowIndex * listOfStudents.length + colIndex} , ключ {colIndex + rowIndex}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Plagiarism;

