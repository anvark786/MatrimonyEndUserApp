import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import '../../assets/styles/RegisterForm.css';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onSubmit, response }) => {
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
    phone_number: Yup.string().required('Phone number is required'),
  });


  return (
    <div className="register-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
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
                <label>Phone Number</label>
              </div>
              <div className="col-md-8">
                <Field
                  type="text"
                  name="phone_number"
                  className="form-control"
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phone_number" component="div" className="error-message" />
                {response && response.phone_number && (
                  <div className="error-message">{response.phone_number[0]}</div>
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
          <Button type="submit" className="btn-bg-color mb-4">
            Register
          </Button>
          {/* Link to the login page */}
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
