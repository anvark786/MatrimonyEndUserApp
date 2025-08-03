import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../assets/styles/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="homepage-hero">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="hero-text">
              <h1>Find Your Perfect Match</h1>
              <p>
                Welcome to Shaddikarro! Discover genuine profiles, connect with like-minded people, and start your journey to a happy marriage.
              </p>
              <Link to="/register">
                <Button variant="primary" size="lg" className="hero-btn">
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col md={6} className="hero-image">
              <img src="/logo512.png" alt="Matrimony" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="features-section">
        <h2 className="text-center mb-5">Why Choose Us?</h2>
        <Row>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <Card.Title>Verified Profiles</Card.Title>
                <Card.Text>
                  Every profile is manually verified for authenticity and safety.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <Card.Title>Advanced Search</Card.Title>
                <Card.Text>
                  Find matches based on your preferences with powerful filters.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <Card.Title>Privacy First</Card.Title>
                <Card.Text>
                  Your data is secure and you control who sees your profile.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="cta-section text-center py-5">
        <h3>Ready to begin your journey?</h3>
        <Link to="/register">
          <Button variant="success" size="lg">Join Now</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;