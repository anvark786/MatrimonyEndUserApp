import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank } from '@fortawesome/free-solid-svg-icons';
import { Col,Row } from 'react-bootstrap';

const OccupationInfoSection = ({ data }) => {
    return (
        <div className="profile-section">
            <div className="profile-section-title text-start">
                <h2>
                    <FontAwesomeIcon icon={faBank} className="icon" /> Occupation Details
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Profession</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.profession}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Company Name</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.company_name}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Job Details</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.job_details}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Profession Type</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.profession_type}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Annual Income</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.annual_income}</span>
                    </div>                   
                </Col>
            </Row>

        </div>
    );
};

export default OccupationInfoSection;
