import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({ fields, initialValues, validationSchema, onSubmit, saved, url, onFieldChange = null, refresh = false, urlBack = null, isEducation = false }) => {
  const navigate = useNavigate();
  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form>
          {isEducation ? (
            <FieldArray name="educationList">
              {({ push, remove }) => (
                <>
                  {values.educationList && values.educationList.length > 0 && values.educationList.map((education, index) => (
                    <div key={index} className="mb-3">
                      <Row>
                        {fields.map((field, i) => (
                          <Col key={i} md={3}>
                            <label>{field.label}</label>
                            {field.type === 'select' ? (
                              <Field
                                as="select"
                                name={`educationList.${index}.${field.name}`}
                                className="form-control"
                                onChange={(e) => {
                                  handleChange(e);
                                  if (onFieldChange) {
                                    onFieldChange(field.name, e.target.value);
                                  }
                                }}
                              >
                                {field?.options.map((option, idx) => (
                                  <option key={idx} value={option.value}>{option.label}</option>
                                ))}
                              </Field>
                            ) : (
                              <Field
                                type={field.type}
                                name={`educationList.${index}.${field.name}`}
                                as={field.type === 'textarea' ? 'textarea' : undefined}
                                placeholder={field.placeholder}
                                className="form-control"
                              />
                            )}
                            <ErrorMessage name={`educationList.${index}.${field.name}`} component="div" className="error-message" />
                          </Col>
                        ))}
                        <Col md={3} className='mt-4'>
                          <Button className='me-2' variant="danger" onClick={() => remove(index)}>-</Button>
                          {index === values.educationList.length - 1 && (
                            <Button variant="primary" onClick={() => push({ name: '', institution: '', details: '' })} className="ml-2">+</Button>
                          )}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
          ) : (
            fields.map((field, index) => (
              <div key={index} className="mb-3">
                <Row>
                  <Col md={3}>
                    <label>{field.label}</label>
                  </Col>
                  <Col md={6}>
                    {field.type === 'select' ? (
                      <Field
                        as="select"
                        name={field.name}
                        className="form-control"
                        onChange={(e) => {
                          handleChange(e);
                          if (onFieldChange) {
                            onFieldChange(field.name, e.target.value);
                          }
                        }}
                      >
                        {field?.options.map((option, idx) => (
                          <option key={idx} value={option.value}>{option.label}</option>
                        ))}
                      </Field>
                    ) : field.type === 'checkbox' ? (
                      <label>
                        <Field type="checkbox" name={field.name} />
                        {' '} {field.label}
                      </label>
                    ) : (
                      <Field
                        type={field.type}
                        name={field.name}
                        as={field.type === 'textarea' ? 'textarea' : undefined}
                        placeholder={field.placeholder}
                        className="form-control"
                      />
                    )}
                    <ErrorMessage name={field.name} component="div" className="error-message" />
                  </Col>
                </Row>
              </div>
            ))
          )}

          <Row className='mt-5'>
            <Col md={4}>
              <Button type="submit" variant="primary">
                {saved ? "Update" : "Save"}
              </Button>
            </Col>
            <Col md={4}>
              <Button onClick={() => {
                navigate(url);
                if (refresh) {
                  window.location.reload();
                }
              }} disabled={!saved} variant="success">
                Next
              </Button>
            </Col>
            <Col md={4}>
              <Button onClick={() => navigate(urlBack)} variant="secondary" disabled={!urlBack}>
                Back
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
