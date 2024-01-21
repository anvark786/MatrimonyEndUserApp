import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/common/Header'; 
import Sidebar from '../../components/common/Sidebar';
import '../../assets/styles/Style.css'; 
import ProfileList from '../../components/profiles/ProfileList';
import { toast } from 'react-toastify';
import Footer from '../../components/common/Footer';
import callCommonInternalApiService from '../../services/callCommonInternalApiService';
import CustomizedPagination from '../../components/common/CustomizedPagination';


const ProfileHomePage = () => {
  const [profileData, setProfileData] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);
  let itemsPerPage = 10;
  const totalPages = Math.ceil(dataCount / itemsPerPage);


  useEffect(() => {
    const filteredData = JSON.parse(sessionStorage.getItem('filteredData')) || {};
    const queryParams = new URLSearchParams(window.location.search);
    let filtered = queryParams.get('filtered')
    if (filteredData && filtered == 'true') {
      handleSearch(filteredData);
    }
    else {
      getProfileData();
    }
  }, [userData.profile_id,page]);

  const getProfileData = async () => {
    try {
      let apiUrl = `profiles/${userData.profile_id}/matching_profiles/?page=${page}&limit=${itemsPerPage}`
      const response = await callCommonInternalApiService(apiUrl, 'get');

      console.log('profile--data:', response);
      if (response) {
        setProfileData(response?.results)
        setDataCount(response?.count)
      }

    } catch (error) {
      toast.error("somthing went wrong!,try again..");

    }
  };

  const handleSearch = async (filteredData) => {
    try {
      let apiUrl = `profiles/`
      if (filteredData?.profile_id) {
        apiUrl += `search-by-id/?profile_id=` + filteredData?.profile_id
      }
      console.log(apiUrl);
      const response = await callCommonInternalApiService(apiUrl, 'get');

      if (response) {
        setProfileData(response)
      }
    } catch (error) {
      console.error('error:', error);
      toast.error(error[0])
      //   setResponse(error);

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
            {profileData.length > 0 ? (
              <div>
                <ProfileList profiles={profileData} />
                <CustomizedPagination totalPages={totalPages} setPage={setPage} />
              </div>
            ) : (
              <p>no profile data found...</p>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ProfileHomePage;
