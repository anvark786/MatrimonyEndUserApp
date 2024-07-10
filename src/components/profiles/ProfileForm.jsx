import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';

const ProfileForm = ({ fields, initialValues, validationSchema, onSubmit,saved,url,onFieldChange=null,refresh=false}) => { 
  const navigate = useNavigate ();  
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
        {fields.map((field, index) => (
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
                  onChange={(e) =>{
                    handleChange(e);
                    if(onFieldChange){
                    onFieldChange(field.name, e.target.value)
                    }
                    }
                  }
                  >                    
                    {field?.options.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
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
        ))}

        <Row className='mt-5'>
          <Col md={6}>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Col>
          <Col md={6}>
            <Button onClick={()=>{
              navigate(url);
              if(refresh){                
                window.location.reload();
              }
              }} disabled={saved?false:true} variant="success">
              Next
            </Button>
          </Col>
        </Row>
      </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
