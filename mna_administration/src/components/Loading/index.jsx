import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageLoader = () => {
    return (
        <div className="page-loader flex-column bg-dark bg-opacity-25">
            <span className="spinner-border text-primary" role="status"></span>
            <span className="text-gray-800 fs-6 fw-semibold mt-5">Chargement de la page...</span>
        </div>
    );
};

export default PageLoader;
