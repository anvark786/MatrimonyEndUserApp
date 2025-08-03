import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import './EditPassword.css';
import editPassword from '../../services/editPassword';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  old_password: Yup.string().required('Current password is required'),
  new_password: Yup.string().required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});

const EditPassword = () => {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setApiErrors({});
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('old_password', values.old_password);
      formData.append('new_password', values.new_password);
      formData.append('confirm_password', values.confirm_password);

      await editPassword.updatePassword(formData);

      resetForm();
      toast.success('Password updated successfully!');
    } catch (error) {
      setApiErrors(error);
      toast.error(error.detail || 'Failed to update password');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="layout-container">
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex align-items-center" style={{ minHeight: '80vh' }}>
            <div className="w-100">
              <div className="content-wrapper">
                <div className="content-header text-center mb-4">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: '#151618ff',
                      background: 'linear-gradient(90deg, #303133ff 0%, #0f1213ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    <FontAwesomeIcon icon={faKey} style={{ fontSize: '2.5rem' }} />
                    Change Password
                  </span>
                </div>
                <div className="content-body">
                  <div className="card shadow-lg">
                    <div className="card-body">
                      <Formik
                        initialValues={{
                          old_password: '',
                          new_password: '',
                          confirm_password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting, touched, errors }) => (
                          <Form id="edit-password-form" className="login-form mx-auto">
                            <div className="form-group">
                              <label htmlFor="old_password">Current Password</label>
                              <Field
                                type="password"
                                name="old_password"
                                id="old_password"
                                className={`form-control ${touched.old_password && (errors.old_password || apiErrors.old_password) ? 'is-invalid' : ''}`}
                                placeholder="Enter current password"
                              />
                              <ErrorMessage name="old_password" component="div" className="error-message" />
                              {apiErrors.old_password && (
                                <div className="error-message">{apiErrors.old_password[0]}</div>
                              )}
                            </div>

                            <div className="form-group">
                              <label htmlFor="new_password">New Password</label>
                              <Field
                                type="password"
                                name="new_password"
                                id="new_password"
                                className={`form-control ${touched.new_password && (errors.new_password || apiErrors.new_password) ? 'is-invalid' : ''}`}
                                placeholder="Enter new password"
                              />
                              <ErrorMessage name="new_password" component="div" className="error-message" />
                              {apiErrors.new_password && (
                                <div className="error-message">{apiErrors.new_password[0]}</div>
                              )}
                            </div>

                            <div className="form-group">
                              <label htmlFor="confirm_password">Confirm New Password</label>
                              <Field
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                className={`form-control ${touched.confirm_password && (errors.confirm_password || apiErrors.confirm_password) ? 'is-invalid' : ''}`}
                                placeholder="Confirm new password"
                              />
                              <ErrorMessage name="confirm_password" component="div" className="error-message" />
                              {apiErrors.confirm_password && (
                                <div className="error-message">{apiErrors.confirm_password[0]}</div>
                              )}
                            </div>

                            <button
                              type="submit"
                              className={`btn btn-primary w-100 ${loading ? 'loading' : ''}`}
                              disabled={isSubmitting || loading}
                            >
                              {loading ? 'Updating...' : 'Update Password'}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;