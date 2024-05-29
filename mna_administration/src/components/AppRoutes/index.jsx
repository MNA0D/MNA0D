import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Features from '../Features';
import Documentation from '../Documentation';
import NewClient from '../New_client';
import Dashboard from '../Dashboard';
import NotFound from '../ERR@R/404';
import Forbidden from '../ERR@R/403';
import LoginLayout from '../Login';
import AuthGuard from '../AuthGuard';

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/features" element={<AuthGuard><Features /></AuthGuard>} />
        <Route path="/documentation" element={<AuthGuard><Documentation /></AuthGuard>} />
        <Route path="/new-client" element={<AuthGuard><NewClient /></AuthGuard>} />
        <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
