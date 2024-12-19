import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuditService from '../services/AuditService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const DisplayAudit = () => {
    const [audits, setAudits] = useState([]);
    const { auth } = useAuth();
    const token = auth.token;
    const [error, setError] = useState("");
    const errorRef = useRef();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [auditsPerPage] = useState(5); // 5 audits per page (can be changed)
    const totalPages = Math.ceil(audits.length / auditsPerPage);

    // Fetch all audits
    useEffect(() => {
        AuditService.findAllAudit(token)
            .then((response) => {
                console.log('API Response:', response.data);
                setAudits(response.data);
            })
            .catch((error) => {
                console.error('Error fetching audits:', error);
                setError("Error fetching audits");
            });
    }, [token]);

    // Handle audit deletion
    const handleDelete = (id) => {
        AuditService.deleteAuditById(id, token)
            .then(() => {
                const updatedAudits = audits.filter(audit => audit.auditID !== id);
                setAudits(updatedAudits);
                // Reset pagination if current page has no items after deletion
                if ((currentPage - 1) * auditsPerPage >= updatedAudits.length) {
                    setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1);
                }
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    console.log("Error 403 occurred");
                    setError("You cannot delete the audit");
                } else {
                    setError("No Server Response");
                }
            });
    };

    // Get paginated data
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * auditsPerPage;
        const endIndex = startIndex + auditsPerPage;
        return audits.slice(startIndex, endIndex);
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
                    <h2 className="text-center">Audit Records</h2>
                    <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'} aria-live='assertive'>{error}</p>

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
                            {getPaginatedData().length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No audits available.</td>
                                </tr>
                            ) : (
                                getPaginatedData().map(audit => (
                                    <tr key={audit.auditID}>
                                        <td>{audit.auditID}</td>
                                        <td>{audit.description}</td>
                                        <td>{audit.auditStatus}</td>
                                        <td>{audit.asset?.assetID}</td>
                                        <td>{audit.employee?.employeeID}</td>
                                        <td>
                                            <Link to={`/edit-audit/${audit.auditID}`} className="btn btn-info btn-sm">Edit</Link>
                                            &nbsp;
                                            <button onClick={() => handleDelete(audit.auditID)} className="btn btn-danger btn-sm ml-2">Delete</button>
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

export default DisplayAudit;