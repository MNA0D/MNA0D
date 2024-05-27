import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 Error - Page non trouvé</title>
            </Helmet>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3">
                        <span className="text-danger">Oops!</span> Page non trouvé.
                    </p>
                    <p className="lead">La page que vous recherchez n'existe pas.</p>
                    <NavLink to="/" className="btn btn-primary">
                        Retourner à la page principale
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default NotFound;
