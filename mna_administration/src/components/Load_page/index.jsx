import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Login from "../Login";
import Features from "../Features";
import Documentation from '../Documentation';
import NewClient from '../New_client';
import Dashboard from '../Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={
                    <>
                        <div className="rows g-0">
                            <nav id="left" className="col col--left">
                                <Sidebar />
                            </nav>
                            <main id="right" className="col col--right">
                                <Routes>
                                    <Route path="/features" element={<Features />} />
                                    <Route path="/documentation" element={<Documentation />} />
                                    <Route path="/new-client" element={<NewClient />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/" element={<Dashboard />} /> {/* Default route */}
                                </Routes>
                                <Footer />
                            </main>
                        </div>
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
