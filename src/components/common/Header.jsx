
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../assets/styles/Style.css'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">
            Shaddikarro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>       
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Search</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Matches</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Messages</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Upgrade</a>
              </li>
            </ul>
          </div>

          <div className="navbar-icons">
            <a href="#" className="navbar-icon">
              <FontAwesomeIcon icon={faBell} />
            </a>
            <a
              href="#"
              className="navbar-icon dropdown-toggle"
              onClick={handleDropdownToggle}
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
            {showDropdown && (
              <div className="profile-dropdown">
                <ul>
                  {/* <li>
                    <a href="#">Profile</a>
                  </li>
                  <li>
                    <a href="#">Settings</a>
                  </li> */}
                  <li>
                    <a href="#" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;



