import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { Col,Row } from 'react-bootstrap';

const BasicInfoSection = ({ data }) => {
    return (
        <div className="profile-section">
            <div className="profile-section-title text-start">
                <h2>
                    <FontAwesomeIcon icon={faPerson} className="icon" /> Basic Information
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Name</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.user_data?.first_name}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Age</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.age}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Gender</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.user_data?.gender=="M"?"Male":"Female"}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Profile ID</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.profile_id}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Height</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.height}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Weight</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.weight}</span>
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default BasicInfoSection;
