import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Login from "../Login";
import Features from "../Features";
import Table from "../Table";
import Documentation from '../Documentation';
import NewClient from '../New_client';
import Dasboard from '../Dashboard';
import Home from '../Home';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={
                    <>
                        <div className='container'>
                            <div className="row">
                                <Sidebar />
                                <div className="col-md-9">

                                    <Routes>
                                        <Route path="/features" element={<Features />} />
                                        <Route path="/list" element={<Table />} />
                                        <Route path="/documentation" element={<Documentation />} />
                                        <Route path="/new-client" element={<NewClient />} />
                                        <Route path="/dashboard" element={<Dasboard />} />
                                        <Route path="/" element={<Home />} /> {/* Default route */}
                                    </Routes>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
