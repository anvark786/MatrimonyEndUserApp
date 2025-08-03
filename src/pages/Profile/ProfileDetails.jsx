import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

const ProfileDetails = ({ match }) => {
    const [ProfileDetails, setProfileDetails] = useState({});
    const [photos, setPhotos] = useState([]);
    const { uuid } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [hasSubmittedRequest,setHasSubmittedRequest] = useState(false)
    const [submittedRequest,setSubmittedRequest] = useState({})

    useEffect(() => {
        getProfileDetails();
        checkPendingSocialRequests();
    }, [uuid]);

    const getProfileDetails = async () => {
        try {
            const response = await profileUpdateService.getProfileDetails(uuid);
            console.log("resssssss", response);
            setProfileDetails(response);
            setPhotos(response?.photos)
        } catch (error) {
            toast.error(error?.error);
        }
    };
    const checkPendingSocialRequests = async () => {
        try {
            const response = await socialService.checkSocialRequest(uuid);
            
            setSubmittedRequest(response)
            if(response?.id){
                setHasSubmittedRequest(true)
            }
        } catch (error) {
            toast.error(error?.error);
        }
    };
    
    const handleSubmitAccessRequest = async ()=>{
        try {
            const formData = new FormData();
            formData.append("requester",userData.profile_id)
            formData.append("profile_owner",ProfileDetails?.id)

            const response = await socialService.sendSocialRequest(formData);
            if(response){     
                setHasSubmittedRequest(true)           
                toast.success("Request was submitted successfully");
              }
        } catch (error) {
            toast.error(error?.error);
        }
    }

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
        <>
            <Header />
            <div className="profile-page-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* Sidebar: always left, unique */}
                <div 
                    className="profile-sidebar"
                    style={{
                        minWidth: '250px',
                        display: 'block',
                        borderRight: '1px solid #eee',
                        height: '100%',
                        background: '#fff'
                    }}
                >
                    <Sidebar />
                </div>
                {/* Main Content */}
                <div className="profile-main-content" style={{ flex: 1, paddingLeft: '32px' }}>
                    <div className="profile-content">
                        <h3 className='mb-4' style={{color: 'var(--text-primary)', fontSize: '2rem', fontWeight: '700', marginBottom: '2rem'}}>
                            Profile Details
                        </h3>
                        
                        {/* Photo Slider */}
                        {photos && photos.length > 0 && (
                            <div className="profile-section" style={{ marginBottom: '2rem' }}>
                                <div className="profile-section-title">
                                    <i className="fas fa-images" style={{color: 'var(--primary-color)'}}></i>
                                    <span>Photos</span>
                                </div>
                                <Slider {...sliderSettings} className="center-slider">
                                    {photos.map((item, ind) => (
                                        <div key={ind}>
                                            <img 
                                                src={item?.image} 
                                                alt={`Photo of ${ind}`} 
                                                style={{
                                                    width: '100%', 
                                                    height: '300px', 
                                                    objectFit: 'cover', 
                                                    borderRadius: '12px',
                                                    boxShadow: 'var(--shadow-md)'
                                                }} 
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                        
                        {/* Profile Sections - visually separated */}
                        <div className="profile-sections-container">
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                <BasicInfoSection data={ProfileDetails} className="mb-2" />
                            </div>
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                <ReligiousInfoSection data={ProfileDetails?.religous_data} className="mb-2" />
                            </div>
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                <EducationInfoSection data={ProfileDetails?.education} className="mb-2" />
                            </div>
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                <OccupationInfoSection data={ProfileDetails?.occupation} className="mb-2" />
                            </div>
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                <FamilyInfoSection data={ProfileDetails?.family_details} className="mb-2" />
                            </div>
                            <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                <PartnerPreferencesSection data={ProfileDetails?.partner_preference} className="mb-2" />
                            </div>
                            {ProfileDetails?.social_links && (
                                <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                    <SocialAccounts 
                                        data={ProfileDetails?.social_links} 
                                        is_Locked={ProfileDetails?.is_locked_social_accounts} 
                                        hasSubmittedRequest={hasSubmittedRequest} 
                                        submittedRequest={submittedRequest} 
                                        handleSubmit={handleSubmitAccessRequest} 
                                        className="" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media (max-width: 768px) {
                        .profile-sidebar {
                            display: none !important;
                        }
                        .profile-main-content {
                            padding-left: 0 !important;
                        }
                    }
                `}
            </style>
        </>
    );
}

export default ProfileDetails;
