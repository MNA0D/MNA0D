// src/AuthGuard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = Cookies.get('token');
                const sessionid = Cookies.get('sessionid');

                if (!token || !sessionid) {
                    setIsAuthenticated(false);
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API}/authguard`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token},${sessionid}`
                    }
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, [navigate]);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
};

export default AuthGuard;
