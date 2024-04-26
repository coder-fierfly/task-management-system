import React, { useState } from 'react';
import '../../App.css';
import ReactDiffViewer from 'react-diff-viewer';
import { getDiffPlagiarism } from '../requestsToTheBack/ReqPlagiarismSt';


const Plagiarism = ({ isOpen, listOfStudents, taskId, token, setToken, setMessage }) => {
    const [isDiffOpen, setDiffOpen] = useState(false);
    const [code, setCode] = useState([]);
    const [students, setStudents] = useState([]);


    if (!isOpen) return null;
    const arrayOfStudents = Object.entries(listOfStudents).map(([student, values]) => ({ student, values }));

    const handleCellClick = (student, otherStudent) => {
        getDiffPlagiarism(taskId, student, otherStudent, setMessage, token, setToken, setCode, setStudents);
        setDiffOpen(true);
    };

    return (
        // <div className="popup-overlay">
        //     <div className="popup">
        //         <div className="close-btn-container">
        //             <button className="clear-btn" onClick={onClose}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        //             </button>
        //         </div>
        //         <div className="popup-content">
        //             <div>


        <>
            {isDiffOpen ? <div className='scroll-checkbox'> <div className='max-scroll' >    <ReactDiffViewer
                oldValue={code[0]}
                // oldValue={code[0] + code[0] + code[0] + code[0]}
                newValue={code[1]}
                splitView={true}
                leftTitle={students[0]}
                rightTitle={students[1]}
            /></div> </div>
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
                                        onClick={() => handleCellClick(studentData.student, otherStudentData.student)}
                                    >
                                        {studentData.values.find(({ userName }) => userName === otherStudentData.student)?.percent || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Plagiarism;

