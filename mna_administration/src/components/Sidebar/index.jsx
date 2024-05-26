import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import User from './user';

function Sidebar() {
  return (
    <>
      <link href="/assets/css/sidebars.css" rel="stylesheet"></link>

      {/* col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark */}

      < div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 " >
        <main >
          <header class="d-flex justify-content-center py-3 bg-dark" id="header" style={{ display: 'none' }}>
            <ul class="nav nav-pills">
              <li class="nav-item"><a href="#" class="nav-link active">Dashboard</a></li>
              <li class="nav-item"><a href="#" class="nav-link">Liste</a></li>
              <li class="nav-item"><a href="#" class="nav-link">Nouveau</a></li>
              <li class="nav-item"><a href="#" class="nav-link">Documentation</a></li>
              <li class="nav-item"><a href="#" class="nav-link" aria-current="page">Déconnexion</a></li>
              <li class="nav-item"><a href="#" class="nav-link" aria-current="page"><User /></a></li>
            </ul>
          </header >
        </main>


        <main class="" id="sidebar-collapse" style={{ display: 'none' }}>
          <div class="d-flex flex-column flex-shrink-0 bg-dark" style={{ width: '4.5rem' }}>

            <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
              <li class="nav-item">
                <a href="#" class="nav-link active py-3 border-bottom" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i class="bi me-2 bi-house"></i>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link py-3 border-bottom" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i class="bi me-2 bi-activity"></i>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link py-3 border-bottom" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i class="bi me-2 bi-cup-hot"></i>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link py-3 border-bottom" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i class="bi me-2 bi-magic"></i>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link py-3 border-bottom" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
                  <i class="bi me-2 bi-folder"></i>
                </a>
              </li>
            </ul>
            <div class="dropdown border-top">

              <User />

            </div>
          </div>
        </main>

        <main id="sidebar">
          <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }} id="sidebar-element">
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

              <User />

            </div>
          </div>
        </main>

      </div >
      <script src="/assets/js/sidebars.js"></script>
    </>
  )
}
export default Sidebar;