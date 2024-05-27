import React, { useState, useEffect } from 'react';
import ToastSimpleText from './ToastSimpleText';
import ToastAction from './ToastAction';
import ToastNotification from './ToastNotification';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const fetchToasts = async () => {
            // Remplacez ceci par votre appel API réel
            const response = await fetch('http://localhost:3001/toasts');
            const data = await response.json();
            setToasts(data);
        };

        fetchToasts();
    }, []);

    const removeToast = (id) => {
        setToasts(toasts.filter(toast => toast.id !== id));
    };

    const handleAction = (id) => {
        console.log(`Action taken on toast with id: ${id}`);
        removeToast(id);
    };

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            {toasts.map((toast) => {
                switch (toast.type) {
                    case 'text':
                        return <ToastSimpleText key={toast.id} message={toast.message} background={toast.background} onClose={() => removeToast(toast.id)} />;
                    case 'notification':
                        return <ToastNotification key={toast.id} message={toast.message} background={toast.background} onClose={() => removeToast(toast.id)} />;
                    case 'action':
                        return <ToastAction key={toast.id} message={toast.message} background={toast.background} onClose={() => removeToast(toast.id)} onAction={() => handleAction(toast.id)} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default ToastContainer;
