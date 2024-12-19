import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AssetAllocationService from '../services/AssetAllocationService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const DisplayAssetAllocations = () => {
  const [assetAllocations, setAssetAllocations] = useState([]);
  const [error, setError] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [inputPage, setInputPage] = useState('');
  const errorRef = useRef();
  const { auth } = useAuth();
  const token = auth.token;

  useEffect(() => {
    AssetAllocationService.findAllAssetAllocations(token)
      .then((response) => {
        const allocations = response.data.map(item => ({
          allocationID: item.allocationID,
          employeeID: item.employee.employeeID,
          assetID: item.asset.assetID,
          assetName: item.asset.assetName,
          allocationDate: item.allocationDate,
          returnDate: item.returnDate,
          status: item.status,
        }));
        setAssetAllocations(allocations);
      })
      .catch((error) => {
        if (error.response?.status === 444) {
          setError("No server response");
        }
      });
  }, []);

  const handleDelete = (id) => {
    AssetAllocationService.deleteAssetAllocation(id, token)
      .then(() => {
        setAssetAllocations(assetAllocations.filter((alloc) => alloc.allocationID !== id));
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          setError("You cannot delete asset allocations");
        } else if (error.response?.status === 444) {
          setError("No Server Response");
        }
      });
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAllocations = assetAllocations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(assetAllocations.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageNavigation = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      goToPage(pageNumber);
      setInputPage('');
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return (
    <div className="d-flex">
      <Sidenav />
      <div className="content-container d-flex flex-column align-items-center w-100">
        <div className="container">
          <h2 className="text-center">Asset Allocations</h2>
          <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'} aria-live='assertive'>{error}</p>
          <div className="text-center mb-2">
            <Link to="/add-asset-allocation" className="btn btn-primary mb-2">Add Asset Allocation</Link>
          </div>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Employee ID</th>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Allocation Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAllocations.map((allocation) => (
                <tr key={allocation.allocationID}>
                  <td>{allocation.employeeID}</td>
                  <td>{allocation.assetID}</td>
                  <td>{allocation.assetName}</td>
                  <td>{allocation.allocationDate}</td>
                  <td>{allocation.returnDate}</td>
                  <td>{allocation.status}</td>
                  <td>
                    <Link to={`/edit-asset-allocation/${allocation.allocationID}`} className="btn btn-info btn-sm">Edit</Link>
                    &nbsp;
                    <button onClick={() => handleDelete(allocation.allocationID)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls d-flex justify-content-center align-items-center mt-3">
            <button
              className="btn btn-sm btn-primary mx-1"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`btn btn-sm mx-1 ${currentPage === page ? 'btn-info' : 'btn-outline-primary'}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="btn btn-sm btn-primary mx-1"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>

            <span className="mx-2">Total Pages: {totalPages}</span>
            <input
              type="number"
              className="form-control form-control-sm mx-1"
              placeholder="Page"
              value={inputPage}
              onChange={handleInputChange}
              min="1"
              max={totalPages}
              style={{ width: '60px' }}
            />
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handlePageNavigation}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAssetAllocations;