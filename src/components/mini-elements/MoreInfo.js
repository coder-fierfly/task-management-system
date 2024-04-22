import React from 'react';
import '../../App.css';

const MoreInfo = ({ isOpen, toggleModal, logs }) => {

    function createMarkup(logs) {
        return { __html: logs.map(log => log.log).join('<br>') };
    }

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
                        <div className='t-a-more' dangerouslySetInnerHTML={createMarkup(logs)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreInfo;

