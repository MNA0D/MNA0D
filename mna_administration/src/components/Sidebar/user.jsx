import React from "react";
import { NavLink } from "react-router-dom";

function User() {
    return (
        <>
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/naywvi.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong id="user">User</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><NavLink className="dropdown-item" to="/settings">Parametres</NavLink></li>
                <li><NavLink className="dropdown-item" to="/profile">Profil</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" to="/logout">Deconnexion</NavLink></li>
            </ul>
        </>
    );
}

export default User;
