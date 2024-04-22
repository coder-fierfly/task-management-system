import React from 'react';
import '../../App.css';

const ErrorWindow = ({ isOpen, onClose, error }) => {
    const onCloseBtn = () => {
        onClose();
    }

    // если закрыто, то не отображается
    if (!isOpen) {
        return null;
    }
    return (
        <div className="popup-overlay">
            <div className="popup min-h-w">
                <div className="popup-content">
                        <div>
                            <div className='pop-cont-w'>
                                {error}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorWindow;