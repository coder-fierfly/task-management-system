import React from 'react';
import '../../App.css';

const ConfirmationWindow = ({ isOpen, onClose, delBtn, whatDel }) => {
    const onCloseBtn = () => {
        onClose();
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
                    <div className="del-wind">
                        <div>
                            <div>
                                Вы уверены, что хотите удалить {whatDel}?
                            </div>
                            <div className='btn-wrap'>
                                <button className='b-button width-btn color-btn' onClick={delBtn}>Удалить</button>
                                <button className='b-button width-btn' onClick={onCloseBtn}>Нет</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationWindow;


