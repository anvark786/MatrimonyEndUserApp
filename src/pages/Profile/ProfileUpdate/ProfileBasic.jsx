import React, { Suspense, useEffect, useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import profileUpdateService from '../../../services/profileUpdateService';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';
import { toast } from 'react-toastify';
import RenderOptions from '../../../components/common/RenderOptions';


const ProfileBasic = () => {

  const [communityOptions, setCommunityOptions] = useState([{ label: 'Select Community', value: '' },])
  const [religionOptions, setReligionOptions] = useState([{ label: 'Select Religion', value: '' },])
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { maritalStatusOptions, physicalStatusOptions } = RenderOptions();    

  const [saved, setSaved] = useState(false)
  

  useEffect(() => {
    getReligions();
    getCommunities();
    if(userData?.profile_uuid){
       getProfileData();
    }

  }, []);


  const getReligions = async () => {
    let religions = []
    try {
      const success = await profileUpdateService.getReligionsData();
      success.map((item) => {
        religions.push({
          label: item?.name,
          value: item?.id
        })
      })
      setReligionOptions(religions)
    } catch (error) {
      console.error('error:', error);
    }
  };
  const getCommunities = async () => {
    try {
      let communities = []
      const success = await profileUpdateService.getCommunitiesData();
      if (success.length > 0) {
        success.map((item) => {
          communities.push({
            label: item?.name,
            value: item?.id
          })
        })
      }

      setCommunityOptions(communities)
    } catch (error) {
      console.error('error:', error);

    }
  };

  const getProfileData = async () => {
    try {
      const response = await profileUpdateService.getProfileDetails(userData?.profile_uuid);
      sessionStorage.setItem('profileData', JSON.stringify(response));
      setInitialValues({
        date_of_birth: response?.date_of_birth,
        marital_status:response?.marital_status,
        physical_status:response?.physical_status,
        height: response?.height,
        weight: response?.weight,
        complexion: response?.complexion,
        blood_group: response?.blood_group,
        community: response?.community,
        bio: response?.bio,
      })
      if(response?.date_of_birth!==''){
        setSaved(true)
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };


  const complexionOptions = [
    { label: 'Select complexion', value: '' },
    { label: 'Very Fair', value: 'very_fair' },
    { label: 'Fair', value: 'fair' },
    { label: 'Wheatish', value: 'wheatish' },
    { label: 'Dark', value: 'dark' },
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
    { name: 'marital_status', label: 'Marital Status', placeholder: 'Select Marital Status', type: "select", options: maritalStatusOptions },
    { name: 'date_of_birth', label: 'Date of Birth', placeholder: 'Enter your Date of Birth', type: "date" },
    { name: 'height', label: 'Height', placeholder: 'Enter your height', type: "number" },
    { name: 'weight', label: 'Weight', placeholder: 'Enter your weight', type: "number" },
    { name: 'complexion', label: 'Complexion', placeholder: 'Choose your complexion', type: "select", options: complexionOptions },
    { name: 'blood_group', label: 'Blood Group', placeholder: 'Choose your blood group', type: "select", options: bloodGroupOptions },
    { name: 'physical_status', label: 'Physical Status', placeholder: 'Select Physical Status', type: "select", options: physicalStatusOptions },

    // { name: 'religion', label: 'Religion', placeholder: 'Choose your religion', type: "select", options: religionOptions },
    { name: 'community', label: 'Community', placeholder: 'Choose your community', type: "select", options: communityOptions },
    { name: 'bio', label: 'Profile Description', placeholder: 'Enter more details about you', type: "textarea" },
  ];

  const initialData = {
    marital_status:'',
    date_of_birth: '',
    height: '',
    weight: '',
    complexion: '',
    blood_group: '',
    physical_status:'',
    community: '',
    bio: '',
  };
  const [initialValues, setInitialValues] = useState(initialData)


  const validationSchema = Yup.object({
    marital_status: Yup.string().required('Marital Status is required'),
    date_of_birth: Yup.string().required('Date of birth is required'),
    physical_status: Yup.string().required('Physical Status is required'),

    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    complexion: Yup.string().required('Complexion is required'),
    blood_group: Yup.string().required('Blood Group is required'),
    community: Yup.string().required('Community is required'),
    bio: Yup.string().required('Profile Description is required'),
  });

  const handleSubmit = async (values) => {
    try {
      let method, url,message,form_data;

      [method, url,message,form_data] = initialValues?.date_of_birth !== '' ? ["patch", "/profiles/"+userData?.profile_id+"/","updated",values] : ["post", "/profiles/","saved",{...values,"user":userData?.user_id}];

      const response = await callCommonInternalApiService(url,method,form_data)
      if (response) {
        const data = {
          ...userData,
          profile_id: response?.id,
          profile_uuid: response?.uuid
        };
        localStorage.setItem('userData', JSON.stringify(data));
        setSaved(true)       
        toast.success(`Profile Data ${message} successfully`);
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
            <h2 className='mb-4'>Basic Profile</h2>
            <div>
              <ProfileForm fields={fields}
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={handleSubmit} 
                saved={saved} 
                url="/profile/update/educational-info" 
                refresh={true} 
               />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileBasic;
