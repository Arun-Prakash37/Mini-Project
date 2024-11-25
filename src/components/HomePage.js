// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col className="text-center">
          <h1>Welcome to Our Account Creation Platform</h1>
          <p>Please log in or sign up to access our courses.</p>
          <Button variant="primary" onClick={() => navigate('/login')} className="m-2">
            Login
          </Button>
          <Button variant="success" onClick={() => navigate('/signup')} className="m-2">
            Signup
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
