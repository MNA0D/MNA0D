import React from "react";

function User() {
    return (
        <>
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/naywvi.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong id="user">User</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">Parametres</a></li>
                <li><a className="dropdown-item" href="#">Profil</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Deconnexion</a></li>
            </ul>

        </>
    );
}

export default User;