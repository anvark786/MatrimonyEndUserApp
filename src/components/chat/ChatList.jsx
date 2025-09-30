import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Badge, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faComments,
  faUser,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import chatService from '../../services/chatService';
import './ChatList.css';

const ChatList = ({ onSelectChat, selectedChatId, currentUser }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadChatRooms();
    // Set up periodic refresh for real-time updates
    const interval = setInterval(loadChatRooms, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterChats();
  }, [searchTerm, chatRooms]);

  const loadChatRooms = async () => {
    try {
      const response = await chatService.getChatRooms();
      setChatRooms(response.results || []);
      
      // Calculate total unread messages
      const totalUnread = (response.results || []).reduce((sum, chat) => sum + chat.unread_count, 0);
      setUnreadCount(totalUnread);
    } catch (error) {
      console.error('Failed to load chat rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterChats = () => {
    if (!searchTerm.trim()) {
      setFilteredChats(chatRooms);
      return;
    }

    const filtered = chatRooms.filter(chat => {
      const otherUser = chat.other_profile;
      const userName = `${otherUser?.first_name || ''} ${otherUser?.last_name || ''}`.toLowerCase();
      const lastMessage = chat.last_message?.content?.toLowerCase() || '';
      const search = searchTerm.toLowerCase();
      
      return userName.includes(search) || lastMessage.includes(search);
    });
    
    setFilteredChats(filtered);
  };

  const handleChatSelect = (chatRoom) => {
    onSelectChat(chatRoom);
    
    // Mark messages as read when chat is selected
    if (chatRoom.unread_count > 0) {
      chatService.markMessagesRead(chatRoom.id).then(() => {
        // Update local state to reflect read messages
        setChatRooms(prev => prev.map(chat => 
          chat.id === chatRoom.id ? { ...chat, unread_count: 0 } : chat
        ));
      });
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getLastMessagePreview = (lastMessage) => {
    if (!lastMessage) return 'No messages yet';
    
    switch (lastMessage.message_type) {
      case 'image':
        return '📷 Photo';
      case 'file':
        return '📁 File';
      default:
        return lastMessage.content.length > 50 
          ? lastMessage.content.substring(0, 50) + '...'
          : lastMessage.content;
    }
  };

  if (isLoading) {
    return (
      <div className="chat-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <div className="header-title">
          <FontAwesomeIcon icon={faComments} />
          <h5>Messages</h5>
          {unreadCount > 0 && (
            <Badge bg="danger" className="unread-badge">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <InputGroup className="search-input">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="chat-list-container">
        {filteredChats.length === 0 ? (
          <div className="no-chats">
            {searchTerm ? (
              <>
                <FontAwesomeIcon icon={faSearch} size="2x" />
                <p>No conversations found</p>
                <small>Try searching with different keywords</small>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faComments} size="2x" />
                <p>No conversations yet</p>
                <small>Start a conversation by visiting profiles</small>
              </>
            )}
          </div>
        ) : (
          <ListGroup variant="flush">
            {filteredChats.map((chatRoom) => {
              const otherUser = chatRoom.other_profile;
              const lastMessage = chatRoom.last_message;
              const isSelected = selectedChatId === chatRoom.id;
              const hasUnread = chatRoom.unread_count > 0;

              return (
                <ListGroup.Item
                  key={chatRoom.id}
                  className={`chat-item ${isSelected ? 'selected' : ''} ${hasUnread ? 'unread' : ''}`}
                  onClick={() => handleChatSelect(chatRoom)}
                  action
                >
                  <div className="chat-item-content">
                    <div className="user-avatar-container">
                      <div className="user-avatar">
                        {otherUser?.profile_photo ? (
                          <img src={otherUser.profile_photo} alt={otherUser.first_name} />
                        ) : (
                          <div className="avatar-placeholder">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                        )}
                      </div>
                      {chatRoom.is_online && (
                        <div className="online-indicator">
                          <FontAwesomeIcon icon={faCircle} />
                        </div>
                      )}
                    </div>

                    <div className="chat-details">
                      <div className="chat-header-row">
                        <h6 className="user-name">
                          {otherUser?.first_name} {otherUser?.last_name}
                        </h6>
                        <span className="chat-time">
                          {lastMessage ? formatTime(lastMessage.created_at) : formatTime(chatRoom.created_at)}
                        </span>
                      </div>
                      
                      <div className="chat-preview-row">
                        <p className="last-message">
                          {lastMessage && lastMessage.sender === currentUser.username && (
                            <span className="sent-indicator">You: </span>
                          )}
                          {getLastMessagePreview(lastMessage)}
                        </p>
                        
                        {hasUnread && (
                          <Badge bg="primary" className="unread-count">
                            {chatRoom.unread_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default ChatList;
