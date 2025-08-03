
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faUser, 
  faSignOutAlt, 
  faSearch, 
  faHeart, 
  faComments, 
  faCrown,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/styles/Style.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    setUserData(data);
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const redirectUrl = () => {
    if (userData?.has_completed_signup) {
      return "/profile";
    }
    return "#";
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link className="navbar-brand" to={redirectUrl()}>
            <FontAwesomeIcon icon={faHeart} className="brand-icon" />
            Shaddikarro
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
          </button>

          {/* Desktop Navigation */}
          {userData?.has_completed_signup && (
            <div className={`navbar-nav ${showMobileMenu ? 'show' : ''}`}>
              <Link 
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`} 
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                Home
              </Link>
              <Link 
                className={`nav-link ${isActive('/profile/search-profile') ? 'active' : ''}`} 
                to="/profile/search-profile"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                Search
              </Link>
              <Link 
                className={`nav-link ${isActive('/matches') ? 'active' : ''}`} 
                to="#"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faHeart} className="nav-icon" />
                Matches
              </Link>
              <Link 
                className={`nav-link ${isActive('/messages') ? 'active' : ''}`} 
                to="#"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faComments} className="nav-icon" />
                Messages
              </Link>
              <Link 
                className={`nav-link ${isActive('/upgrade') ? 'active' : ''}`} 
                to="#"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faCrown} className="nav-icon" />
                Upgrade
              </Link>
            </div>
          )}

          {/* User Actions */}
          <div className="navbar-actions">
            {userData?.has_completed_signup && (
              <Link to="#" className="navbar-icon notification-icon">
                <FontAwesomeIcon icon={faBell} />
                <span className="notification-badge">3</span>
              </Link>
            )}
            
            <div className="user-dropdown">
              <button
                className="navbar-icon user-icon"
                onClick={handleDropdownToggle}
                aria-label="User menu"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
              
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="user-avatar">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="user-info">
                      <span className="user-name">Welcome back!</span>
                      <span className="user-email">{userData?.email || 'User'}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <ul>
                    <li>
                      <Link to="/profile" onClick={() => setShowDropdown(false)}>
                        <FontAwesomeIcon icon={faUser} />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => setShowDropdown(false)}>
                        <FontAwesomeIcon icon={faCrown} />
                        Premium Features
                      </Link>
                    </li>
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;



