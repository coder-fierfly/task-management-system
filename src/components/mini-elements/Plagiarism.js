import React from 'react';
import '../../App.css';

const Plagiarism = ({ isOpen, onClose, listOfStudents }) => {
    if (!isOpen) return null;
    console.log("listOfStudents", JSON.stringify(listOfStudents));
    const arrayOfStudents = Object.entries(listOfStudents).map(([student, values]) => ({ student, values }));

    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="close-btn-container">
                    <button className="clear-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
                <div className="popup-content">
                    <div>
                        <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Задание</th>
                                    {arrayOfStudents.map(studentData => (
                                        <th key={studentData.student}>{studentData.student}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {arrayOfStudents.map(studentData => (
                                    <tr key={studentData.student}>
                                        <td>{studentData.student}</td>
                                        {arrayOfStudents.map(otherStudentData => (
                                            <td key={otherStudentData.student}>
                                                {studentData.values.find(({ userName }) => userName === otherStudentData.student)?.percent || '-'}
                                            </td>
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

