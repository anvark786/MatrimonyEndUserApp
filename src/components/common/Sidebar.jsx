import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faImages,
  faCog,
  faEyeSlash,
  faKey,
  faTrashAlt,
  faMedal,
  faCode,
  faSignOutAlt,
  faBars,
  faEye,
  faTimes,
  faHome,
  faSearch,
  faHeart,
  faUsers,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    checkTokenExpiration();
    const tokenCheckInterval = setInterval(checkTokenExpiration, 1000);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearInterval(tokenCheckInterval);
      window.removeEventListener('resize', checkMobile);
    };
   
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    sessionStorage.clear()
     window.location.href = '/profile';
  };
  
  const checkTokenExpiration = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token
    const expirationTimestamp = userData?.token_expiration
    const currentTimestamp = Math.floor(Date.now() / 1000); 
    if (accessToken&& expirationTimestamp) {
      if (currentTimestamp >= expirationTimestamp) { 
        localStorage.removeItem('userData');
        sessionStorage.clear()
        toast.error("Session Expired,Please Login Again!.", {
          onOpen: () => {
             window.location.href = '/profile';; 
          },
        });   
      }
    }
  };
  
  return (
    <>
      {/* Sidebar Toggle Button - Only visible on mobile */}
      {isMobile && (
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={showSidebar ? faTimes : faBars} />
        </button>
      )}

      {/* Mobile Overlay - Only on mobile */}
      {isMobile && (
        <div 
          className={`sidebar-overlay ${showSidebar ? 'show' : ''}`} 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobile ? (showSidebar ? 'show' : '') : ''}`}>
        {/* Main Navigation */}
        <div className="sidebar-card">
          <div className="sidebar-title">Main Navigation</div>
          <div className="sidebar-items">
            <Link to="/profile" onClick={isMobile ? closeSidebar : undefined}>
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
            <Link to="/profile/search-profile" onClick={isMobile ? closeSidebar : undefined}>
              <FontAwesomeIcon icon={faSearch} />
              <span>Search Profiles</span>
            </Link>
            <Link to="/profile/matches" onClick={isMobile ? closeSidebar : undefined}>
              <FontAwesomeIcon icon={faHeart} />
              <span>My Matches</span>
            </Link>
            <Link to="/profile/connections" onClick={isMobile ? closeSidebar : undefined}>
              <FontAwesomeIcon icon={faUsers} />
              <span>Connections</span>
            </Link>
            <Link to="/profile/notifications" onClick={isMobile ? closeSidebar : undefined}>
              <FontAwesomeIcon icon={faBell} />
              <span>Notifications</span>
            </Link>
          </div>
        </div>

        {/* Profile Management */}
        {userData?.has_completed_signup && (
          <div className="sidebar-card">
            <div className="sidebar-title">My Profile</div>
            <div className="sidebar-items">
              <Link to={"/profile/update/basic-info"} onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faUser} />
                <span>Edit My Profile</span>
              </Link>
              <Link to="/profile/manage-photos" onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faImages} />
                <span>Manage Photos</span>
              </Link>
              <Link to="/profile/manage-social" onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faBars} />
                <span>Manage Social Accounts</span>
              </Link>
              <Link to="/profile/handle-access-requests" onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faEye} />
                <span>Manage Social Requests</span>
              </Link>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {userData?.has_completed_signup && (
          <div className="sidebar-card">
            <div className="sidebar-title">Account Settings</div>
            <div className="sidebar-items">
              <Link to={""} onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faCog} />
                <span>SMS/Email Alerts</span>
              </Link>
            </div>
            <div className="sidebar-items">
              <Link to={"/profile/hide-profile"} onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={userData?.is_hidden ? faEye : faEyeSlash} />
                <span>{userData?.is_hidden ? "Unhide Profile" : "Hide Profile"}</span>
              </Link>
              <Link to="/profile/edit-password" onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faKey} />
                <span>Edit Password</span>
              </Link>
            </div>
            <div className="sidebar-items">
              <Link to={""} onClick={isMobile ? closeSidebar : undefined}>
                <FontAwesomeIcon icon={faTrashAlt} />
                <span>Delete Profile</span>
              </Link>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="sidebar-card">
          <div className="sidebar-items">
            <Link to={""} onClick={isMobile ? closeSidebar : undefined}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span onClick={logout}>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
