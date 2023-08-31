import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { Col,Row } from 'react-bootstrap';

const EducationInfoSection = ({ data }) => {
    
    return (
        <div className="profile-section">
            <div className="profile-section-title text-start">
                <h2>
                    <FontAwesomeIcon icon={faSchool} className="icon" /> Education Information
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Education </span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data[0]?.name.toUpperCase()}</span>
                    </div> 
                                     
                </Col>
                <Col md={4}>                   
                <div className="profile-field">
                        <span className="profile-field-label text-start">Institution </span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data[0]?.institution}</span>
                    </div>   
                </Col>
                <Col md={4}>                   
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Details</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data[0]?.details}</span>
                    </div>
                </Col>
                
            </Row>

        </div>
    );
};

export default EducationInfoSection;
