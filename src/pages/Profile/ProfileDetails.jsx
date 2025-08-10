import React, { useEffect, useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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
import ProfileDetailsSkeleton from '../../components/profiles/ProfileDetails/ProfileDetailsSkeleton';

const ProfileDetails = ({ match }) => {
    const [profileDetails, setProfileDetails] = useState({});
    const [photos, setPhotos] = useState([]);
    const { uuid } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [hasSubmittedRequest, setHasSubmittedRequest] = useState(false);
    const [submittedRequest, setSubmittedRequest] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProfileDetails();
        checkPendingSocialRequests();
        // eslint-disable-next-line
    }, [uuid]);

    const getProfileDetails = async () => {
        try {
            setIsLoading(true);
            const response = await profileUpdateService.getProfileDetails(uuid);
            setProfileDetails(response);
            setPhotos(response?.photos);
        } catch (error) {
            toast.error(error?.error);
        } finally {
            setIsLoading(false);
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

    // Slider settings for compact horizontal gallery
    const sliderSettings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 1 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    const lightboxSlides = (photos || []).map(p => ({ src: p?.image }));

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={8} className="px-4 py-3">
                        <h3 className='mb-4' style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: '700' }}>
                            Profile Details
                        </h3>

                        {isLoading ? (
                            <ProfileDetailsSkeleton />
                        ) : (
                            <>
                                {/* Photo Gallery - Compact Horizontal Carousel with Lightbox */}
                                {photos && photos.length > 0 && (
                                    <div className="profile-section mb-4">
                                        <div className="profile-section-title mb-3">
                                            <i className="fas fa-images" style={{ color: 'var(--primary-color)' }}></i>
                                            <span>Photos</span>
                                        </div>
                                        <div style={{ padding: '10px 6px' }}>
                                            <Slider {...sliderSettings} className="profile-photos-slider">
                                                {photos.map((photo, idx) => (
                                                    <div key={idx} className="slider-item">
                                                        <img
                                                            src={photo?.image}
                                                            alt={`Photo ${idx + 1}`}
                                                            className="slider-image"
                                                            onClick={() => { setCurrentSlide(idx); setIsLightboxOpen(true); }}
                                                            style={{ cursor: 'zoom-in' }}
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>

                                        <Lightbox
                                            open={isLightboxOpen}
                                            close={() => setIsLightboxOpen(false)}
                                            index={currentSlide}
                                            slides={lightboxSlides}
                                            plugins={[Thumbnails, Zoom]}
                                            thumbnails={{ position: 'bottom' }}
                                            zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
                                        />
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
                            </>
                        )}
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
