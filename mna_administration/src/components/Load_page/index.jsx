import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Loading from '../Loading'; // Import du composant de chargement
import ToastContainer from '../Toast'; // Import du conteneur de toasts
import AppRoutes from '../AppRoutes';

const AppContent = () => {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

    if (isLoginPage) {
        return <AppRoutes />;
    }

    return (
        <>
            <div className="rows g-0">
                <nav id="left" className="col col--left">
                    <Sidebar />
                </nav>
                <main id="right" className="col col--right">
                    <AppRoutes />
                    <Footer />
                    <ToastContainer /> {/* Ajout du conteneur de toasts */}
                </main>
            </div>
        </>
    );
};

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <Router>
            {loading && <Loading />}
            <div className={loading ? 'loading-overlay' : ''}>
                <AppContent />
            </div>
        </Router>
    );
}

export default App;
