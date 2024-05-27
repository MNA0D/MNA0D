import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Forbidden = () => {
    return (
        <>
            <Helmet>
                <title>403 Error - Accès refusé</title>
            </Helmet>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">403</h1>
                    <p className="fs-3">
                        <span className="text-danger">Oops!</span> Access refusé.
                    </p>
                    <p className="lead">Vous n'avez pas la permissions d'accéder à cette page.</p>
                    <NavLink to="/" className="btn btn-primary">
                        Retourner à la page principale
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Forbidden;
