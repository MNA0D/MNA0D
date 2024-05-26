import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from "../Footer";
import Sidebar from "../Sidebar";
// import Login from "../Login";
// import Features from "../Features";<Features />
// import Table from "../Table";<Table />
// import Documentation from '../Documentation'; <Documentation />
import New_client from '../New_client';

function Load_page() {
    return (
        <>

            <div className='container'>
                <div className="row">

                    <Sidebar />
                    <New_client />


                </div>
            </div>
            <Footer />
        </>
    );
}

export default Load_page;