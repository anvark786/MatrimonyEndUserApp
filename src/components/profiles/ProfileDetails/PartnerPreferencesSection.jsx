import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClover } from '@fortawesome/free-solid-svg-icons';
import { Col,Row } from 'react-bootstrap';

const PartnerPreferencesSection = ({ data }) => {
    return (
        <div className="profile-section">
            <div className="profile-section-title text-start">
                <h2>
                    <FontAwesomeIcon icon={faClover} className="icon" /> Partner Preferences
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Age Limit</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.age_min}-{data?.age_max}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Preferred District</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.preferred_district}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Preferred Location</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.location}</span>
                    </div>
                 
                </Col>
                
            </Row>

        </div>
    );
};

export default PartnerPreferencesSection;
