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
  const [sentRequests, setSentRequests] = useState([]);
  const [sentCount, setSentCount] = useState(0);


  const userData = JSON.parse(localStorage.getItem('userData'));
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [recivedCount, setrecivedCount] = useState(0);


  useEffect(() => {
    getRecivedRequts();
    getRequestsSend();
  }, [page]);

  const getRecivedRequts = async () => {
    try {
      const response = await socialService.received_social_requests(userData.profile_id, limit, page);
      console.log('response?.results:', response?.results);
      setRecivedRequests(response?.results)
      setrecivedCount(response?.count)
    } catch (error) {
      toast.error("somthing went wrong!,try again..");

    }
  };
  const getRequestsSend = async () => {
    try {
      const response = await socialService.send_social_requests(userData.profile_id, limit, page);
      console.log('response?.results:', response?.results);
      setSentRequests(response?.results)
      setSentCount(response?.count)
    } catch (error) {
      toast.error("somthing went wrong!,try again..");

    }
  };
  const handleSocialRequests = async (action, id) => {
    try {
      const response = await socialService.handle_social_requests(id, { "action": action });
      if (response) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);

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
            <HandleRequests recivedRequests={recivedRequests} pageLimit={limit} setPage={setPage} totalRecivedDataCounts={recivedCount} manageRequests={handleSocialRequests} sentRequests={sentRequests} totalSentDataCounts={sentCount} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SocialRequests;
