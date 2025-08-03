import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faMapMarkerAlt, 
  faGraduationCap, 
  faBriefcase,
  faUser,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  const {
    id,
    profile_uuid,
    first_name,
    last_name,
    age,
    gender,
    location,
    education,
    occupation,
    photos,
    is_premium = false
  } = profile;

  const mainPhoto = photos && photos.length > 0 ? photos[0] : null;

  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <div className="profile-image-container">
          {mainPhoto ? (
            <img 
              src={mainPhoto} 
              alt={`${first_name} ${last_name}`}
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
          {is_premium && (
            <div className="premium-badge">
              <FontAwesomeIcon icon={faStar} />
            </div>
          )}
        </div>
        
        <div className="profile-basic-info">
          <h3 className="profile-name">
            {first_name} {last_name}
            {age && <span className="profile-age">, {age}</span>}
          </h3>
          <p className="profile-gender">
            {gender === 'M' ? 'Male' : 'Female'}
          </p>
        </div>
      </div>

      <div className="profile-card-body">
        {location && (
          <div className="profile-detail">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
            <span>{location}</span>
          </div>
        )}
        
        {education && (
          <div className="profile-detail">
            <FontAwesomeIcon icon={faGraduationCap} className="detail-icon" />
            <span>{education}</span>
          </div>
        )}
        
        {occupation && (
          <div className="profile-detail">
            <FontAwesomeIcon icon={faBriefcase} className="detail-icon" />
            <span>{occupation}</span>
          </div>
        )}
      </div>

      <div className="profile-card-footer">
        <Link 
          to={`/profile/details/${profile_uuid}`} 
          className="view-profile-btn"
        >
          View Profile
        </Link>
        
        <button className="like-btn">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard; 