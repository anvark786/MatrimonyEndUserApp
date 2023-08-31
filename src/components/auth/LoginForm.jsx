import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, fied } from 'react-bootstrap';
 // Import Bootstrap's CSS
// import './LoginForm.css'; // Import your custom CSS for styling
import '../../assets/styles/LoginForm.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';


const LoginForm = ({ onSubmit, response }) => {
    const initialValues = {
        username_email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username_email: Yup.string().required('Username or email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values) => {
        let response = onSubmit(values)
        console.log("re", response);
        // Add login logic here, e.g., calling an authentication service

    };

    return (
        <div className="login-form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="login-form">
                    <h2 className="mb-4">Login</h2>
                    <div className="form-group">
                        <div className="row">
                            <div className="row mb-3">
                                {/* <div className="form-group"> */}
                                <div className="col-md-4">
                                    <label>Username</label>
                                </div>
                                <div className="col-md-8">
                                    <Field
                                        type="text"
                                        name="username_email"
                                        className="form-control"
                                        placeholder="Enter username or email"
                                    />
                                    <ErrorMessage name="username_email" component="div" className="error-message" />
                                </div></div>
                            {/* </div> */}
                            {/* <div className="form-group"> */}
                            <div className="row">
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
                                </div></div>
                            <div className="api-error">
                                {response?.message && <p className={response?.StatusCode===6001?"text-danger":"text-success"}>{response?.message}</p>}
                            </div>
                            {/* </div> */}
                        </div>


                    </div>

                    <Button type="submit" className="btn-bg-color mb-4">
                        Login
                    </Button>
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </Form>
            </Formik>
        </div >
    );
};

export default LoginForm;
