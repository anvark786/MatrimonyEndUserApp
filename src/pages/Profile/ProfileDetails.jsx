import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    const [photos, setPhotos] = useState([]);
    const { uuid } = useParams();

    useEffect(() => {
        getProfileDetails();
    }, [uuid]);

    const getProfileDetails = async () => {
        try {
            const response = await profileUpdateService.getProfileDetails(uuid);
            setProfileDetailse(response);
            setPhotos(response?.photos)
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    // Configuration for the photo slider
      const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,
        arrows: true,
        
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
                        <h3 className='mb-4'>Profile Details</h3>
                        <Row className='mb-4'>
                            <Col md={12}>
                                <Slider {...sliderSettings} className="center-slider">
                                    {photos && photos.map((item,ind) => {
                                        return (
                                            <div key={ind}>
                                                <img src={item?.image} alt={`Photo of ${ind}`}/>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </Col>
                        </Row>
                        <div className="profile-detail">

                            <BasicInfoSection data={ProfileDetails} className="mb-2" />
                            <ReligiousInfoSection data={ProfileDetails?.religous_data} className="mb-2" />
                            <EducationInfoSection data={ProfileDetails?.education} className="mb-2" />
                            <OccupationInfoSection data={ProfileDetails?.occupation} className="mb-2" />
                            <FamilyInfoSection data={ProfileDetails?.family_details} className="mb-2" />
                            <PartnerPreferencesSection data={ProfileDetails?.parnter_preference} className="mb-2" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileDetails;
