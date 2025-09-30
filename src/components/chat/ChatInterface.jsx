import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faSmile,
  faPaperclip,
  faImage,
  faEllipsisV,
  faSearch,
  faPhoneAlt,
  faVideoCamera,
  faInfoCircle,
  faReply,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import chatService from '../../services/chatService';
import webSocketService from '../../services/webSocketServiceWithHandshake';

import { toast } from 'react-toastify';
import './ChatInterface.css';

const ChatInterface = ({ selectedChatRoom, currentUser, onBackToList }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);


  const [wsConnected, setWsConnected] = useState(false);

    useEffect(() => {
      if (!selectedChatRoom || !currentUser) return;
      let offMessage, offTyping;
      let isMounted = true;
      (async () => {
        try {
          console.log("[FE] WebSocket connect succeeded, readyState:", webSocketService.socket?.readyState);
          await webSocketService.connectToChat(selectedChatRoom.id);
          setWsConnected(true);
        } catch (e) {
          console.error("[FE] WebSocket connect failed:", e);
          setWsConnected(false);
        }
        if (!isMounted) return;
        offMessage = webSocketService.onMessage((msg) => {
          console.log("[FE] onMessage callback, msg:", msg);
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) {
              console.log("[FE] Duplicate, ignoring msg.id:", msg.id);
              return prev;
            }
            return [...prev, msg];
          });
        });
        offTyping = webSocketService.onTyping((data) => {
          if (
            data &&
            typeof data.is_typing === 'boolean' &&
            data.user_id &&
            currentUser &&
            data.user_id !== currentUser.user_id &&
            data.is_typing
          ) {
            setIsTyping(true);
          } else {
            setIsTyping(false);
          }
        });
      })();
      return () => {
        isMounted = false;
        if (offMessage) offMessage();
        if (offTyping) offTyping();
        webSocketService.disconnectFromChat();
      };
    }, [selectedChatRoom, currentUser]);

  useEffect(() => {
  if (selectedChatRoom && currentUser) {
    loadMessages();
    markMessagesAsRead();
  }
}, [selectedChatRoom, currentUser]);


  const loadMessages = async (pageNum = 1) => {
    if (!selectedChatRoom) return;
    try {
      setIsLoading(true);
      const response = await chatService.getChatMessages(selectedChatRoom.id, pageNum);
      if (pageNum === 1) {
        // Ensure messages are sorted oldest to newest
        const sorted = (response.results || []).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setMessages(sorted);
      } else {
        // For pagination, prepend older messages
        setMessages(prev => [...response.results, ...prev]);
      }
      setHasMore(response.next !== null);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const markMessagesAsRead = async () => {
    if (!selectedChatRoom) return;

    try {
      await chatService.markMessagesRead(selectedChatRoom.id);
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  // Removed scrollToBottom functionality

  const handleSendMessage = async (e) => {
    console.log("[FE] handleSendMessage called, newMessage:", newMessage, "selectedFile:", selectedFile);
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;
    try {
      const isTextOnly = !selectedFile;
      if (isTextOnly) {
        if (wsConnected) {
          webSocketService.sendMessage(newMessage.trim(), replyTo?.id || null);
        } else {
          // Fallback to REST
          const payload = { content: newMessage.trim(), message_type: 'text' };
          if (replyTo) payload.reply_to = replyTo.id;
          const response = await chatService.sendMessage(selectedChatRoom.id, payload);
          setMessages(prev => [response, ...prev]);
        }
        setNewMessage('');
        setReplyTo(null);
      } else {
        // For images/files, fall back to REST; backend will broadcast over WS
        const formData = new FormData();
        formData.append('message_type', selectedFile.type.startsWith('image/') ? 'image' : 'file');
        if (replyTo) formData.append('reply_to', replyTo.id);
        if (selectedFile.type.startsWith('image/')) {
          formData.append('image_attachment', selectedFile);
        } else {
          formData.append('file_attachment', selectedFile);
        }
        await chatService.sendMessage(selectedChatRoom.id, formData);
        setSelectedFile(null);
        setFilePreview(null);
        setReplyTo(null);
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await chatService.deleteMessage(messageId);
      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, is_deleted: true, content: 'This message was deleted' } : msg
      ));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages) => {
    // Ensure messages are sorted oldest to newest before grouping
    const sorted = [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const grouped = {};
    sorted.forEach(message => {
      const date = new Date(message.created_at).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    return grouped;
  };

  const renderMessage = (message) => {
    console.log("[FE] renderMessage for msg:", message);

    const isCurrentUser = message.sender.id === currentUser.user_id;
    const messageTime = formatTime(message.created_at);

    return (
      <div
        key={message.id}
        className={`message-wrapper ${isCurrentUser ? 'sent' : 'received'}`}
      >
        <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
          {message.reply_to_message && (
            <div className="reply-preview">
              <div className="reply-line"></div>
              <div className="reply-content">
                <small className="reply-sender">{message.reply_to_message.sender}</small>
                <div className="reply-text">{message.reply_to_message.content}</div>
              </div>
            </div>
          )}

          <div className="message-content">
            {message.message_type === 'image' && message.image_url && (
              <div className="message-image">
                <img src={message.image_url} alt="Shared" />
              </div>
            )}

            {message.message_type === 'file' && message.file_url && (
              <div className="message-file">
                <FontAwesomeIcon icon={faPaperclip} />
                <a href={message.file_url} target="_blank" rel="noopener noreferrer">
                  {message.file_attachment?.split('/').pop() || 'Download File'}
                </a>
              </div>
            )}

            {message.content && !message.is_deleted && (
              <div className="message-text">{message.content}</div>
            )}

            {message.is_deleted && (
              <div className="message-text deleted">This message was deleted</div>
            )}
          </div>

          <div className="message-footer">
            <span className="message-time">{messageTime}</span>
            {isCurrentUser && (
              <div className="message-status">
                {message.is_read ? '✓✓' : '✓'}
              </div>
            )}
          </div>

          <Dropdown className="message-actions">
            <Dropdown.Toggle variant="link" className="message-menu">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleReply(message)}>
                <FontAwesomeIcon icon={faReply} /> Reply
              </Dropdown.Item>
              {isCurrentUser && !message.is_deleted && (
                <Dropdown.Item onClick={() => handleDeleteMessage(message.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  };

  if (!selectedChatRoom) {
    return (
      <div className="chat-placeholder">
        <FontAwesomeIcon icon={faInfoCircle} size="3x" />
        <h4>Select a conversation to start chatting</h4>
      </div>
    );
  }

  const otherUser = selectedChatRoom.other_profile;
  const groupedMessages = groupMessagesByDate(messages);

  console.log("Rendering ChatInterface, messages:", messages);

  return (
    <div className="chat-interface">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-user-info">
          <Button
            variant="link"
            className="back-button d-md-none"
            onClick={onBackToList}
          >
            ←
          </Button>
          <div className="user-avatar">
            {otherUser?.profile_photo ? (
              <img src={otherUser.profile_photo} alt={otherUser.first_name} />
            ) : (
              <div className="avatar-placeholder">
                {otherUser?.first_name?.charAt(0)}
              </div>
            )}
          </div>
          <div className="user-details">
            <h6>{otherUser?.first_name} {otherUser?.last_name}</h6>
            <span className={`user-status ${selectedChatRoom.is_online ? 'online' : 'offline'}`}>
              {selectedChatRoom.is_online ? 'Online' : 'Last seen recently'}
            </span>
          </div>
        </div>

        <div className="chat-actions">
          <Button variant="link">
            <FontAwesomeIcon icon={faPhoneAlt} />
          </Button>
          <Button variant="link">
            <FontAwesomeIcon icon={faVideoCamera} />
          </Button>
          <Button variant="link">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container" ref={messagesContainerRef}>
        {isLoading && page === 1 && (
          <div className="loading-spinner">Loading messages...</div>
        )}

        {Object.entries(groupedMessages).map(([date, dateMessages]) => {
          return (
            <div key={date}>
              <div className="date-separator">
                <span>{formatDate(date)}</span>
              </div>
              {dateMessages.map(renderMessage)}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator for other user - now just above input */}
      {isTyping && (
        <div className="typing-indicator beautiful-typing-indicator">
          <span className="typing-avatar">
            {otherUser?.profile_photo ? (
              <img src={otherUser.profile_photo} alt={otherUser.first_name} />
            ) : (
              <span className="avatar-placeholder">{otherUser?.first_name?.charAt(0) || 'U'}</span>
            )}
          </span>
          <span className="typing-text">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
            <span className="typing-name">{otherUser?.first_name || 'User'} is typing</span>
          </span>
        </div>
      )}

      {/* Message Input */}
      <div className="message-input-container">
        {replyTo && (
          <div className="reply-preview-bar">
            <div className="reply-info">
              <small>Replying to {replyTo.sender.username}</small>
              <div>{replyTo.content}</div>
            </div>
            <Button
              variant="link"
              size="sm"
              onClick={() => setReplyTo(null)}
            >
              ×
            </Button>
          </div>
        )}

        {filePreview && (
          <div className="file-preview">
            <img src={filePreview} alt="Preview" />
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setSelectedFile(null);
                setFilePreview(null);
              }}
            >
              ×
            </Button>
          </div>
        )}

        <Form onSubmit={handleSendMessage} className="message-form">
          <div className="input-group">
            <div className="attachment-buttons">
              <Button
                variant="link"
                onClick={() => fileInputRef.current?.click()}
                title="Attach file"
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </Button>
              <Button
                variant="link"
                onClick={() => imageInputRef.current?.click()}
                title="Attach image"
              >
                <FontAwesomeIcon icon={faImage} />
              </Button>
            </div>

            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                try { webSocketService.sendTyping(true); } catch { }
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = setTimeout(() => {
                  try { webSocketService.sendTyping(false); } catch { }
                }, 1000);
              }}
              className="message-input"
            />

            <Button type="submit" variant="primary" className="send-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </Form>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.zip"
        />
        <input
          ref={imageInputRef}
          type="file"
          hidden
          onChange={handleFileSelect}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ChatInterface;
