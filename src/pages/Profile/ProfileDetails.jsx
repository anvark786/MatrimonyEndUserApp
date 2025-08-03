import React, { useEffect, useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import PhotoAlbum from "react-photo-album";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BasicInfoSection from '../../components/profiles/ProfileDetails/BasicInfoSection';
import { toast } from 'react-toastify';
import profileUpdateService from '../../services/profileUpdateService';
import socialService from '../../services/socialService';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import ReligiousInfoSection from '../../components/profiles/ProfileDetails/ReligiousInfoSection';
import EducationInfoSection from '../../components/profiles/ProfileDetails/EducationInfoSection';
import OccupationInfoSection from '../../components/profiles/ProfileDetails/OccupationInfoSection';
import FamilyInfoSection from '../../components/profiles/ProfileDetails/FamilyInfoSection';
import PartnerPreferencesSection from '../../components/profiles/ProfileDetails/PartnerPreferencesSection';
import SocialAccounts from '../../components/profiles/ProfileDetails/SocialAccounts';
import { Container, Row, Col } from 'react-bootstrap';

const ProfileDetails = ({ match }) => {
    const [profileDetails, setProfileDetails] = useState({});
    const [photos, setPhotos] = useState([]);
    const { uuid } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [hasSubmittedRequest, setHasSubmittedRequest] = useState(false);
    const [submittedRequest, setSubmittedRequest] = useState({});
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        getProfileDetails();
        checkPendingSocialRequests();
        // eslint-disable-next-line
    }, [uuid]);

    const getProfileDetails = async () => {
        try {
            const response = await profileUpdateService.getProfileDetails(uuid);
            console.log("resssssss", response);
            setProfileDetails(response);
            setPhotos(response?.photos);
        } catch (error) {
            toast.error(error?.error);
        }
    };

    const checkPendingSocialRequests = async () => {
        try {
            const response = await socialService.checkSocialRequest(uuid);
            setSubmittedRequest(response);
            if (response?.id) {
                setHasSubmittedRequest(true);
            }
        } catch (error) {
            toast.error(error?.error);
        }
    };

    const handleSubmitAccessRequest = async () => {
        try {
            const formData = new FormData();
            formData.append("requester", userData.profile_id);
            formData.append("profile_owner", profileDetails?.id);

            const response = await socialService.sendSocialRequest(formData);
            if (response) {
                setHasSubmittedRequest(true);
                toast.success("Request was submitted successfully");
            }
        } catch (error) {
            toast.error(error?.error);
        }
    };

    // Transform photos for gallery format
    const galleryPhotos = photos?.map((photo, index) => ({
        src: photo.image,
        width: 800,
        height: 600,
        images: [
            { src: photo.image, width: 800, height: 600 },
            { src: photo.image, width: 400, height: 300 },
        ],
    }));

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={8} className="px-4 py-3">
                        <h3 className='mb-4' style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: '700' }}>
                            Profile Details
                        </h3>

                        {/* Photo Gallery */}
                        {photos && photos.length > 0 && (
                            <div className="profile-section mb-4">
                                <div className="profile-section-title mb-3">
                                    <i className="fas fa-images" style={{ color: 'var(--primary-color)' }}></i>
                                    <span>Photos</span>
                                </div>
                                <div style={{ 
                                    padding: '20px',
                                    background: '#ffffff',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <PhotoAlbum
                                        layout="rows"
                                        photos={galleryPhotos}
                                        targetRowHeight={200}
                                        onClick={({ index }) => setIndex(index)}
                                        renderPhoto={({ photo, wrapperStyle, imageProps }) => (
                                            <div style={{ ...wrapperStyle, position: 'relative' }}>
                                                <img
                                                    {...imageProps}
                                                    style={{
                                                        ...imageProps.style,
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.02)'
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                    
                                    <Lightbox
                                        slides={galleryPhotos}
                                        open={index >= 0}
                                        index={index}
                                        close={() => setIndex(-1)}
                                        plugins={[Thumbnails, Zoom]}
                                        thumbnails={{
                                            position: "bottom",
                                            width: 120,
                                            height: 80,
                                            border: 2,
                                            borderRadius: 4,
                                            padding: 4,
                                        }}
                                        zoom={{
                                            maxZoomPixelRatio: 3,
                                            scrollToZoom: true,
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Profile Sections */}
                        <div className="profile-sections-container">
                            <BasicInfoSection data={profileDetails} className="mb-2" />
                            <ReligiousInfoSection data={profileDetails?.religous_data} className="mb-2" />
                            <EducationInfoSection data={profileDetails?.education} className="mb-2" />
                            <OccupationInfoSection data={profileDetails?.occupation} className="mb-2" />
                            <FamilyInfoSection data={profileDetails?.family_details} className="mb-2" />
                            <PartnerPreferencesSection data={profileDetails?.partner_preference} className="mb-2" />
                            {profileDetails?.social_links && (
                                <SocialAccounts
                                    data={profileDetails?.social_links}
                                    is_Locked={profileDetails?.is_locked_social_accounts}
                                    hasSubmittedRequest={hasSubmittedRequest}
                                    submittedRequest={submittedRequest}
                                    handleSubmit={handleSubmitAccessRequest}
                                    className=""
                                />
                            )}
                        </div>
                    </Col>
                    <Col md={3} className="ms-auto" style={{ backgroundColor: "#f4f4f4" }}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileDetails;
