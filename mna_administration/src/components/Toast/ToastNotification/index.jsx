import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDistanceToNow } from 'date-fns';

const ToastNotification = ({ title, message, background, date, onClose }) => {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

    return (
        <div className={`toast show ${background}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">{title}</strong>
                <small className="text-muted">{timeAgo}</small>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default ToastNotification;
