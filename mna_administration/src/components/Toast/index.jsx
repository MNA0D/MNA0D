import React, { useState, useEffect } from 'react';
import ToastSimpleText from './ToastSimpleText';
import ToastAction from './ToastAction';
import ToastNotification from './ToastNotification';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastContainer = () => {
    // const [toasts, setToasts] = useState([]);
    // const API = process.env.REACT_APP_API;

    // useEffect(() => {
    //     const fetchToasts = async () => {
    //         try {
    //             const response = await fetch(`${API}/toast`);
    //             const data = await response.json();
    //             setToasts(data);
    //         } catch (error) {
    //             console.error("Error fetching toasts:", error);
    //         }
    //     };

    //     fetchToasts();
    // }, [API]);

    // const removeToast = (id) => {
    //     setToasts(toasts.filter(toast => toast.id !== id));
    // };

    // const handleAction = (id) => {
    //     console.log(`Action taken on toast with id: ${id}`);
    //     removeToast(id);
    // };

    // return (
    //     <div className="toast-container position-fixed bottom-0 end-0 p-3">
    //         {toasts.map((toast) => {
    //             switch (toast.type) {
    //                 case 'text':
    //                     return <ToastSimpleText key={toast.id} message={toast.message} background={toast.background} date={toast.date} onClose={() => removeToast(toast.id)} />;
    //                 case 'notification':
    //                     return <ToastNotification key={toast.id} message={toast.message} background={toast.background} date={toast.date} onClose={() => removeToast(toast.id)} />;
    //                 case 'action':
    //                     return <ToastAction key={toast.id} message={toast.message} background={toast.background} date={toast.date} onClose={() => removeToast(toast.id)} onAction={() => handleAction(toast.id)} />;
    //                 default:
    //                     return null;
    //             }
    //         })}
    //     </div>
    // );
    return (<></>)
};

export default ToastContainer;
