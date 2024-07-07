import React, { useState } from 'react';
import RegistrationForm from '../components/auth/RegistrationForm';
import AuthService from '../services/authService';
import callCommonInternalApiService from '../services/callCommonInternalApiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




const Register = () => {
  const [response, setResponse] = useState();  
  const [mobileNo, setMobileNo] = useState('');  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (otpVerified) {
      try {
        const ApiResponse = await AuthService.register({ ...values });
        console.log('reg responseful:', ApiResponse);
        setResponse(ApiResponse);
        if (ApiResponse) {
          const userData = {
            user_id: ApiResponse?.user_data?.id,
            access_token: ApiResponse?.access_token,
            profile_id: null,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          toast.success(ApiResponse.message, {
            onOpen: () => {
              navigate('/profile/update/basic-info');
            },
          });
        }
      } catch (error) {
        console.error('error:', error);
        toast.error(error[0])
        setResponse(error);

      }
    } else {
      // Display error or handle case where OTP is not verified
      console.log('Please verify OTP first');
    }

  };


  const handleSendOTP = async () => {  
    setLoading(true);
    try{
      let apiUrl = `send-mobile-otp/`
      const response = await callCommonInternalApiService(apiUrl, 'post',{"phone_number":mobileNo});
      if (response){
        setLoading(false);
        toast.success(response.message)
        setOtpSent(true);
      }
    }catch(error){
      setLoading(false);
      toast.error(error.message)
    }   
  };

  const handleVerifyOTP = async () => {
    try{
      let apiUrl = `verify-mobile-otp/`
      const response = await callCommonInternalApiService(apiUrl, 'post',{"phone_number":mobileNo,"otp":otp});
      if (response){
        toast.success(response.message)
        setOtpVerified(true);
      }
    }catch(error){
      toast.error(error.message)
    } 
  };

  return (
    <div>
      <RegistrationForm 
        onSubmit={handleSubmit}
        response={response}
        sendOtp={handleSendOTP} 
        verifyOtp={handleVerifyOTP} 
        otpSent={otpSent}
        otpVerified = {otpVerified}
        setOtp ={setOtp}
        setMobileNo={setMobileNo}
        setOtpVerified={setOtpVerified}
        setOtpSent={setOtpSent}
        loading={loading}
      />
    </div>
  );
};

export default Register;
