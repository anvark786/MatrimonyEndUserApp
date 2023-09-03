import React, { useEffect, useState } from 'react';
import BasicInfoSection from '../../components/profiles/ProfileDetails/BasicInfoSection';
import { toast } from 'react-toastify';
import profileUpdateService from '../../services/profileUpdateService';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import { Container, Row, Col } from 'react-bootstrap';
import ReligiousInfoSection from '../../components/profiles/ProfileDetails/ReligiousInfoSection';
import EducationInfoSection from '../../components/profiles/ProfileDetails/EducationInfoSection';
import OccupationInfoSection from '../../components/profiles/ProfileDetails/OccupationInfoSection';
import FamilyInfoSection from '../../components/profiles/ProfileDetails/FamilyInfoSection';
import PartnerPreferencesSection from '../../components/profiles/ProfileDetails/PartnerPreferencesSection';

const ProfileDetails = ({ match }) => {
    const [ProfileDetails, setProfileDetailse] = useState({});
    const { uuid } = useParams();

    useEffect(() => {
        getProfileDetails();
    }, [uuid]);
    const getProfileDetails = async () => {
        try {
            const response = await profileUpdateService.getProfileDetails(uuid);
            setProfileDetailse(response)
        } catch (error) {
            toast.error('Somthing went wrong')
        }
    };
    return (
       
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className="profile-content">
                        <div className="profile-detail">
                            <h3 className='mb-4'>Profile Details</h3>
                            <BasicInfoSection data={ProfileDetails} className="mb-2" />
                            <ReligiousInfoSection data={ProfileDetails?.religous_data} className="mb-2"  />
                            <EducationInfoSection data={ProfileDetails?.education} className="mb-2"  />
                            <OccupationInfoSection data={ProfileDetails?.occupation} className="mb-2"  />
                            <FamilyInfoSection data={ProfileDetails?.family_details} className="mb-2"  />
                            <PartnerPreferencesSection data={ProfileDetails?.parnter_preference} className="mb-2"/> 
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileDetails;
