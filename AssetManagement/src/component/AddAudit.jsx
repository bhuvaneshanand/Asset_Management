import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuditService from '../services/AuditService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const AddAudit = () => {
    const [auditStatus, setAuditStatus] = useState('');
    const [description, setDescription] = useState('');
    const [assetId, setAssetId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useAuth();
    const token = auth.token;
    const [error, setError] = React.useState("")
    const errorRef = useRef()
    const auditStatusOptions = ['Verified', 'Pending', 'Rejected'];

    useEffect(() => {
        if (id) {
            AuditService.findByAuditId(id, token).then((response) => {
                const audit = response.data;
                setAuditStatus(audit.auditStatus);
                setDescription(audit.description);
                setAssetId(audit.asset.assetID);
                setEmployeeId(audit.employee.employeeID);
            }).catch((error) => {
                console.error("Error fetching audit:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot view audit")
                }
                else {
                    setError("No Server Response")
                }
            });
        }
    }, [id]);

    const handleSaveOrUpdate = (e) => {
        e.preventDefault();
        const auditObj = {
            auditStatus,
            description,
            asset: { assetID: assetId },
            employee: { employeeID: employeeId }
        };

        if (id) {
            // Update audit
            AuditService.updateAudit(id, auditObj, token).then(() => {
                navigate('/audits');
            }).catch((error) => {
                console.error("Error updating audit:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot update the audit")
                }
                else {
                    setError("No Server Response")
                }
            });
        } else {
            // Create new audit
            AuditService.createAudit(auditObj, token).then(() => {
                navigate('/audits');
            }).catch((error) => {
                console.error("Error creating audit:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot create audit")
                }
                else {
                    setError("No Server Response")
                }
            });
        }
    };

    return (
        <div className="d-flex">
        <Sidenav />
        <div className="content-container d-flex flex-column align-items-center w-100">
            <div className='container'>
            <h2 className="text-center" style={{ paddingTop: '25px' }}>{id ? 'Update Audit' : 'Add Audit'}</h2>
            <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <Form onSubmit={handleSaveOrUpdate} style={{ paddingBottom: '25px' }}>
                <Row>
                    <Form.Label column lg={2}>Audit Status</Form.Label>
                    <Col>
                        <Form.Control
                            as="select"
                            value={auditStatus}
                            onChange={(e) => setAuditStatus(e.target.value)}
                            required
                        >
                            <option value="">Select Audit Status</option>
                            {auditStatusOptions.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
                <br />
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
                    <Form.Label column lg={2}>Asset ID</Form.Label>
                    <Col>
                        <Form.Control
                            type="number"
                            value={assetId}
                            onChange={(e) => setAssetId(e.target.value)}
                            placeholder="Enter Asset ID"
                            required
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
                    <Link to="/audits" className="btn btn-danger" style={{ width: '250px' }}>Cancel</Link>
                </div>
            </Form>
        </div>
        </div>
        </div>
    );
};

export default AddAudit;
