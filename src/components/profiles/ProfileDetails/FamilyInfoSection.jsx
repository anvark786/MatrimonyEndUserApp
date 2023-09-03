import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faU, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';

const FamilyInfoSection = ({ data }) => {
    return (
        <div className="profile-section">
            <div className="profile-section-title text-start">
                <h2>
                    <FontAwesomeIcon icon={faUsers} className="icon" />  Family Information
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Financial Status </span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.financial_status}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Father Occupation</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.father_occupation}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Mother Occupation </span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.mother_occupation}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">No of elder brothers</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.no_of_elder_bro}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">No of younger brothers</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.no_of_younger_bro}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">No of married brothers</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.no_of_married_bro}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">No of elder sisters </span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.no_of_elder_sis}</span>
                    </div>

                </Col>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">No of younger sisters</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.no_of_younger_sis}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">No of married sisters</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.no_of_married_sis}</span>
                    </div>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">More Details</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.more_details}</span>
                    </div>
                </Col>

            </Row>

        </div>
    );
};

export default FamilyInfoSection;
