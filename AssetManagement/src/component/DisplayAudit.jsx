import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuditService from '../services/AuditService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const DisplayAudit = () => {
    const [audits, setAudits] = useState([]);
    const { auth } = useAuth();
    const token = auth.token;
    const [error,setError]=React.useState("")
    const errorRef=useRef()
    useEffect(() => {
        AuditService.findAllAudit(token)
            .then((response) => {
                console.log('API Response:', response.data);
                setAudits(response.data);
            })
            .catch((error) => {
                console.error('Error fetching audits:', error);
            });
    }, []);

    const handleDelete = (id) => {
        AuditService.deleteAuditById(id, token)
            .then(() => {
                setAudits(audits.filter(audit => audit.auditID !== id));
            }).catch((error)=>{
                if(error.response?.status===403){
                     console.log("error 403 occured")
                    setError("You cannot delete the audit")
                }
                else{
                    setError("No Server Response")
                }
    
            })
            
    };

    return (
        <div className="d-flex">
        <Sidenav />
        <div className="content-container d-flex flex-column align-items-center w-100">
        <div className="container">
            <h2 className="text-center">Audit Records</h2>
            <p ref={errorRef} className={error?'errmsg':'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <div className="text-center mb-2">
                <Link to="/add-audit" className="btn btn-primary mb-2">Add Audit</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Audit ID</th>
                        <th>Description</th>
                        <th>Audit Status</th>
                        <th>Asset ID</th>
                        <th>Employee ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {audits.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No audits available.</td>
                        </tr>
                    ) : (
                        audits.map(audit => (
                            <tr key={audit.auditID}>
                                <td>{audit.auditID}</td>
                                <td>{audit.description}</td>
                                <td>{audit.auditStatus}</td>
                                <td>{audit.asset?.assetID}</td>
                                <td>{audit.employee?.employeeID}</td>
                                <td>
                                    <Link to={`/edit-audit/${audit.auditID}`} className="btn btn-info btn-sm">Edit</Link> &nbsp;
                                    <button onClick={() => handleDelete(audit.auditID)} className="btn btn-danger btn-sm ml-2">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
        </div>
    );
};

export default DisplayAudit;
