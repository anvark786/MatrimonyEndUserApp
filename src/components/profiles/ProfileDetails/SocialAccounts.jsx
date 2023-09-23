import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faLock, faUnlock, faCheckCircle,faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Import the locked and unlock icons
import { Button, Col, Row } from 'react-bootstrap';
import { getPlatformIcon } from '../../common/CommonFunctions';

const SocialAccounts = ({ data, is_Locked, hasSubmittedRequest, submittedRequest, handleSubmit }) => {
  console.log("submittedRequest?.status",submittedRequest?.status)
  return (
    <div className="profile-section">
      <div className="profile-section-title">
        <h2>
          <FontAwesomeIcon icon={faNetworkWired} className="icon" /> Social Accounts
        </h2>
      </div>
      <Row>
        {data.length > 0 ?
          data.map((social, index) => (
            <Col md={2} key={index}>
              <>
                {(!is_Locked || data.length > 0) && (
                  <>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {getPlatformIcon(social?.name)}
                    </a>
                    <p className="profile-field-value fz-13">{social.name}</p>
                  </>
                )}
              </>
            </Col>
          )) : (
            <>
              <div className="locked-account col-md-6 mx-auto">
                <FontAwesomeIcon icon={faLock} className="locked-icon" />
                <p className="profile-field-value fz-13">Social Accounts Locked</p>
              </div>
              <div className="col-md-6">
                {hasSubmittedRequest ? (
                  <div className="d-flex align-items-center">
                    {submittedRequest?.status === 'declined' ? (
                      <FontAwesomeIcon icon={faTimesCircle} className="text-danger me-2" />
                    ) : (
                      <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                    )}
                    {submittedRequest?.status === 'declined' ? 'Access Request Rejected' : 'Access Request Submitted'}
                  </div>
                ) : (
                  <Button variant="success" onClick={() => handleSubmit()}>
                    <FontAwesomeIcon icon={faUnlock} /> Send Access Request
                  </Button>
                )}
              </div>
            </>


          )}
      </Row>

    </div>
  );
};

export default SocialAccounts;
