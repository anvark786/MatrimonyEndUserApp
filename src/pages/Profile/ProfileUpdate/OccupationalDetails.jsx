import React, { useState,useEffect } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { toast } from 'react-toastify';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';



const OccupationalDetails = () => {   
    const [saved,setSaved] = useState(false)
    const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
    const professionsOptions = [
        { value: '', label: 'Select Profession Type' },
        { value: 'accountant', label: 'Accountant' },
        { value: 'actor', label: 'Actor' },
        { value: 'architect', label: 'Architect' },
        { value: 'artist', label: 'Artist' },
        { value: 'chef', label: 'Chef' },
        { value: 'doctor', label: 'Doctor' },
        { value: 'engineer', label: 'Engineer' },
        { value: 'farmer', label: 'Farmer' },
        { value: 'lawyer', label: 'Lawyer' },
        { value: 'mechanic', label: 'Mechanic' },
        { value: 'musician', label: 'Musician' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'pilot', label: 'Pilot' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'writer', label: 'Writer' },
        { value: 'actor', label: 'Actor' },
        { value: 'athlete', label: 'Athlete' },
        { value: 'baker', label: 'Baker' },
        { value: 'barber', label: 'Barber' },
        { value: 'blogger', label: 'Blogger' },
        { value: 'carpenter', label: 'Carpenter' },
        { value: 'chef', label: 'Chef' },
        { value: 'coach', label: 'Coach' },
        { value: 'dentist', label: 'Dentist' },
        { value: 'designer', label: 'Designer' },
        { value: 'electrician', label: 'Electrician' },
        { value: 'entrepreneur', label: 'Entrepreneur' },
        { value: 'firefighter', label: 'Firefighter' },
        { value: 'fitness instructor', label: 'Fitness Instructor' },
        { value: 'florist', label: 'Florist' },
        { value: 'graphic designer', label: 'Graphic Designer' },
        { value: 'hairdresser', label: 'Hairdresser' },
        { value: 'journalist', label: 'Journalist' },
        { value: 'librarian', label: 'Librarian' },
        { value: 'manager', label: 'Manager' },
        { value: 'mechanic', label: 'Mechanic' },
        { value: 'model', label: 'Model' },
        { value: 'musician', label: 'Musician' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'painter', label: 'Painter' },
        { value: 'photographer', label: 'Photographer' },
        { value: 'plumber', label: 'Plumber' },
        { value: 'police officer', label: 'Police Officer' },
        { value: 'professor', label: 'Professor' },
        { value: 'programmer', label: 'Programmer' },
        { value: 'real estate agent', label: 'Real Estate Agent' },
        { value: 'researcher', label: 'Researcher' },
        { value: 'salesperson', label: 'Salesperson' },
        { value: 'scientist', label: 'Scientist' },
        { value: 'singer', label: 'Singer' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'translator', label: 'Translator' },
        { value: 'veterinarian', label: 'Veterinarian' },
        { value: 'waiter/waitress', label: 'Waiter/Waitress' },
        { value: 'student', label: 'Student' },
        { value: 'others', label: 'Others' },
        
        // Add more professions as needed
      ];
      

    const fields = [
        { name: 'profession', label: 'Profession', placeholder: 'Your Profession', type: "text"},        
        { name: 'profession_type', label: 'Profession Type', type: "select",options:professionsOptions},
        { name: 'company_name', label: 'Company Name', placeholder: 'Enter Company Name', type: "text" },
        { name: 'job_details', label: 'Job Details', placeholder: 'Example:address...etc', type: "textarea"},
        { name: 'annual_income', label: 'Annual Income', placeholder: 'Enter Annual Income', type: "number"},
    ];

    const initialValues = {
        profession: '',
        company_name: '',
        job_details: '',
        annual_income: '',
    };
    const [occupation, setOccupation] = useState(profileData.occupation || initialValues);


    const validationSchema = Yup.object({
        job_details: Yup.string().required('Job Details is required'),

    });

    useEffect(() => {
        if (profileData.occupation) {
            setSaved(true)
            setOccupation(profileData.occupation);
        }
    }, []);


    const handleSubmit = async (values) => {    
        try {
        let method, url,message;

        [method, url,message] = profileData.occupation ? ["patch", "/occupations/"+occupation?.id+"/","Updated"] : ["post", "/occupations/","Saved"];
  
        const response = await callCommonInternalApiService(url,method,values)
          if(response){
            setSaved(true)
            sessionStorage.setItem('profileData', JSON.stringify({...profileData,occupation:response}));
            toast.success(`${message} successfully`);
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
                        <h2 className='mb-4'>Ocupational Details</h2>
                        <div>
                        <ProfileForm fields={fields} 
                        initialValues={occupation} 
                        validationSchema={validationSchema} 
                        onSubmit={handleSubmit} saved={saved} 
                        url="/profile/update/family-info"
                        urlBack="/profile/update/educational-info"
                        />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OccupationalDetails;
