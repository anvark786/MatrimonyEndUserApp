import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../services/apis';

const MobileSchema = Yup.object({
  mobile_number: Yup.string().required('Mobile number is required'),
});

const OtpSchema = Yup.object({
  mobile_otp: Yup.string().required('OTP is required'),
});

const PasswordSchema = Yup.object({
  new_password: Yup.string().required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [token, setToken] = useState('');
  const [otp, setOtp] = useState('');


  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData){
      setStep(3);
    }
  },[])

  // Step 1: Send OTP
  const handleSendOtp = async (values, { setSubmitting }) => {
    try {
      const response = await api.post('send-forgot-password-otp/', {
        mobile_number: values.mobile_number,
      });
      setMobile(values.mobile_number);
      toast.success(response.data.message || 'OTP sent!');
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (values, { setSubmitting }) => {
    try {
      const response = await api.post('verify-forgot-password-otp/', {
        mobile_number: mobile,
        mobile_otp: values.mobile_otp,
      });
      setToken(response?.verified_token_data?.token); // token from backend
      setOtp(response?.verified_token_data?.otp);
      toast.success(response?.message || 'OTP verified!');
      setStep(3);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await api.post('forgot-password/', {
        token: token,
        token_otp: otp,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      });
      toast.success(response.data.message || 'Password reset successful!');
      resetForm();
      setStep(1);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      {step === 1 && (
        <Formik
          initialValues={{ mobile_number: '' }}
          validationSchema={MobileSchema}
          onSubmit={handleSendOtp}
        >
          {({ isSubmitting }) => (
            <Form className="login-form mx-auto">
              <h2 className="mb-4 text-center">Forgot Password</h2>
              <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <Field
                  type="text"
                  name="mobile_number"
                  id="mobile_number"
                  className="form-control"
                  placeholder="Enter your mobile number"
                />
                <ErrorMessage name="mobile_number" component="div" className="error-message" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {step === 2 && (
        <Formik
          initialValues={{ mobile_otp: '' }}
          validationSchema={OtpSchema}
          onSubmit={handleVerifyOtp}
        >
          {({ isSubmitting }) => (
            <Form className="login-form mx-auto">
              <h2 className="mb-4 text-center">Verify OTP</h2>
              <div className="form-group">
                <label htmlFor="mobile_otp">OTP</label>
                <Field
                  type="text"
                  name="mobile_otp"
                  id="mobile_otp"
                  className="form-control"
                  placeholder="Enter OTP"
                />
                <ErrorMessage name="mobile_otp" component="div" className="error-message" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {step === 3 && (
        <Formik
          initialValues={{ new_password: '', confirm_password: '' }}
          validationSchema={PasswordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="login-form mx-auto">
              <h2 className="mb-4 text-center">Reset Password</h2>
              <div className="form-group">
                <label htmlFor="new_password">New Password</label>
                <Field
                  type="password"
                  name="new_password"
                  id="new_password"
                  className="form-control"
                  placeholder="Enter new password"
                />
                <ErrorMessage name="new_password" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <Field
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="form-control"
                  placeholder="Confirm new password"
                />
                <ErrorMessage name="confirm_password" component="div" className="error-message" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ForgotPassword;