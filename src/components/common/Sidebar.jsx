import React, { useEffect } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';



const Sidebar = () => {
const navigate = useNavigate ();


  useEffect(() => {
    checkTokenExpiration();
    // Set up a timer to check token expiration every minute
    const tokenCheckInterval = setInterval(checkTokenExpiration, 1000);

    return () => {
      clearInterval(tokenCheckInterval); // Clean up the interval on unmount
    };
   
  }, []);


  const logout = () => {
    localStorage.removeItem('userData');
    navigate('/login')// Replace with your desired URL
  };
  const checkTokenExpiration = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token
    const expirationTimestamp = userData?.token_expiration
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    if (accessToken&& expirationTimestamp) {
      if (currentTimestamp >= expirationTimestamp) { 
        localStorage.removeItem('userData');
        toast.error("Session Expired,Please Login Again!.", {
          onOpen: () => {
            navigate('/login'); // Redirect after the toast is closed
          },
        });   
      }
    }
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-title">My Profile</div>
        <div className="sidebar-items">
          <a href="#">
            <FontAwesomeIcon icon={faUser} />
            <span>Edit My Profile</span>
          </a>
          <a href="/profile/manage-photos">
            <FontAwesomeIcon icon={faImages} />
            <span>Manage Photos</span>
          </a>
        </div>
      </div>
      <div className="sidebar-card">
        <div className="sidebar-title">Account Settings</div>
        <div className="sidebar-items">
          <a href="#">
            <FontAwesomeIcon icon={faCog} />
            <span>SMS/Email Alerts</span>
          </a>
        </div>
        <div className="sidebar-items">
          <a href="#">
            <FontAwesomeIcon icon={faEyeSlash} />
            <span>Hide Profile</span>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faKey} />
            <span>Edit Password</span>
          </a>
        </div>
        <div className="sidebar-items">
          <a href="#">
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Delete Profile</span>
          </a>
          {/* <a href="#">
            <FontAwesomeIcon icon={faMedal} />
            <span>Add Trust Badge</span>
          </a> */}
        </div>
        {/* <div className="sidebar-items">
          <a href="#">
            <FontAwesomeIcon icon={faCode} />
            <span>Add Referral Code</span>
          </a>
        </div> */}
      </div>
      <div className="sidebar-card">
        <div className="sidebar-items">
          <a href="#">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span onClick={logout}>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
