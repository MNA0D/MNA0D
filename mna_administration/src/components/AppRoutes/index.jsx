import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Features from '../Features';
import Documentation from '../Documentation';
import NewClient from '../New_client';
import Dashboard from '../Dashboard';
import NotFound from '../ERR@R/404';
import Forbidden from '../ERR@R/403';
import LoginLayout from '../Login';

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/features" element={<Features />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/new-client" element={<NewClient />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
