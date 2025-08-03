import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

const BasicInfoSection = ({ data }) => {
    return (
        <div className="profile-section">
            <div className="profile-section-title">
                <FontAwesomeIcon icon={faPerson} className="icon" /> 
                <span>Basic Information</span>
            </div>
            <div className="profile-info-grid">
                <div className="profile-info-item">
                    <span className="profile-field-label">Name</span>
                    <span className="profile-field-value">{data?.user_data?.first_name+" "+data?.user_data?.last_name}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-field-label">Age</span>
                    <span className="profile-field-value">{data?.age}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-field-label">Gender</span>
                    <span className="profile-field-value">{data?.user_data?.gender=="M"?"Male":"Female"}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-field-label">Profile ID</span>
                    <span className="profile-field-value">{data?.profile_id}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-field-label">Height</span>
                    <span className="profile-field-value">{data?.height}</span>
                </div>
                <div className="profile-info-item">
                    <span className="profile-field-label">Weight</span>
                    <span className="profile-field-value">{data?.weight}</span>
                </div>
            </div>
        </div>
    );
};

export default BasicInfoSection;
