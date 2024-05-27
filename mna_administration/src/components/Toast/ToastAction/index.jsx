import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDistanceToNow } from 'date-fns';

const ToastAction = ({ title, message, background, date, onClose, onAction }) => {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

    return (
        <div className={`toast show ${background}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">{title}</strong>
                <small className="text-muted">{timeAgo}</small>
            </div><div className="toast-body">

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
