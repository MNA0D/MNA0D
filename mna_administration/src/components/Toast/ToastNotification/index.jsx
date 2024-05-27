import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastNotification = ({ message, background, onClose }) => {
    return (
        <div className={`toast show ${background}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">Bootstrap</strong>
                <small className="text-muted">11 mins ago</small>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
                    <span aria-hidden="true"></span>
                </button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default ToastNotification;
