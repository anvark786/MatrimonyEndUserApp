import React from 'react';
import { Navigate  } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthComponent = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const access_token = userData?.access_token
    console.log("access_token",access_token);

    if (access_token) {
      return <Component {...props} />;
    } else {
      return <Navigate  to="/login" />;
    }
  };

  return AuthComponent;
};

export default withAuth;
