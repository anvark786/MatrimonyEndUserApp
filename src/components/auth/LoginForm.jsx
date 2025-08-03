import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import '../../assets/styles/LoginForm.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onSubmit, response }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        username_email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username_email: Yup.string().required('Username or email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            await onSubmit(values);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className={`login-form ${response?.StatusCode === 6001 ? 'error' : response?.message ? 'success' : ''}`}>
                        <h2>
                            <FontAwesomeIcon icon={faUser} className="me-2" />
                            Welcome Back
                        </h2>
                        
                        <div className="form-group">
                            <label htmlFor="username_email">
                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                Username or Email
                            </label>
                            <Field
                                type="text"
                                id="username_email"
                                name="username_email"
                                className={`form-control ${touched.username_email && errors.username_email ? 'is-invalid' : ''}`}
                                placeholder="Enter your username or email"
                            />
                            <ErrorMessage name="username_email" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <FontAwesomeIcon icon={faLock} className="me-2" />
                                Password
                            </label>
                            <div className="password-input-container">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        {response?.message && (
                            <div className="api-error">
                                <p className={response?.StatusCode === 6001 ? "text-danger" : "text-success"}>
                                    {response?.message}
                                </p>
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            className={`btn-bg-color ${isLoading ? 'loading' : ''}`}
                            disabled={isSubmitting || isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <div className="form-footer">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register" className="link-primary">
                                    Create Account
                                </Link>
                            </p>
                            <p className="text-muted small">
                                By signing in, you agree to our{' '}
                                <Link to="/terms" className="link-secondary">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="link-secondary">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
