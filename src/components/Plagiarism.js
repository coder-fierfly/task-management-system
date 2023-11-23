import React from 'react';
import "../App.css";

const Plagiarism = ({ isOpen, onClose, listOfStudents }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="popup-content">
                    <button onClick={onClose}>Закрыть</button>
                    <table>
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
    );
};

export default Plagiarism;

