import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import User from './user';

function Sidebar() {
  return (
    <>
      <link href="/assets/css/sidebars.css" rel="stylesheet"></link>


      <main>
        <header className="d-flex justify-content-center py-3 bg-dark" id="header" style={{ display: 'none' }}>
          <ul className="nav nav-pills">
            <li className="nav-item"><NavLink to="/dashboard" className="nav-link">Dashboard</NavLink></li>
            <li className="nav-item"><NavLink to="/new-client" className="nav-link">Nouveau</NavLink></li>
            <li className="nav-item"><NavLink to="/documentation" className="nav-link">Documentation</NavLink></li>
            <li className="nav-item"><User /></li>
          </ul>
        </header>
      </main>

      <main id="sidebar">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '230px' }} id="sidebar-element">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <p className="me-2"></p>
            <span className="fs-4">MNA0D</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <NavLink to="/dashboard" className="nav-link text-white">
                <i className="bi me-2 bi-activity"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-client" className="nav-link text-white">
                <i className="bi me-2 bi-magic"></i> Nouveau client
              </NavLink>
            </li>
            <li>
              <NavLink to="/documentation" className="nav-link text-white">
                <i className="bi me-2 bi-folder"></i> Documentation
              </NavLink>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <User />
          </div>
        </div>
      </main>

      <script src="/assets/js/sidebars.js"></script>
    </>
  );
}

export default Sidebar;
