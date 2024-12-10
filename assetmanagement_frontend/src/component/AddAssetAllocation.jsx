import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AssetAllocationService from '../services/AssetAllocationService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const AddAssetAllocation = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [assetId, setAssetId] = useState('');
  const [allocationDate, setAllocationDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [status, setStatus] = useState('');
  const statusOptions = ['Allocated', 'Processing', 'Returned'];
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const token = auth.token;
  const [error, setError] = React.useState("")
  const errorRef = useRef()

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (id) {
      AssetAllocationService.findAssetAllocationById(id, token).then((response) => {
        setEmployeeId(response.data.employee.employeeID);
        setAssetId(response.data.asset.assetID);
        setAllocationDate(response.data.allocationDate);
        setReturnDate(response.data.returnDate);
        setStatus(response.data.status);
      });
    }
  }, [id]);

  const handleSaveOrUpdate = (e) => {
    e.preventDefault();
    const formattedAllocationDate = formatDateToDDMMYYYY(allocationDate);
    const formattedReturnDate = formatDateToDDMMYYYY(returnDate);
    const assetAllocation = {
      employee: { employeeID: employeeId },
      asset: { assetID: assetId },
      allocationDate: formattedAllocationDate,
      returnDate: formattedReturnDate,
      status
    };


    if (id) {
      AssetAllocationService.updateAssetAllocation(id, assetAllocation, token)
        .then(() => {
          navigate('/asset-allocations');
        })
        .catch((error) => {
          console.error("Error updating asset allocation:", error);   
        });
    } else {
      AssetAllocationService.createAssetAllocation(assetAllocation, token)
        .then(() => {
          navigate('/asset-allocations');
        })
        .catch((error) => {
          console.error("Error creating asset allocation:", error);
        });
    }
  };

  return (
    <div className="d-flex">
    <Sidenav />
    <div className="content-container d-flex flex-column align-items-center w-100">
    <div className="container">
      <h2 className="text-center" style={{ paddingTop: '25px' }}>{id ? 'Update Asset Allocation' : 'Add Asset Allocation'}</h2>
      <Form onSubmit={handleSaveOrUpdate} style={{ paddingBottom: '25px' }}>
        <Row>
          <Form.Label column lg={2}>Employee ID</Form.Label>
          <Col>
            <Form.Control
              type="number"
              value={employeeId || ''}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID"
              required
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={2}>Asset ID</Form.Label>
          <Col>
            <Form.Control
              type="number"
              value={assetId || ''}
              onChange={(e) => setAssetId(e.target.value)}
              placeholder="Enter Asset ID"
              required
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={2}>Status</Form.Label>
          <Col>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={2}>Allocation Date</Form.Label>
          <Col>
            <Form.Control
              type="date"
              value={allocationDate}
              onChange={(e) => setAllocationDate(e.target.value)}
              required
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={2}>Return Date</Form.Label>
          <Col>
            <Form.Control
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </Col>
        </Row>
        <br />
        <div className='text-center'>
          <Button type="submit" variant="primary" style={{ width: '250px' }}>{id ? 'Update' : 'Submit'}</Button>
          <br />
          <br />
          <Link to="/asset-allocations" className="btn btn-danger" style={{ width: '250px' }}>Cancel</Link>
        </div>
      </Form>
    </div>
    </div>
    </div>
  );
};

export default AddAssetAllocation;
