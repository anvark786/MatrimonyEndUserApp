import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ChatList from '../../components/chat/ChatList';
import ChatInterface from '../../components/chat/ChatInterface';
import chatService from '../../services/chatService';
import { toast } from 'react-toastify';
import './ChatPage.css';

const ChatPage = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set user online when entering chat
    if (userData) {
      chatService.setOnline().catch(console.error);
    }

    // Cleanup: Set user offline when leaving chat
    return () => {
      if (userData) {
        chatService.setOffline().catch(console.error);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, [userData]);

  useEffect(() => {
    // Check for chat room ID in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const chatRoomId = urlParams.get('room');
    
    if (chatRoomId) {
      loadChatRoom(chatRoomId);
    }
  }, []);

  const loadChatRoom = async (chatRoomId) => {
    try {
      const chatRoom = await chatService.getChatRoom(chatRoomId);
      setSelectedChatRoom(chatRoom);
      
      if (isMobile) {
        setShowMobileChat(true);
      }
    } catch (error) {
      toast.error('Failed to load chat room');
    }
  };

  const handleSelectChat = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
    
    if (isMobile) {
      setShowMobileChat(true);
    }
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?room=${chatRoom.id}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
    setSelectedChatRoom(null);
    
    // Remove room param from URL
    const newUrl = window.location.pathname;
    window.history.pushState(null, '', newUrl);
  };

  const handleChatCreated = (newChatRoom) => {
    setSelectedChatRoom(newChatRoom);
    
    if (isMobile) {
      setShowMobileChat(true);
    }
  };

  if (!userData || !userData.has_completed_signup) {
    return (
      <div>
        <Header />
        <Container className="py-5">
          <div className="text-center">
            <h3>Please complete your profile to access messages</h3>
            <p>You need to complete your profile setup before you can start chatting.</p>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="chat-page">
      <Header />
      
      <div className="chat-container">
        <Container fluid className="h-100">
          <Row className="h-100 no-gutters">
            {/* Chat List - Hidden on mobile when chat is open */}
            <Col 
              md={4} 
              lg={3} 
              className={`chat-list-column ${isMobile && showMobileChat ? 'd-none' : ''}`}
            >
              <ChatList
                onSelectChat={handleSelectChat}
                selectedChatId={selectedChatRoom?.id}
                currentUser={userData}
              />
            </Col>
            
            {/* Chat Interface - Hidden on mobile when no chat selected */}
            <Col 
              md={8} 
              lg={9} 
              className={`chat-interface-column ${isMobile && !showMobileChat ? 'd-none' : ''}`}
            >
              <ChatInterface
                selectedChatRoom={selectedChatRoom}
                currentUser={userData}
                onBackToList={handleBackToList}
              />
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
