import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Login from "../Login";
import Features from "../Features";
import Documentation from '../Documentation';
import NewClient from '../New_client';
import Dasboard from '../Dashboard';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={
                    <>
                        <div class="rows g-0">
                            <nav id="left" class="col col--left">
                                <Sidebar />
                            </nav>
                            <main id="right" class="col col--right">
                                <Routes>
                                    <Route path="/features" element={<Features />} />
                                    <Route path="/documentation" element={<Documentation />} />
                                    <Route path="/new-client" element={<NewClient />} />
                                    <Route path="/dashboard" element={<Dasboard />} />
                                    <Route path="/" element={<Dasboard />} /> Default route
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
