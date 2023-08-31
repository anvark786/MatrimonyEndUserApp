import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/common/Header'; // Import your header component
import Sidebar from '../../components/common/Sidebar'; // Import your sidebar component
import '../../assets/styles/Style.css'; // Import your custom CSS for styling
import ProfileList from '../../components/profiles/ProfileList';
import profileUpdateService from '../../services/profileUpdateService';
import { toast } from 'react-toastify';

// const profiles = [
//   {
//     image: 'https://shreedestinations.com/wp-content/uploads/2018/08/dummy450x450.jpg',
//     username: 'Fathima Suhaima k',
//     age: '21 yrs',
//     location: 'Edavanna, Kerala, India',
//     religion: 'Muslim',
//     education: 'Masters (M A)',
//     occupation: 'Student',
//   },
//   {
//     image: 'https://shreedestinations.com/wp-content/uploads/2018/08/dummy450x450.jpg',
//     username: 'JohnDoe',
//     age: '30 yrs',
//     location: 'New York, USA',
//     religion: 'Christian',
//     education: 'Bachelors (B A)',
//     occupation: 'Software Engineer',
//   },
//   // Add more profile objects
// ];

const ProfileHomePage = () => {
  const [profileData, setProfileData] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));


  

  useEffect(() => {
    // Fetch profile data from your API
    getProfileData();
    console.log('userData',userData);
  }, [userData.profile_id]);
  const getProfileData = async () => {    
    console.log("hiii");
    try {
      let profiles = []
      const response = await profileUpdateService.getProfile(userData.profile_id);
      console.log('profile--save:', response);
      if(response){
        response.map((item,index)=>{
          profiles.push({
            image: 'https://shreedestinations.com/wp-content/uploads/2018/08/dummy450x450.jpg',
            uuid:item?.uuid,
            username: item?.user_data?.first_name,
            profile_id: item?.profile_id,
            age: item?.age,
            location: item?.address?.city,
            religion: item?.religous_data?.religion,
            education: item?.education?.name,
            occupation: item?.occupation?.profession,
          })
        })
      }
      setProfileData(profiles)
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
          <Col md={3} style={{backgroundColor:"#f4f4f4"}}>
            <Sidebar />
          </Col>
          <Col md={9} className="profile-content">
            {profileData.length>1 ?(
              <div>
                 <ProfileList profiles={profileData} />
              </div>
            ) : (
              <p>no profile data found...</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileHomePage;
