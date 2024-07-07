import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import '../../assets/styles/RegisterForm.css';
import { Link } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const RegisterForm = ({ 
          onSubmit, 
          response,
          sendOtp,
          verifyOtp,
          otpSent,
          otpVerified,
          setOtp,
          setMobileNo,
          setOtpVerified,
          setOtpSent,
          loading }) => { 

  const initialValues = {
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    phone_number: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    phone_number: Yup.string()
      .required('Mobile Number is required')
      .matches(
        /^(?:\+91|91)?[6789]\d{9}$/,
        'Please enter a valid Indian mobile number'
      ),
  });
 

  return (
    <div className="register-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors,handleChange, handleBlur, handleSubmit, setFieldValue,validateField,setFieldError }) => (
          <Form className="register-form">
            <h2 className="mb-4">Registration</h2>
            <div className="form-group">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>First Name</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="Enter first name"
                  />
                  <ErrorMessage name="first_name" component="div" className="error-message" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Last Name</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder="Enter last name"
                  />
                  <ErrorMessage name="last_name" component="div" className="error-message" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Gender</label>
                </div>
                <div className="col-md-8">
                  <Field as="select" name="gender" className="form-control">
                    <option value="" label="Select Gender" />
                    <option value="M" label="Male" />
                    <option value="F" label="Female" />
                  </Field>
                  <ErrorMessage name="gender" component="div" className="error-message" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Email</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                  {response && response.email && (
                    <div className="error-message">{response.email[0]}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Mobile Number</label>
                </div>
                <div className="col-md-8 container-phone-input-custom">
                  <PhoneInput
                    defaultCountry="in"
                    value={values.phone_number}
                    onChange={(phone) => {
                      setMobileNo(phone);
                      setFieldValue('phone_number', phone);
                      setOtpVerified(false);
                      setOtpSent(false);
                    }}
                  />
                  {/* <ErrorMessage name="phone_number" component="div" className="error-message" /> */}
                  {errors.phone_number&&<div className="error-message text-info">{errors.phone_number}</div>}
                  {response && response.phone_number && (
                    <div className="error-message">{response.phone_number[0]}</div>
                  )}
                  {!otpSent && (
                    <Button
                      disabled={loading}
                      type="button"
                      variant="primary"
                      className="btn-sm mt-2"
                      onClick={async () => {
                        await validateField('phone_number');
                        if (errors.phone_number) {
                          setFieldError("phone_number",errors.phone_number)
                        } else {
                          sendOtp();
                        }
                      }}
                    >
                     {loading ? 'Loading...' : 'Send OTP'} 
                    </Button>
                  )}
                  {otpSent && !otpVerified && (
                    <div className="mt-2">
                      <label htmlFor="otp">Enter OTP:</label>
                      <Field
                        type="text"
                        id="otp"
                        name="otp"
                        value= {values.otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-control"
                      />
                      <Button
                        type="button"
                        variant="primary"
                        className="btn-sm mt-2"
                        onClick={verifyOtp}
                      >
                        Verify OTP
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Username</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                  />
                  <ErrorMessage name="username" component="div" className="error-message" />
                  {response && response.username && (
                    <div className="error-message">{response.username[0]}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Password</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Confirm Password</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    placeholder="Confirm password"
                  />
                  <ErrorMessage name="confirm_password" component="div" className="error-message" />
                </div>
              </div>
              <div className="api-error">
                {response?.message && (
                  <p className={response?.StatusCode === 6001 ? 'text-danger' : 'text-success'}>
                    {response?.message}
                  </p>
                )}
              </div>
            </div>
            {otpVerified ? (
              <Button type="submit" className="btn-bg-color mb-4">
                Register
              </Button>
            ) : (
              <Button type="submit" className="btn-bg-color mb-4" disabled>
                Register
              </Button>
            )}
            {/* Link to the login page */}
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
