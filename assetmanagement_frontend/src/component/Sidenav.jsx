import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidenav.css';
import { Link } from 'react-router-dom';

export const Sidenav = () => {
  return (
    <div className="sideNav">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto col-md-2 min-vh-100 d-flex flex-column align-items-center">
            {/* Centered Admin Header */}
            <h2 className="text-white my-4">Admin</h2>
            
            {/* Navigation Items */}
            <ul className="nav nav-pills flex-column w-100">
              <li className="nav-item">
              <Link to="/assets" className="nav-link text-white fs-5 d-flex align-items-center"> 
                  <i className="bi bi-cart-plus"></i>
                  <span className="ms-2">Asset</span>
              </Link>
              </li>
              <li className="nav-item">
                <Link to="/service-requests" className="nav-link text-white fs-5 d-flex align-items-center">
                  <i className="bi bi-sliders"></i>
                  <span className="ms-2">Validation</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/audits" className="nav-link text-white fs-5 d-flex align-items-center">
                  <i className="bi bi-clipboard2-check"></i>
                  <span className="ms-2">Audit</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employees" className="nav-link text-white fs-5 d-flex align-items-center">
                  <i className="bi bi-people"></i>
                  <span className="ms-2">Employee</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/asset-allocations" className="nav-link text-white fs-5 d-flex align-items-center">
                  <i className="bi bi-bag-check"></i>
                  <span className="ms-2">Allocations</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
