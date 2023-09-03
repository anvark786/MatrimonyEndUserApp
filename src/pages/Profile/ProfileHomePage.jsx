import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/common/Header'; // Import your header component
import Sidebar from '../../components/common/Sidebar'; // Import your sidebar component
import '../../assets/styles/Style.css'; // Import your custom CSS for styling
import ProfileList from '../../components/profiles/ProfileList';
import profileUpdateService from '../../services/profileUpdateService';
import { toast } from 'react-toastify';



const ProfileHomePage = () => {
  const [profileData, setProfileData] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));


  useEffect(() => {
    // Fetch profile data from your API
    getProfileData();
    console.log('userData',userData);
  }, [userData.profile_id]);

  const getProfileData = async () => {
    try {
      const response = await profileUpdateService.getProfile(userData.profile_id);     
      console.log('profile--data:', response);      
      setProfileData(response)
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
