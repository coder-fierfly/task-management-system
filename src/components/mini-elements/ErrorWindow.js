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
            <div className="popup">
                <div className="popup-content">
                    <div className="del-wind">
                        <div>
                            <div>
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorWindow;