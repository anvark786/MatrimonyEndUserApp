import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'; // Import the locked and unlock icons
import { Button, Col, Row } from 'react-bootstrap';
import { getPlatformIcon } from '../../common/CommonFunctions';

const SocialAccounts = ({ data,is_Locked}) => {

  console.log("is_Locked",is_Locked);

  return (
    <div className="profile-section">
      <div className="profile-section-title">
        <h2>
          <FontAwesomeIcon icon={faNetworkWired} className="icon" /> Social Accounts
        </h2>
      </div>
      <Row>
        {data &&
          data.map((social, index) => (
            <Col md={2} key={index}>
              <>
                {!is_Locked ? ( 
                  <>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {getPlatformIcon(social?.name)}
                    </a>
                    <p className="profile-field-value fz-13">{social.name}</p>
                  </>
                ) : (
                  <div className="locked-account">
                    <FontAwesomeIcon icon={faLock} className="locked-icon" />
                    <p className="profile-field-value fz-13">Locked</p>
                  </div>
                )}
              </>
            </Col>
          ))}
      </Row>
      {is_Locked && (
        <Button variant="success" >
          <FontAwesomeIcon icon={faUnlock} /> Send Access Request
        </Button>
      )}
    </div>
  );
};

export default SocialAccounts;
