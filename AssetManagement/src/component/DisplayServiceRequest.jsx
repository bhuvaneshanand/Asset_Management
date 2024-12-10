import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceRequestService from '../services/ServiceRequestService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const DisplayServiceRequests = () => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const { auth } = useAuth();
    const token = auth.token;
    const [error,setError]=React.useState("")
    const errorRef=useRef()
    useEffect(() => {
        // Fetch all service requests
        ServiceRequestService.findAllServiceRequest(token)
            .then((response) => {
                console.log('API Response:', response.data); // Check the API response structure
                setServiceRequests(response.data);
            })
            .catch((error) => {
                console.error('Error fetching service requests:', error);
            });
    }, []);

    const handleDelete = (id) => {
        ServiceRequestService.deleteServiceRequestById(id,token).then(() => {
            setServiceRequests(serviceRequests.filter(request => request.requestID !== id));
        }).catch((error)=>{
            if(error.response?.status===403){
                 console.log("error 403 occured")
                setError("You cannot delete the Service Request")
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
            <h2 className="text-center">Service Requests</h2>
            <p ref={errorRef} className={error?'errmsg':'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Request ID</th>
                        <th>Description</th>
                        <th>Issue Type</th>
                        <th>Request Status</th>
                        <th>Request Date</th>
                        <th>Asset ID</th>
                        <th>Employee ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceRequests.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">No service requests available.</td>
                        </tr>
                    ) : (
                        serviceRequests.map(request => (
                            <tr key={request.requestID}>
                                <td>{request.requestID}</td> {/* Use requestID from the API response */}
                                <td>{request.description}</td>
                                <td>{request.issueType}</td>
                                <td>{request.requestStatus}</td>
                                <td>{request.requestDate}</td>
                                <td>{request.asset.assetID}</td>
                                <td>{request.employee.employeeID}</td>
                                <td>
                                <div className='text-center d-flex justify-content-center gap-3'>
                                    <Link to={`/edit-service-request-admin/${request.requestID}`} className="btn btn-info btn-sm">Edit</Link>
                                    <button onClick={() => handleDelete(request.requestID)} className="btn btn-danger btn-sm ml-2">Delete</button>
                                    </div>
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

export default DisplayServiceRequests;
