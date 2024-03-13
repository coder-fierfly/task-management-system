import React from 'react';
import '../../App.css';

const MoreInfo = ({ isOpen, toggleModal }) => {
    if (!isOpen) {
        return null; // Если isOpen равно false, возвращаем null
    }
    return (
        <div className='modal'>
            <div className="popup more-info-cont">
                <div className="close-btn-container">
                    <button className="clear-btn" onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                </div>
                <div className='more-info-container'>
                    <div className='t-a-cont'>
                        <textarea className='t-a-more' defaultValue={'букавы ввв букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы букавы '}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreInfo;

