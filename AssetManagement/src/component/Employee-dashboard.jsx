import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Admin.css'
export const EmployeeDashboard = () => {
  return (
    <div className="Employee-page d-flex">
    <div className="content-wrapper flex-grow-1">
      <header className="header d-flex justify-content-center align-items-center text-light shadow">
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center text-center">
            <h1 className="welcome-text mb-0 fw-bold">Welcome back</h1>
            <br />
            <div className="d-flex align-items-center">
              <Link to="/assetdisplay">
                <Button type="button" className="btn btn-primary btn-lg">
                  Asset related information
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
  )
}
