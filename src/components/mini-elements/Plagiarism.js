import React, { useState } from 'react';
import '../../App.css';
import ReactDiffViewer from 'react-diff-viewer';
import { getDiffPlagiarism } from '../requestsToTheBack/ReqPlagiarismSt';


const Plagiarism = ({ isOpen, listOfStudents, taskId, token, setToken, setMessage, onClose, nameTask, setPlagiarismOpen }) => {
    const [isDiffOpen, setDiffOpen] = useState(false);
    const [code, setCode] = useState([]);
    const [students, setStudents] = useState([]);

    if (!isOpen) return null;
    const arrayOfStudents = Object.entries(listOfStudents).map(([student, values]) => ({ student, values }));

    const handleCellClick = (student, otherStudent) => {
        getDiffPlagiarism(taskId, student, otherStudent, setMessage, token, setToken, setCode, setStudents);
        setDiffOpen(true);

    };

    const downloadTxtFile = (content, fileName) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
    };

    const setClose = () => {
        if (isDiffOpen) {
            setDiffOpen(false);
        } else {
            setPlagiarismOpen(false);
            onClose();
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="close-btn-container plag-top">
                    <p className="vertical-center">{nameTask}</p>
                    <button className="clear-btn" onClick={setClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
                <div className="popup-content">
                    <div>
                        {isDiffOpen ? <div className='scroll-checkbox br-05'> <div className='max-scroll' >

                            <ReactDiffViewer
                                oldValue={code[0]}
                                newValue={code[1]}
                                splitView={true}
                                leftTitle={students[0]}
                                rightTitle={students[1]}
                            /></div>
                            <div className="button-container">
                                <div>
                                    <button onClick={() => downloadTxtFile(code[0], `${students[0]} ${nameTask}.txt`)} className="b-button little-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 -960 960 960" width="19"><path d="M480-341 296.5-524.5l47-46 103 103V-806h67v338.5l103-103 47 46L480-341ZM268.72-202q-27.66 0-47.19-19.68Q202-241.36 202-269v-69.5h67v69.5h422v-69.5h67v69.5q0 27.64-19.69 47.32Q718.61-202 690.96-202H268.72Z" /></svg>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => downloadTxtFile(code[1], `${students[1]} ${nameTask}.txt`)} className="b-button little-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 -960 960 960" width="19"><path d="M480-341 296.5-524.5l47-46 103 103V-806h67v338.5l103-103 47 46L480-341ZM268.72-202q-27.66 0-47.19-19.68Q202-241.36 202-269v-69.5h67v69.5h422v-69.5h67v69.5q0 27.64-19.69 47.32Q718.61-202 690.96-202H268.72Z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                            :
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
                                                <td
                                                    key={otherStudentData.student}
                                                    style={{
                                                        backgroundColor: studentData.values.find(({ userName }) => userName === otherStudentData.student)?.percent <= 0.2 ? '#F4CCCC' : 'inherit'
                                                    }}
                                                    onClick={() => handleCellClick(studentData.student, otherStudentData.student)}>
                                                    {studentData.values.find(({ userName }) => userName === otherStudentData.student)?.percent || '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plagiarism;

