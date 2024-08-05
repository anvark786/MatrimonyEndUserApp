import React, { useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { toast } from 'react-toastify';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';

const Preferences = () => {

    const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
    const [saved,setSaved] = useState(profileData.partner_preference?true:false)


    const userData = JSON.parse(localStorage.getItem('userData'));


    const districtOption = [
        { value: '', label: 'Select District' },
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
        { name: 'age_min', label: 'Minimum Age', placeholder: 'Minimum Age', type: "number"},
        { name: 'age_max', label: 'Maximum Age', placeholder: 'Maximum Age', type: "number" },
        { name: 'preferred_district', label: 'Preferred District', placeholder: 'Select preferred district', type: "select", options: districtOption},
        { name: 'street', label: 'Street', placeholder: 'Enter street', type: "text"},
        { name: 'location', label: 'Location', placeholder: 'Enter location', type: "text"},
        { name: 'interests', label: 'Interests', placeholder: 'Enter interests', type: "textarea"},

    ];

    const initialValues = {
        age_min: '',
        age_max: '',
        preferred_district: '',
        street: '',
        location: '',
        interests:''


    };
    const [partnerPreference, setPartnerPreference] = useState(profileData.partner_preference || initialValues);


    const validationSchema = Yup.object({
        age_min: Yup.string().required('Min Age is required'),
        age_max: Yup.string().required('Max age is required'),
        preferred_district: Yup.string().required('Preferred district is required'),
        street: Yup.string().required('Street is required'),
        location: Yup.string().required('Location is required'),

    });

    const handleSubmit = async (values) => {    
        try {

          let method, url,message;

          [method, url,message] = profileData.partner_preference ? ["patch", "/preferences/"+partnerPreference?.id+"/","updated"] : ["post", "/preferences/","saved"];
    
          const response = await callCommonInternalApiService(url,method,values)
          if(response){
            setSaved(true)
            const updatedUserData = {
                ...userData,
                has_completed_signup:true
              };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            sessionStorage.setItem('profileData', JSON.stringify({...profileData,partner_preference:response}));
            toast.success(`Profile data ${message} successfully`);
          }
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
                        <h2 className='mb-4'>Partner Preferences</h2>
                        <div>
                        <ProfileForm fields={fields}
                            initialValues={partnerPreference} 
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            saved={saved} 
                            url="/profile/"
                            urlBack="/profile/update/address"
                        />

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Preferences;
