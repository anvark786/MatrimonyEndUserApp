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

// import ReligiousInfoSection from './ProfileSections/ReligiousInfoSection';
// import EducationInfoSection from './ProfileSections/EducationInfoSection';
// import PhysicalAttributesSection from './ProfileSections/PhysicalAttributesSection';
// import LocationInfoSection from './ProfileSections/LocationInfoSection';
// import FamilyDetailsSection from './ProfileSections/FamilyDetailsSection';
// import PartnerPreferencesSection from './ProfileSections/PartnerPreferencesSection';

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
            // Redirect or perform any other action after successful login
        } catch (error) {
            toast.error('Somthing went wrong')
        }
    };

    return (
        // <div>
        //     <Header />
        //     <div className="main-content">
        //         <Sidebar />
        //         <div className="profile-detail">
        //             <h1>Profile Details</h1>
        //             <BasicInfoSection data={ProfileDetails} />
        //             {/* <ReligiousInfoSection data={profileData.religiousInfo} />
        //             <EducationInfoSection data={profileData.educationInfo} />
        //             <PhysicalAttributesSection data={profileData.physicalAttributes} />
        //             <LocationInfoSection data={profileData.locationInfo} />
        //             <FamilyDetailsSection data={profileData.familyDetails} />
        //             <PartnerPreferencesSection data={profileData.partnerPreferences} /> */}
        //         </div>
        //     </div>
        // </div>


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


                            {/* <ReligiousInfoSection data={profileData.religiousInfo} />
            //             <EducationInfoSection data={profileData.educationInfo} />
            //             <PhysicalAttributesSection data={profileData.physicalAttributes} />
            //             <LocationInfoSection data={profileData.locationInfo} />
            //             <FamilyDetailsSection data={profileData.familyDetails} />
            //             <PartnerPreferencesSection data={profileData.partnerPreferences} /> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileDetails;
