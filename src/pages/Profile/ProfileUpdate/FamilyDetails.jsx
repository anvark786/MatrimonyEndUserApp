import React, { useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { toast } from 'react-toastify';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';

const FamilyDetails = () => {

    
    const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
    const [saved,setSaved] = useState(profileData.family_details?true:false)


    const financialStatusOptions = [
        { label: 'Select Financial Status', value: '' },
        { label: 'Ritch', value: 'ritch' },
        { label: 'Upper Middle Class', value: 'upper' },
        { label: 'Middle Class', value: 'middle' },
        { label: 'Lower Middle Class', value: 'lower' },
        { label: 'Poor', value: 'poor' },

    ];

   

    const fields = [
        { name: 'financial_status', label: 'Financial status', placeholder: 'Select Financial Status',type: "select", options: financialStatusOptions},
        { name: 'father_alive', label: 'Father Alive', placeholder: 'father_alive', type: "checkbox" },
        { name: 'mother_alive', label: 'Mother Alive', placeholder: 'mother_alive', type: "checkbox"},
        { name: 'father_occupation', label: 'Father occupation', placeholder: 'Enter Father occupation', type: "text"},
        { name: 'mother_occupation', label: 'Mother occupation', placeholder: 'Enter Mother occupation', type: "text"},
        { name: 'no_of_elder_bro', label: 'No of elder brohers', placeholder: '0', type: "number"},
        { name: 'no_of_younger_bro', label: 'No of younger brohers', placeholder: '0', type: "number"},
        { name: 'no_of_married_bro', label: 'No of married brohers', placeholder: '0', type: "number"},
        { name: 'no_of_elder_sis', label: 'No of elder sisters', placeholder: '0', type: "number"},
        { name: 'no_of_younger_sis', label: 'No of younger sisters', placeholder: '0', type: "number"},
        { name: 'no_of_married_sis', label: 'No of married sisters', placeholder: '0', type: "number"},
        { name: 'more_details', label: 'Additional details', placeholder: 'Enter More details....', type: "textarea"},

    ];

    const initialValues = {
        financial_status: '',
        father_alive: true,
        mother_alive: true,
        father_occupation: '',
        mother_occupation:'',
        no_of_elder_bro:'',
        no_of_younger_bro:'',
        no_of_married_bro:'',
        no_of_elder_sis:'',
        no_of_younger_sis:'',
        no_of_married_sis:'',
        more_details:''
        
    };
    const [familyDetails, setFamilyDetails] = useState(profileData.family_details || initialValues);


    const validationSchema = Yup.object({
        financial_status: Yup.string().required('Financial status is required'),
        father_alive: Yup.boolean(),
        mother_alive: Yup.boolean(),
        no_of_elder_bro:Yup.string().required('No of elder brohers is required'),
        no_of_younger_bro:Yup.string().required('No of younger brohers is required'),
        no_of_married_bro:Yup.string().required('No of married brohers is required'),
        no_of_elder_sis:Yup.string().required('No of elder sisters is required'),
        no_of_younger_sis:Yup.string().required('No of younger sisters is required'),
        no_of_married_sis:Yup.string().required('No of married sisters is required'),

    });

    const handleSubmit = async (values) => {    
        try {
          let method, url,message;

          [method, url,message] = profileData.family_details ? ["patch", "/family-details/"+familyDetails?.id+"/","Updated"] : ["post", "/family-details/","Saved"];
    
          const response = await callCommonInternalApiService(url,method,values)
          console.log('profile--save:', response);
          if(response){
            setSaved(true)
            sessionStorage.setItem('profileData', JSON.stringify({...profileData,family_details:response}));
            toast.success(`${message} successfully`);
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
                        <h2 className='mb-4'>Family Details</h2>
                        <div>
                        <ProfileForm fields={fields} 
                        initialValues={familyDetails} 
                        validationSchema={validationSchema} 
                        onSubmit={handleSubmit} 
                        saved={saved} 
                        url="/profile/update/address"
                        urlBack="/profile/update/occupational-info"
                        />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FamilyDetails;
