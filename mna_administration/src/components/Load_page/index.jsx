import React from 'react';

import Sidebar from "../Sidebar";
// import Login from "../Login";
import Features from "../Features";
import Table from "../Table";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Load_page() {
    return (
        <>
            <div className='container-fluid'>
                <div className="row flex-nowrap">

                    <Sidebar />
                    <Features />
                </div>
            </div>
        </>
    );
}

export default Load_page;