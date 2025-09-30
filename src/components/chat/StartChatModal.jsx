import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import chatService from '../../services/chatService';
import { toast } from 'react-toastify';

const StartChatModal = ({ show, onHide, targetUser, targetProfile, onChatCreated }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setMessage('');
      setError('');
    }
  }, [show]);

  const handleStartChat = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message to start the conversation');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      console.log('Target User:', targetUser);
      console.log('Target Profile:', targetProfile);
      
      // Get user ID from various possible structures
      let userId = null;
      if (targetUser?.id) {
        userId = targetUser.id;
      } else if (targetProfile?.user?.id) {
        userId = targetProfile.user.id;
      } else if (targetProfile?.user_data?.id) {
        userId = targetProfile.user_data.id;
      } else if (targetProfile?.id) {
        // Fallback - use profile ID as user ID if that's how it's structured
        userId = targetProfile.user;
      }
      
      const chatData = {
        user_id: userId,
        profile_id: targetProfile?.id,
        initial_message: message.trim()
      };
      
      console.log('Chat Data:', chatData);
      
      if (!userId) {
        throw new Error('Unable to identify target user');
      }

      const response = await chatService.createOrGetChat(chatData);
      
      if (response) {
        toast.success('Chat started successfully!');
        onChatCreated(response);
        onHide();
      }
    } catch (error) {
      console.error('Failed to start chat:', error);
      setError(error.message || error.error || 'Failed to start chat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faComments} className="me-2" />
          Start Conversation
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleStartChat}>
        <Modal.Body>
          {targetProfile && (
            <div className="mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="user-avatar" style={{ width: '50px', height: '50px' }}>
                  {targetProfile.profile_photo ? (
                    <img 
                      src={targetProfile.profile_photo} 
                      alt={targetProfile.first_name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '50%' 
                      }}
                    />
                  ) : (
                    <div 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '50%', 
                        background: '#e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#6c757d'
                      }}
                    >
                      {targetProfile.first_name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h6 className="mb-0">{targetProfile.first_name} {targetProfile.last_name}</h6>
                  <small className="text-muted">Send your first message</small>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          
          <Form.Group>
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Hi! I'd like to connect with you..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              required
            />
            <Form.Text className="text-muted">
              {message.length}/500 characters
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Sending...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                Send Message
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StartChatModal;
