import React from 'react';
import '../../assets/styles/ProfileList.css';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../common/CommonFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faGraduationCap, 
  faBriefcase, 
  faHeart, 
  faUser,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const ProfileList = ({ profiles }) => {
    const dummyPhotoURL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
    
    const getAgeColor = (age) => {
        if (age < 25) return '#ff6b6b';
        if (age < 35) return '#4ecdc4';
        if (age < 45) return '#45b7d1';
        return '#96ceb4';
    };

    const getEducationColor = (education) => {
        const colors = {
            'bachelor': '#ff9ff3',
            'master': '#54a0ff',
            'phd': '#5f27cd',
            'diploma': '#00d2d3',
            'high school': '#ff9f43'
        };
        return colors[education?.toLowerCase()] || '#95a5a6';
    };

    return (
        <div className="profile-list-container">
            <div className="profile-list-grid">
                {profiles.map((profile, index) => (
                    <Link key={index} to={`/profile/details/${profile?.uuid}`} className="profile-card-modern">
                        <div className="profile-card-header">
                            <div className="profile-image-container">
                                <img 
                                    src={profile.profile_pic ? profile?.profile_pic?.image : dummyPhotoURL} 
                                    alt="Profile" 
                                    className="profile-image-modern"
                                />
                                <div className="profile-image-overlay">
                                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                                </div>
                                {profile.is_premium && (
                                    <div className="premium-badge-modern">
                                        <FontAwesomeIcon icon={faStar} />
                                        <span>Premium</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="profile-basic-info-modern">
                                <div className="profile-name-modern">
                                    {profile?.name}
                                    <span className="profile-id-modern">#{profile?.profile_id}</span>
                                </div>
                                
                                <div className="profile-age-modern" style={{ backgroundColor: getAgeColor(profile?.age) }}>
                                    {profile?.age} years
                                </div>
                                
                                {profile?.location && (
                                    <div className="profile-location-modern">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <span>{profile?.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="profile-card-body-modern">
                            {profile?.religion && (
                                <div className="profile-detail-modern">
                                    <div className="detail-icon-modern">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <div className="detail-content-modern">
                                        <span className="detail-label-modern">Religion</span>
                                        <span className="detail-value-modern">{profile?.religion}</span>
                                    </div>
                                </div>
                            )}
                            
                            {profile?.education && (
                                <div className="profile-detail-modern">
                                    <div className="detail-icon-modern" style={{ backgroundColor: getEducationColor(profile?.education) }}>
                                        <FontAwesomeIcon icon={faGraduationCap} />
                                    </div>
                                    <div className="detail-content-modern">
                                        <span className="detail-label-modern">Education</span>
                                        <span className="detail-value-modern">{capitalizeFirstLetter(profile?.education)}</span>
                                    </div>
                                </div>
                            )}
                            
                            {profile?.profession && (
                                <div className="profile-detail-modern">
                                    <div className="detail-icon-modern">
                                        <FontAwesomeIcon icon={faBriefcase} />
                                    </div>
                                    <div className="detail-content-modern">
                                        <span className="detail-label-modern">Profession</span>
                                        <span className="detail-value-modern">{profile?.profession}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="profile-card-footer-modern">
                            <div className="view-profile-btn-modern">
                                View Profile
                                <FontAwesomeIcon icon={faHeart} className="btn-heart-icon" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProfileList;
