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
  faBars,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Sidebar = () => {

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    checkTokenExpiration();
    const tokenCheckInterval = setInterval(checkTokenExpiration, 1000);

    return () => {
      clearInterval(tokenCheckInterval); 
    };
   
  }, []);


  const logout = () => {
    localStorage.removeItem('userData');
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
        toast.error("Session Expired,Please Login Again!.", {
          onOpen: () => {
             window.location.href = '/profile';; 
          },
        });   
      }
    }
  };
  
  return (
    <div className="sidebar">
      {userData?.has_completed_signup&&<div className="sidebar-card">
        <div className="sidebar-title">My Profile</div>
        <div className="sidebar-items">
          <Link to={"/profile/update/basic-info"}>
            <FontAwesomeIcon icon={faUser} />
            <span>Edit My Profile</span>
          </Link>
          <Link to="/profile/manage-photos">
            <FontAwesomeIcon icon={faImages} />
            <span>Manage Photos</span>
          </Link>
          <Link to="/profile/manage-social">
            <FontAwesomeIcon icon={faBars} />
            <span>Manage Social Accounts</span>
          </Link>
          <Link to="/profile/handle-access-requests">
            <FontAwesomeIcon icon={faEye} />
            <span>Manage Social Requests</span>
          </Link>
        </div>
      </div>}
      {userData?.has_completed_signup&&<div className="sidebar-card">
        <div className="sidebar-title">Account Settings</div>
        <div className="sidebar-items">
          <Link to={""}>
            <FontAwesomeIcon icon={faCog} />
            <span>SMS/Email Alerts</span>
          </Link>
        </div>
        <div className="sidebar-items">
          <Link to={""}>
            <FontAwesomeIcon icon={faEyeSlash} />
            <span>Hide Profile</span>
          </Link>
          <Link to={""}>
            <FontAwesomeIcon icon={faKey} />
            <span>Edit Password</span>
          </Link>
        </div>
        <div className="sidebar-items">
          <Link to={""}>
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Delete Profile</span>
          </Link>
          {/* <Link to={""}>
            <FontAwesomeIcon icon={faMedal} />
            <span>Add Trust Badge</span>
          </Link> */}
        </div>
        {/* <div className="sidebar-items">
          <Link to={""}>
            <FontAwesomeIcon icon={faCode} />
            <span>Add Referral Code</span>
          </Link>
        </div> */}
      </div>}
      <div className="sidebar-card">
        <div className="sidebar-items">
          <Link to={""}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span onClick={logout}>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
