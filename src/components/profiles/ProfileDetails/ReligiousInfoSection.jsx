import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col,Row } from 'react-bootstrap';

const ReligiousInfoSection = ({ data }) => {
    return (
        <div className="profile-section">
            <div className="profile-section-title text-start">
                <h2>
                    <FontAwesomeIcon icon={faHome} className="icon" />  Religious Information
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Religion </span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.religion}</span>
                    </div>                    
                </Col>
                <Col md={4}>                   
                    <div className="profile-field">
                        <span className="profile-field-label text-start">Sector</span>
                        <span className="profile-field-label text-center">:</span>
                        <span className="profile-field-value text-start text-muted">{data?.sector}</span>
                    </div>
                </Col>
                
            </Row>

        </div>
    );
};

export default ReligiousInfoSection;
