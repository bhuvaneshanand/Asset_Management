import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css'
import AboutImg from './images/image copy.png'
import { About } from './About';
import contact from './images/hardware.png'
import { ContactInfo } from './ContactInfo';

const LandingPage = () => {
  return (
    <div className='home-page'>
      <header className='h-90 min-vh-100 d-flex justify-content-center align-items-center text-light shadow'>
        <div className='row'>
          <div className='col-12 d-flex flex-column align-items-center text-center'>
            <h2 className='mb-0 text-black fw-bold'>Welcome to</h2>
            <h1 className='mb-3 text-black fw-bold'>ABessets</h1>
            <div className="d-flex align-items-center">
              <Link to="/login">
                <Button type='button' className='btn btn-primary btn-lg'>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div id='aboutSection' className='container my-5'>
        <div className='row'>
          <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
          <img src={AboutImg} className='img-fluid w-75' alt="about img"/>
          </div>
          <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
            <h2 className='fs-1 mb-5 text-uppercase fw-bold text-center'>About us</h2>
            <p>Welcome to ABessets, this is a product that we have developed to maintain your assets and to help organisation.<b>For you to get your Employee id contact the adminstrator through email. </b> </p>
            <p className='mb-5'>Transform the way you manage assets with our powerful, intuitive Asset Management System—track, optimize, and secure your assets effortlessly, all in real-time.</p>
            <Link to="/about">
              <Button type='button' className='btn btn-primary'>More About us</Button>
            </Link>

          </div>
        </div>
      </div>
      <div id='contactSection' className='bg-secondary text-light py-5 shadow'>
        <div className="container">
          <div className='row'>
            <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center mb-5 mb-lg-0'>
              <ContactInfo/>
            </div>
            <div className='col-lg-6 d-flex justify-content justify-content-center'>
              <img src={contact} className='img-fluid w-70'alt=''/>

            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default LandingPage;

