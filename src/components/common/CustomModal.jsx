import React from 'react';
import '../../assets/styles/Style.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomModal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h2>{title}</h2>
          <button className="custom-modal-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="custom-modal-body">
          {children}
        </div>
        {footer && <div className="custom-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default CustomModal;
