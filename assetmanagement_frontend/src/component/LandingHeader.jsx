import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Breadcrumb } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import logo from './images/logonew.png';
import { Link as ScrollLink } from 'react-scroll';
import Logout from './Logout';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';

export const LandingHeader = () => {
  const{auth}=useAuth();
  const username = auth?.username || 'Guest';
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <header>
    <Navbar style={{ backgroundColor: '#60a5fa' }} variant="light" expand="lg" className="py-2 custom-navbar">
      <Container fluid className="px-0">
        {/* Logo and Brand on the left */}
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="80"
            height="80"
            className="d-inline-block align-top"
            alt="AB logo"
          />{' '}
          <span className="brand-name">ABessets</span> {/* Custom font style */}
        </Navbar.Brand>
  
        {/* Links aligned to the right */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">
              <div className="d-none d-lg-flex">
                <ScrollLink to="aboutSection" 
                  smooth={true}
                  duration={500}
                  className="nav-link-custom text-white">
                  About
                </ScrollLink>
                &nbsp; &nbsp;
                <ScrollLink to="contactSection"
                  smooth={true}
                  duration={500}
                  className="nav-link-custom text-white">
                  Contact-Us
                </ScrollLink>
              </div>
              <NavDropdown title="Menu" id="mobile-nav-dropdown" className="d-lg-none">
                <NavDropdown.Item>
                  <ScrollLink
                    to="aboutSection"
                    smooth={true}
                    duration={500}
                    className="dropdown-item"
                  >
                    About
                  </ScrollLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <ScrollLink
                    to="contactSection"
                    smooth={true}
                    duration={500}
                    className="dropdown-item"
                  >
                    Contact-Us
                  </ScrollLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="d-flex align-items-center ms-auto gap-3">
            <Breadcrumb className="breadcrumb-custom m-0 align-items-center">
              <Breadcrumb.Item href="/" className={`breadcrumb-item-custom ${isActive('/') ? 'active' : ''}`}>Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/registration" className={`breadcrumb-item-custom ${isActive('/registration') ? 'active' : ''}`}>Registration</Breadcrumb.Item>
              <Breadcrumb.Item href = "/login" cclassName={`breadcrumb-item-custom ${isActive('/login') ? 'active' : ''}`}>Login</Breadcrumb.Item>
            </Breadcrumb>
            <Nav className="ms-auto d-flex align-items-center">
            {/* Logout Button aligned to the left */}
            <NavDropdown 
              title={<FaUserCircle size={40} />} 
              id="navbarScrollingDropdown"
              align="end"
              className="user-dropdown"
            >
              {auth ? (
                  <>
                    <NavDropdown.Item as={Link} to={`/myprofile/${username}`}>My Profile</NavDropdown.Item>
                    <NavDropdown.Item><Logout /></NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                )}

            </NavDropdown>
          </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  
  );
};

