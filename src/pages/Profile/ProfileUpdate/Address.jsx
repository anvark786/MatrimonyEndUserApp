import React, { useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import profileUpdateService from '../../../services/profileUpdateService';
import { toast } from 'react-toastify';

const Address = () => {

    const [saved,setSaved] = useState(false)

    const districtOption = [
        { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
        { value: 'kollam', label: 'Kollam' },
        { value: 'pathanamthitta', label: 'Pathanamthitta' },
        { value: 'alappuzha', label: 'Alappuzha' },
        { value: 'idukki', label: 'Idukki' },
        { value: 'ernakulam', label: 'Ernakulam' },
        { value: 'thrissur', label: 'Thrissur' },
        { value: 'palakkad', label: 'Palakkad' },
        { value: 'malappuram', label: 'Malappuram' },
        { value: 'kozhikode', label: 'Kozhikode' },
        { value: 'wayanad', label: 'Wayanad' },
        { value: 'kannur', label: 'Kannur' },
        { value: 'kasaragod', label: 'Kasaragod' },
      ];
      
      

    const fields = [
        { name: 'district', label: 'District', placeholder: 'Select District', type: "select", options: districtOption},
        { name: 'city', label: 'City', placeholder: 'Enter city', type: "text" },
        { name: 'street', label: 'Street', placeholder: 'Enter street', type: "text"},
        { name: 'location', label: 'Location', placeholder: 'Enter location', type: "text"},
        { name: 'post_code', label: 'Post Code', placeholder: 'Enter Post Code', type: "number"},
        { name: 'address', label: 'Full Address', placeholder: 'Enter Full Address', type: "textarea"},

    ];

    const initialValues = {
        district: '',
        city: '',
        street: '',
        location: '',
        post_code: '',
        address:''


    };

    const validationSchema = Yup.object({
        district: Yup.string().required('District is required'),
        city: Yup.string().required('City is required'),
        street: Yup.string().required('Street is required'),
        location: Yup.string().required('Location is required'),
        post_code: Yup.string().required('Post Code is required'),
        address: Yup.string().required('Address is required'),

    });

    const handleSubmit = async (values) => {    
        try {
          const response = await profileUpdateService.createAddress(values);
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
                        <h2 className='mb-4'>Address</h2>
                        <div>
                        <ProfileForm fields={fields} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} saved={saved} url="/profile/update/preferences"/>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Address;
