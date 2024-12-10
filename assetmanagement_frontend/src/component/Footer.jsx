import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer custom-footer text-white text-center" style={{ backgroundColor: '#60a5fa' }}>
  <Container fluid>
    {/* Social Icons */}
    <Row className="social-icons mb-3">
      <Col>
        <Button variant="outline-light" className="m-1" href="https://www.linkedin.com/in/akshaya-velu-anitha24/">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </Button>
        <Button variant="outline-light" className="m-1" href="https://www.linkedin.com/in/bhuvanesh1903/">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </Button>
        <Button variant="outline-light" className="m-1" href="https://github.com/achu24">
          <FontAwesomeIcon icon={faGithub} />
        </Button>
        <Button variant="outline-light" className="m-1" href="https://github.com/bhuvaneshanand">
          <FontAwesomeIcon icon={faGithub} />
        </Button>
      </Col>
    </Row>

    {/* Footer Bottom */}
    <Row>
      <Col>
        <div className="footer-bottom">
          © 2024 Copyright Reserved by ABessets
        </div>
      </Col>
    </Row>
  </Container>
</footer>
  );
};

export default Footer;
