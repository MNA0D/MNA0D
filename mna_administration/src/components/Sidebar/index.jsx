import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function navbar() {
  return (
    <>
      <link href="/assets/css/sidebars.css" rel="stylesheet"></link>

      {/* col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark */}
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">


        <main class="" id="sidebar">
          <h1 className="visually-hidden">Sidebars examples</h1>
          <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <p class="me-2"></p>
              <span className="fs-4">MNA0D</span>
            </a>
            <hr></hr>
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a href="#" className="nav-link active" aria-current="page">
                  <i class="bi me-2 bi-house"></i>
                  Acceuil
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <i class="bi me-2 bi-activity"></i>  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <i class="bi me-2 bi-cup-hot"></i>    Liste des victimes
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <i class="bi me-2 bi-magic"></i>  Crée un nouveau client
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <i class="bi me-2 bi-folder"></i>  Documentation
                </a>
              </li>
            </ul>
            <hr></hr>
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/naywvi.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>User</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">Parametres</a></li>
                <li><a className="dropdown-item" href="#">Profil</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Deconnexion</a></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <script src="/assets/js/sidebars.js"></script>
    </>
  )
}

export default navbar;