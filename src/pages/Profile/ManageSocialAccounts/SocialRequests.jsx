import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../../components/common/Header';// Import your header component
import Sidebar from '../../../components/common/Sidebar';// Import your sidebar component
import socialService from '../../../services/socialService';
import { toast } from 'react-toastify';
import Footer from '../../../components/common/Footer';
import HandleRequests from '../../../components/profiles/ManageSocialAccounts/HandleRequests';




const SocialRequests = () => {
  const [recivedRequests, setRecivedRequests] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [limit,setLimit] = useState(10);
  const [page,setPage] = useState(1);
  const [recivedCount,setrecivedCount] = useState(0);


  useEffect(() => {
    getRecivedRequts();
  }, [page]);

  const getRecivedRequts = async () => {
    try {
      const response = await socialService.received_social_requests(userData.profile_id,limit,page);
      console.log('response?.results:', response?.results);
      setRecivedRequests(response?.results)
      setrecivedCount(response?.count)
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
            <HandleRequests recivedRequests={recivedRequests} pageLimit={limit} setPage={setPage} totalRecivedDataCounts={recivedCount}/>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SocialRequests;
