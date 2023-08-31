import React from 'react';
import { Modal, Alert,Button } from 'react-bootstrap';

const AlertModal = ({ show, handleClose, type, message }) => {
  console.log("heloooooooooooo");
  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'success' ? 'Success' : 'Error'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant={type} className="mb-0">
          {message}
        </Alert>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onOkay}>
          Okay
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AlertModal;
