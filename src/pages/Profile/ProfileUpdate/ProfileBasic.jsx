import React, { Suspense, useEffect, useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import profileUpdateService from '../../../services/profileUpdateService';
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';


const ProfileBasic = () => {

    const [communityOptions, setCommunityOptions] = useState([{ label: 'Select Community', value: '' },])
    const [religionOptions, setReligionOptions] = useState([{ label: 'Select Religion', value: '' },])
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [saved,setSaved] = useState(false)
    const [isLoading,setIsloading] = useState(true)



    const navigate = useNavigate ();

    useEffect(() => {
        getReligions();
        getCommunities();

      }, [isLoading]);


      const getReligions = async () => {  
        let religions = []  
        try {
          const success = await profileUpdateService.getReligionsData();
          success.map((item)=>{
            religions.push({
                label:item?.name,
                value:item?.id
            })
          }) 
          setReligionOptions(religions)
          // Redirect or perform any other action after successful login
        } catch (error) {
          console.error('error:', error);        
        } 
      };      
      const getCommunities = async () => {  
        try {            
        let communities = []
          const success = await profileUpdateService.getCommunitiesData();     
          if(success.length>0){
            success.map((item)=>{
                communities.push({
                    label:item?.name,
                    value:item?.id
                })
              }) 
          }

          setCommunityOptions(communities)
          // Redirect or perform any other action after successful login
        } catch (error) {
          console.error('error:', error);
        
        } 
        setIsloading(false)
      };


    const complexionOptions = [
        { label: 'Select complexion', value: '' },
        { label: 'Very Fair', value: 'very_fair' },
        { label: 'Fair', value: 'fair' },
        { label: 'Wheatish', value: 'wheatish' },
        { label: 'Dark', value: 'masters' },
    ];
    const bloodGroupOptions = [
        { label: 'Select blood group', value: '' },
        { label: 'A+', value: 'A+' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B-', value: 'B-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
    ];

    const fields = [
        { name: 'date_of_birth', label: 'Date of Birth', placeholder: 'Enter your Date of Birth', type: "date" },
        { name: 'height', label: 'Height', placeholder: 'Enter your height', type: "number" },
        { name: 'weight', label: 'Weight', placeholder: 'Enter your weight', type: "number" },
        { name: 'complexion', label: 'Complexion', placeholder: 'Choose your complexion', type: "select", options: complexionOptions },
        { name: 'blood_group', label: 'Blood Group', placeholder: 'Choose your blood group', type: "select", options: bloodGroupOptions },
        // { name: 'religion', label: 'Religion', placeholder: 'Choose your religion', type: "select", options: religionOptions },
        { name: 'community', label: 'Community', placeholder: 'Choose your community', type: "select", options: communityOptions },
        { name: 'bio', label: 'Profile Description', placeholder: 'Enter more details about you', type: "textarea"},
    ];

    const initialValues = {
        date_of_birth: '',
        height: '',
        weight: '',
        complexion: '',
        blood_group: '',
        community: '',        
        bio: '',        
    };

    const validationSchema = Yup.object({
        date_of_birth: Yup.string().required('Date of birth is required'),
        height: Yup.string().required('Height is required'),
        weight: Yup.string().required('Weight is required'),
        complexion: Yup.string().required('Complexion is required'),
        blood_group: Yup.string().required('Blood Group is required'),
        community: Yup.string().required('Community is required'),        
        bio: Yup.string().required('Profile Description is required'),
    });

    const handleSubmit = async (values) => {    
        try {
          const response = await profileUpdateService.createProfile(values);
          console.log('profile--save:', response);
          if(response){
            const data = {
              ...userData,
              profile_id: response?.id,
            };
            localStorage.setItem('userData', JSON.stringify(data));
            setSaved(true)
            toast.success("Profile Data saved successfully");
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
                        <h2 className='mb-4'>Basic Profile</h2>
                        <div>
                            <ProfileForm fields={fields} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} saved={saved} url="/profile/update/educational-info"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileBasic;
