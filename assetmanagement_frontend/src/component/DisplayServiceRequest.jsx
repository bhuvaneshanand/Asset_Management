import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceRequestService from '../services/ServiceRequestService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const DisplayServiceRequests = () => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const { auth } = useAuth();
    const token = auth.token;
    const [error, setError] = useState("");
    const errorRef = useRef();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [serviceRequestsPerPage] = useState(5); // Show 5 service requests per page (can be customized)
    const totalPages = Math.ceil(serviceRequests.length / serviceRequestsPerPage);

    // Fetch all service requests
    useEffect(() => {
        ServiceRequestService.findAllServiceRequest(token)
            .then((response) => {
                console.log('API Response:', response.data);
                setServiceRequests(response.data);
            })
            .catch((error) => {
                console.error('Error fetching service requests:', error);
                setError("Error fetching service requests");
            });
    }, [token]);

    // Handle service request deletion
    const handleDelete = (id) => {
        ServiceRequestService.deleteServiceRequestById(id, token)
            .then(() => {
                const updatedRequests = serviceRequests.filter(request => request.requestID !== id);
                setServiceRequests(updatedRequests);
                // Reset pagination if the current page becomes empty after deletion
                if ((currentPage - 1) * serviceRequestsPerPage >= updatedRequests.length) {
                    setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1);
                }
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    console.log("Error 403 occurred");
                    setError("You cannot delete the Service Request");
                } else {
                    setError("No Server Response");
                }
            });
    };

    // Get paginated data
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * serviceRequestsPerPage;
        const endIndex = startIndex + serviceRequestsPerPage;
        return serviceRequests.slice(startIndex, endIndex);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="d-flex">
            <Sidenav />
            <div className="content-container d-flex flex-column align-items-center w-100">
                <div className="container">
                    <h2 className="text-center">Service Requests</h2>
                    <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'} aria-live='assertive'>{error}</p>

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
                            {getPaginatedData().length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center">No service requests available.</td>
                                </tr>
                            ) : (
                                getPaginatedData().map(request => (
                                    <tr key={request.requestID}>
                                        <td>{request.requestID}</td>
                                        <td>{request.description}</td>
                                        <td>{request.issueType}</td>
                                        <td>{request.requestStatus}</td>
                                        <td>{request.requestDate}</td>
                                        <td>{request.asset?.assetID}</td>
                                        <td>{request.employee?.employeeID}</td>
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

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}>First</button>

                        <button
                            className="btn btn-primary me-2"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}>Prev</button>

                        <span className="align-self-center">Page {currentPage} of {totalPages}</span>

                        <button
                            className="btn btn-primary ms-2"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}>Next</button>

                        <button
                            className="btn btn-primary ms-2"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}>Last</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayServiceRequests;