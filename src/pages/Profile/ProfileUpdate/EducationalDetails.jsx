import React, { useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import profileUpdateService from '../../../services/profileUpdateService';
import { toast } from 'react-toastify';


const EducationalDetails = () => {

    const [saved,setSaved] = useState(false)

    const educationOptions = [
        { label: 'Select Highest Education', value: '' },
        { label: 'SSLC', value: 'sslc' },
        { label: 'Plus Two', value: 'pls_two' },
        { label: 'Bachelor Degree', value: 'degree' },
        { label: 'Master Degree', value: 'pg' },
    ];
   

    const fields = [
        { name: 'name', label: 'Highest Education', placeholder: 'Select Highest Education', type: "select", options: educationOptions},
        { name: 'institution', label: 'Institution Name', placeholder: 'Enter Institution Name', type: "text" },
        { name: 'details', label: 'Institution Details', placeholder: 'Example:address...etc', type: "textarea"},


    ];

    const initialValues = {
        name: '',
        institution: '',
        details: '',

    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Highest Education is required'),
        institution: Yup.string().required('Institution is required'),

    });

    
    const handleSubmit = async (values) => {    
        try {
          const response = await profileUpdateService.createEducation(values);
          console.log('profile--save:', response);
          if(response){
            setSaved(true)
            toast.success("Saved successfully");
          }
          
          // Redirect or perform any other action after successful login
        } catch (error) {
            toast.error("somthing went wrong!,try again..");   
        
        } 
      };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3} style={{ backgroundColor: "#f4f4f4" }}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className="profile-content">
                        <h2 className='mb-4'>Educational Details</h2>
                        <div>
                            <ProfileForm fields={fields} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} saved={saved} url="/profile/update/occupational-info"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EducationalDetails;
