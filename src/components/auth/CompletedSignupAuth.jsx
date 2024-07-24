import React from 'react';
import { Navigate } from 'react-router-dom';

const withCompleteAuth = (Component) => {
  const AuthComponent = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const access_token = userData?.access_token;
    const has_signup_completed = userData?.has_completed_signup;

    if (access_token && has_signup_completed) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthComponent;
};

export default withCompleteAuth;
