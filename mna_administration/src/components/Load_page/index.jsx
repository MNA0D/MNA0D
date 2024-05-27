import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Login from '../Login';
import Features from '../Features';
import Documentation from '../Documentation';
import NewClient from '../New_client';
import Dashboard from '../Dashboard';
import NotFound from '../ERR@R/404';
import Forbidden from '../ERR@R/403';
import Loading from '../Loading'; // Import du composant de chargement

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/new-client" element={<NewClient />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />


        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

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
                <div className="rows g-0">
                    <nav id="left" className="col col--left">
                        <Sidebar />
                    </nav>
                    <main id="right" className="col col--right">
                        <AppRoutes />
                        <Footer />
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
