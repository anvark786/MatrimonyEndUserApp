import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import AuthService from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';


const Login = () => {
const [response,setResponse] = useState();
const navigate = useNavigate ();

  const handleLogin = async (values) => {
    console.log("the valuesssss",values);
    try {
      const response = await AuthService.login(values.username_email, values.password);
      console.log('Login responseful:', response);
      const tokenExpirationTime = 3600; // Expiration time in seconds (example: 1 hour)
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      const expirationTimestamp = currentTimestamp + tokenExpirationTime;
      const userData = {
        user_id: response?.user_id,
        access_token:response?.access_token,
        token_expiration:expirationTimestamp,
        profile_id: response?.profile_id,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      setResponse(response)
      if(response){
        toast.success(response.message, {
          autoClose: 1000,
          onOpen: () => {           
            window.location.href = '/profile';
          },
        });
      }
      // Redirect or perform any other action after successful login
    } catch (error) {
      console.error('Login error:', error);
      setResponse(error)
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} response={response} />
    </div>
  );
};

export default Login;
