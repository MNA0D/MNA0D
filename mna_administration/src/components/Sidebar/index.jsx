import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import User from './user';
import Cookies from 'js-cookie';

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) {
          throw new Error('Tokens are missing');
        }

        const response = await axios.post(
          `${API}/authguard-admin`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token},${sessionid}`
            }
          }
        );

        if (response.status === 200) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error checking admin status', error);
      }
    };

    checkAdminStatus();
  }, [API]);

  return (
    <>
      <link href="/assets/css/sidebars.css" rel="stylesheet"></link>

      <main>
        <header className="d-flex justify-content-center py-3 " id="header" style={{ display: 'none' }}>
          <ul className="nav nav-pills">
            <li className="nav-item"><NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink></li>
            <li className="nav-item"><NavLink to="/new-client" className="nav-link text-white">Nouveau</NavLink></li>
            <li className="nav-item"><NavLink to="/documentation" className="nav-link text-white">Documentation</NavLink></li>
            <li className="nav-item"><User /></li>
          </ul>
        </header>
      </main>

      <main id="sidebar">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white " style={{ width: '230px' }} id="sidebar-element">
          <div className="image-container">
            <img src="/assets/image/logo.png" alt="Your Image" className="centered-image" />
          </div>
          <div className='text-center'>
            <span className="fs-4"><span className='color-mna'>MNA</span>0D Administration</span>
          </div>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            {isAdmin && (
              <li>
                <NavLink to="/administration" className="nav-link text-white">
                  <i className="bi me-2 bi-folder"></i> Administration
                </NavLink>
              </li>
            )}
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
          <div className="nav-item">
            <User />
          </div>
        </div>
      </main>

      <script src="/assets/js/sidebars.js"></script>
    </>
  );
}

export default Sidebar;
