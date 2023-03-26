import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ email, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link">{email}</span>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>  
    </nav>
  );
};

export default Navbar;