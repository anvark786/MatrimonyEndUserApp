
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../assets/styles/Style.css'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    sessionStorage.clear()
    window.location.href = '/login';
  };

  const reDrirectUrl = ()=> {
    if(userData?.has_completed_signup){
      return "/profile"
    }
    else return "#"
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to={reDrirectUrl()}>
            Shaddikarro
          </Link>
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
          {userData?.has_completed_signup&&<div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/profile">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile/search-profile">Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Matches</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Messages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Upgrade</Link>
              </li>
            </ul>
          </div>}

          <div className="navbar-icons">
            {userData?.has_completed_signup&&<Link to="#" className="navbar-icon">
              <FontAwesomeIcon icon={faBell} />
            </Link>}
            <Link
              to="#"
              className="navbar-icon dropdown-toggle"
              onClick={handleDropdownToggle}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
            {showDropdown && (
              <div className="profile-dropdown">
                <ul>
                  {/* <li>
                    <Link to="#">Profile</Link>
                  </li>
                  <li>
                    <Link to="#">Settings</Link>
                  </li> */}
                  <li>
                    <Link to="#" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </Link>
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



