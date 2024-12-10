import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ServiceRequestService from '../services/ServiceRequestService';
import { useAuth } from '../context/useAuth';

const AddServiceRequest = () => {
    const [description, setDescription] = useState('');
    const [issueType, setIssueType] = useState('');
    const [requestStatus, setRequestStatus] = useState('PENDING');
    const [requestDate, setRequestDate] = useState(new Date().toISOString().split('T')[0]);
    const [assetId, setAssetId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const navigate = useNavigate();
    const { id, assetID } = useParams();
    const issueTypeOptions = ['Malfunction', 'Repair', 'No Issue'];
    const requestStatusOption = ['Pending']
    const location = useLocation();
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
        const searchParams = new URLSearchParams(location.search);  // Extract search params
        const queryAssetId = searchParams.get('assetId');  // Get assetId from the query string
        if (id) {
            ServiceRequestService.findByRequestId(id, token)
                .then((response) => {
                    const serviceRequest = response.data;
                    setDescription(serviceRequest.description);
                    setIssueType(serviceRequest.issueType);
                    setRequestStatus(serviceRequest.requestStatus);
                    setRequestDate(serviceRequest.requestDate);
                    setAssetId(serviceRequest.asset.assetID);
                    setEmployeeId(serviceRequest.employee.employeeID);
                }).catch((error) => {
                    console.error("Error fetching service request:", error);
                    if (error.response?.status === 403) {
                        console.log("error 403 occured")
                        setError("You cannot view the service request")
                    }
                    else {
                        setError("No Server Response")
                    }
        
                });
        }
        else if (queryAssetId) {
            setAssetId(queryAssetId)
        }
    }, [id, location.search]);

    const handleSaveOrUpdate = (e) => {
        e.preventDefault();
        const formattedDate = formatDateToDDMMYYYY(requestDate);
        const serviceRequest = {
            description,
            issueType,
            requestStatus,
            requestDate: formattedDate,
            asset: { assetID: assetId },
            employee: { employeeID: employeeId }
        };

        if (id) {
            ServiceRequestService.updateServiceRequest(id, serviceRequest, token).then(() => {
                navigate('/assetdisplay');
            }).catch((error) => {
                console.error("Error updating service request:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot updatethe service request")
                }
                else {
                    setError("No Server Response")
                }
    
            });
        } else {
            ServiceRequestService.createRequest(serviceRequest, token).then(() => {
                navigate('/assetdisplay');
            }).catch((error) => {
                console.error("Error saving service request:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot create request")
                }
                else {
                    setError("No Server Response")
                }
    
            });
        }
    };

    return (
        <div className="d-flex">
        <div className="content-container d-flex flex-column align-items-center w-100">
        <div className="container">
            <h2 className="text-center" style={{ paddingTop: '25px' }}>{id ? 'Update Service Request' : 'Add Service Request'}</h2>
            <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <Form onSubmit={handleSaveOrUpdate} style={{ paddingBottom: '25px' }}>
                <Row>
                    <Form.Label column lg={2}>Description</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Issue Type</Form.Label>
                    <Col>
                        <Form.Control
                            as="select"
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            required
                        >
                            <option value="">Select Issue Type</option>
                            {issueTypeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Request Status</Form.Label>
                    <Col>
                        <Form.Control
                            as="select"
                            value={requestStatus}
                            onChange={(e) => setRequestStatus(e.target.value)}
                            required
                        >
                            <option value="">Select Request Status</option>
                            {requestStatusOption.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Request Date</Form.Label>
                    <Col>
                        <Form.Control
                            type="date"
                            value={requestDate}
                            onChange={(e) => setRequestDate(e.target.value)}
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
                            value={assetId}
                            onChange={(e) => setAssetId(e.target.value)}
                            placeholder="Enter Asset ID"
                            required
                            disabled={!!assetID}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Employee ID</Form.Label>
                    <Col>
                        <Form.Control
                            type="number"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <div className='text-center'>
                    <Button type="submit" variant="primary" style={{ width: '250px' }}>{id ? 'Update' : 'Submit'}</Button>
                    <br />
                    <br />
                    <Link to="/assetdisplay" className="btn btn-danger" style={{ width: '250px' }}>Cancel</Link>
                </div>
            </Form>
        </div>
        </div>
        </div>
    );
};

export default AddServiceRequest;
