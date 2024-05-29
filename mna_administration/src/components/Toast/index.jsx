import React, { useState, useEffect } from 'react';
import ToastSimpleText from './ToastSimpleText';
import ToastAction from './ToastAction';
import ToastNotification from './ToastNotification';
import Cookies from 'js-cookie'; // Assurez-vous d'installer la bibliothèque js-cookie
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);
    const API = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchToasts = async () => {
            try {
                const token = Cookies.get('token');
                const sessionid = Cookies.get('sessionid');

                if (!token || !sessionid) {
                    throw new Error('Tokens are missing');
                }

                const response = await fetch(`${API}/toast`, {
                    headers: {
                        'Authorization': `Bearer ${token},${sessionid}`
                    }
                });

                if (response.status === 404) {
                    console.warn("No toasts found");
                    setToasts([]); // Set toasts to an empty array
                    return;
                }

                const data = await response.json();
                console.log("API response data:", data); // Log the response data
                if (data.success && Array.isArray(data.toasts)) {
                    setToasts(data.toasts);
                } else {
                    console.error("Invalid data format");
                    setToasts([]); // Set toasts to an empty array in case of invalid format
                }
            } catch (error) {
                console.error("Error fetching toasts:", error);
                setToasts([]); // Set toasts to an empty array in case of error
            }
        };

        fetchToasts();
    }, [API]);

    const removeToast = (id) => {
        setToasts(toasts.filter(toast => toast._id !== id));
    };

    const handleAction = (id) => {
        console.log(`Action taken on toast with id: ${id}`);
        removeToast(id);
    };

    if (toasts.length === 0) {
        return null; // Ne rien rendre si aucun toast n'est présent
    }

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            {toasts.map((toast) => {
                switch (toast.type) {
                    case 'text':
                        return <ToastSimpleText key={toast._id} message={toast.message} background={toast.background} date={toast.date} onClose={() => removeToast(toast._id)} />;
                    case 'notification':
                        return <ToastNotification key={toast._id} message={toast.message} background={toast.background} date={toast.date} onClose={() => removeToast(toast._id)} />;
                    case 'action':
                        return <ToastAction key={toast._id} message={toast.message} background={toast.background} date={toast.date} onClose={() => removeToast(toast._id)} onAction={() => handleAction(toast._id)} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default ToastContainer;
