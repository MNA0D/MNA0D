import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';

import ProfileModal from "../Modals/Profil";
import { performLogout } from "../Logout";

function User() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleLogout = () => {
        performLogout(navigate);
    };

    return (
        <>
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/naywvi.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong id="user">User</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><NavLink className="dropdown-item" to="/settings">Parametres</NavLink></li>
                <li><button className="dropdown-item" onClick={handleShow}>Mon Profil</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Deconnexion</button></li>
            </ul>

            <ProfileModal show={showModal} handleClose={handleClose} />
        </>
    );
}

export default User;
