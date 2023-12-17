import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/common/Sidebar';
import Header from '../../../components/common/Header';
import { Container, Row, Col } from 'react-bootstrap';
import ManageSocial from '../../../components/profiles/ManageSocialAccounts/ManageSocial';
import Footer from '../../../components/common/Footer';
import socialService from '../../../services/socialService';


const SocialMediaManagement = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [socialLinks, setSocialLinks] = useState([]);
  const [updateTheData,setUpdateTheData] = useState(false)
  const [isLocked,setIsLocked] = useState(false)

  useEffect(() => {
    getSocialAcc();
  }, [updateTheData]);
  const getSocialAcc = async () => {
    try {
      const response = await socialService.getSocialAccounts(userData?.profile_id);    
      setSocialLinks(response?.data)
      setIsLocked(response?.is_locked_social)
      setUpdateTheData(true)
    } catch (error) {
      console.log("No data found")
    }
  };

  const addSocialLink = async (newPlatform,newLink) => {
    if (newLink.trim() === '' || newPlatform.trim() === '') return;
    try {
      const response = await socialService.addSocialAccount({ name: newPlatform, url: newLink, owner: userData?.user_id });
      if (response) {
        const updatedLinks = [...socialLinks, {...response}];
        setSocialLinks(updatedLinks);
       
        toast.success("Accounts Added Successfully!",{autoClose: 1000})

      }
    } catch (error) {
      toast.error(error?.message)
    }


  };
  const editSocialLink = async (index,pk,newPlatform,newLink) => {
    try {
      const response = await socialService.editSocialAccount({ name: newPlatform, url: newLink, owner: userData?.user_id },pk);
      if (response) {
        const updatedLinks = [...socialLinks];
        updatedLinks[index] = response
        setSocialLinks(updatedLinks);
       
      }
      toast.success("Accounts Updated Successfully!",{autoClose: 1000})
    } catch (error) {
      toast.error("Error!.Somting wrong happend!.")
    }


  };

  const removeSocialLink = async (index, pk) => {
    try {
      const response = await socialService.deleteSocialAccount(pk);
      const updatedLinks = [...socialLinks];
      updatedLinks.splice(index, 1);
      setSocialLinks(updatedLinks);
      toast.success("Accounts Deleted Successfully!",{autoClose: 1000})
    } catch (error) {
      toast.error("Error!.Somting wrong happend!.")
    }
  };
  const handleToggleSwitch = async () =>{
    try {
      const response = await socialService.enableDisableAccounts(userData?.profile_id);
      if (response) {       
        setIsLocked(!isLocked)
        toast.success(response?.message,{autoClose: 1000})
      }
    } catch (error) {
      toast.error("Error!.Somting wrong happend!.")
    }
   
  }

  return (

    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="profile-content">
            {socialLinks &&
              <ManageSocial
                socialLinks={socialLinks}
                isLocked={isLocked}
                handleToggleSwitch = {handleToggleSwitch}
                handleAddLink={addSocialLink}
                handleEditSocialLink = {editSocialLink}
                handleRemoveSocialLink={removeSocialLink}
              />}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SocialMediaManagement;
