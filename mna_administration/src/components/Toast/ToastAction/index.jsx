import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastAction = ({ message, background, onClose, onAction }) => {
    return (
        <div className={`toast show ${background}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
                {message}
                <div className="mt-2 pt-2 border-top">
                    <button type="button" className="btn btn-primary btn-sm" onClick={onAction}>Intéragir</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Ignoré</button>
                </div>
            </div>
        </div>
    );
};

export default ToastAction;
