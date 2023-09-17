import React, { useState } from 'react';
import RegistrationForm from '../components/auth/RegistrationForm';
import AuthService from '../services/authService';
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';




const Register = () => {
  const [response, setResponse] = useState();
  const navigate = useNavigate ();

  const handleSubmit = async (values) => {    
    try {
      const response = await AuthService.register({ ...values });
      console.log('reg responseful:', response);
      setResponse(response);
      if(response){
        const userData = {
          user_id: response?.user_data?.id,
          access_token:response?.access_token,
          profile_id: null,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success(response.message, {
          onOpen: () => {
            navigate('/profile/update/basic-info');
          },
        });
      }
      
      // Redirect or perform any other action after successful login
    } catch (error) {
      console.error('error:', error);
      toast.error(error[0])
      setResponse(error);
    
    } 
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleSubmit} response={response} />
    </div>
  );
};

export default Register;
