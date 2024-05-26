import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import User from './user';

function Sidebar() {
  return (
    <>
      <link href="/assets/css/sidebars.css" rel="stylesheet"></link>

      < div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 " >
        <main>
          <header className="d-flex justify-content-center py-3 bg-dark" id="header" style={{ display: 'none' }}>
            <ul className="nav nav-pills">
              <li className="nav-item"><NavLink to="/dashboard" className="nav-link">Dashboard</NavLink></li>
              <li className="nav-item"><NavLink to="/list" className="nav-link">Liste</NavLink></li>
              <li className="nav-item"><NavLink to="/new-client" className="nav-link">Nouveau</NavLink></li>
              <li className="nav-item"><NavLink to="/documentation" className="nav-link">Documentation</NavLink></li>
              <li className="nav-item"><User /></li>
            </ul>
          </header>
        </main>

        <main id="sidebar-collapse" style={{ display: 'none' }}>
          <div className="d-flex flex-column flex-shrink-0 bg-dark" style={{ width: '4.5rem' }}>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link py-3 border-bottom" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i className="bi me-2 bi-house"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="nav-link py-3 border-bottom" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i className="bi me-2 bi-activity"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className="nav-link py-3 border-bottom" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i className="bi me-2 bi-cup-hot"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="nav-link py-3 border-bottom" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i className="bi me-2 bi-magic"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/customers" className="nav-link py-3 border-bottom" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i className="bi me-2 bi-folder"></i>
                </NavLink>
              </li>
            </ul>
            <div className="dropdown border-top">
              <User />
            </div>
          </div>
        </main>

        <main id="sidebar">
          <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }} id="sidebar-element">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <p className="me-2"></p>
              <span className="fs-4">MNA0D</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white" aria-current="page">
                  <i className="bi me-2 bi-house"></i>
                  Acceuil
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="nav-link text-white">
                  <i className="bi me-2 bi-activity"></i> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/list" className="nav-link text-white">
                  <i className="bi me-2 bi-cup-hot"></i> Liste des victimes
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-client" className="nav-link text-white">
                  <i className="bi me-2 bi-magic"></i> Crée un nouveau client
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
      </div>
      <script src="/assets/js/sidebars.js"></script>
    </>
  );
}

export default Sidebar;
