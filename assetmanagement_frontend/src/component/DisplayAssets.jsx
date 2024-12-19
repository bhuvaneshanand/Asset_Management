
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AssetService from '../services/AssetService';
import { useAuth } from '../context/useAuth';
import { Button, Nav, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { Sidenav } from './Sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DisplayAssets = () => {
  const [assets, setAssets] = useState([]);
  const { auth } = useAuth();
  const [error, setError] = React.useState("")
  const errorRef = useRef()
  const token = auth.token;
  const [show, setShow] = useState(false); // State to toggle sidebar
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(1000000); // initial max price set to 10 lakh
  const [selectedStatus, setSelectedStatus] = useState([]); // For managing selected status checkboxes
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [inputPage, setInputPage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    AssetService.findAllAssets(token)
      .then((response) => {
        console.log('API Response:', response.data);
        setAssets(response.data);
        setFilteredAssets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
        setError("Error fetching assets")
      });
  }, [token]);

  const handleDelete = (id) => {
    AssetService.deleteByAssetId(id, token).then(() => {
      alert("Asset deleted")
      const updatedAssets = assets.filter(asset => asset.assetID !== id);
      setAssets(updatedAssets);
      setFilteredAssets(updatedAssets);
    }).catch((error) => {
      if (error.response?.status === 403) {
        console.log("error 403 occured")
        setError("You cannot delete the assets")
      }
      else {
        setError("No Server Response")
      }
    })
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterAssets(e.target.value, priceRange, selectedStatus);
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    filterAssets(searchTerm, e.target.value, selectedStatus);
  };

  const handleStatusCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedStatus(prev =>
      checked ? [...prev, value] : prev.filter(status => status !== value)
    );
    filterAssets(searchTerm, priceRange, checked ? [...selectedStatus, value] : selectedStatus.filter(status => status !== value));
  };

  const filterAssets = (term, range, statuses) => {
    const filtered = assets.filter(asset =>
      (asset.assetName.toLowerCase().includes(term.toLowerCase()) ||
        asset.assetID.toString().includes(term) ||
        asset.assetCategory.toLowerCase().includes(term.toLowerCase()) ||
        asset.assetModel.toLowerCase().includes(term.toLowerCase())) &&
      asset.assetValue <= range &&
      (statuses.length === 0 || statuses.includes(asset.status)) // Check if asset status is in selected statuses
    );
    setFilteredAssets(filtered);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

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
        <div className='container'>
          <div className="text-center mb-3">
            <h1>Assets</h1>
            <Link to="/add-asset" className="btn btn-primary mt-2">Add Asset</Link>
          </div>

          <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'} aria-live="assertive">{error}</p>

          {/* Filters Row */}
          <div className="d-flex justify-content-between align-items-center mt-3 w-100">
            {/* Filter by Status on Left */}
            <div className="form-group">
              <h4>Filter by Status:</h4>
              <label>
                <input
                  type="checkbox"
                  value="Available"
                  onChange={handleStatusCheckboxChange}
                />
                Available
              </label>&nbsp; &nbsp;
              <label>
                <input
                  type="checkbox"
                  value="Assigned"
                  onChange={handleStatusCheckboxChange}
                />
                Assigned
              </label>&nbsp; &nbsp;
              <label>
                <input
                  type="checkbox"
                  value="In Service"
                  onChange={handleStatusCheckboxChange}
                />
                In Service
              </label>
            </div>

            {/* Search in Center */}
            <div className="form-group d-flex justify-content-center">
              <div className="input-group" style={{ maxWidth: "400px" }}>
                <span className="input-group-text" id="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name, ID, Category, or Model"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  aria-label="Search"
                  aria-describedby="search-icon"
                />
              </div>
            </div>

            {/* Filter by Price on Right */}
            <div className="form-group d-flex flex-column align-items-end">
              <label htmlFor="priceRange" className="form-label">Asset Price (up to): ₹{priceRange}</label>
              <input
                type="range"
                className="form-range"
                id="priceRange"
                min="0"
                max="1000000"
                step="10000"
                value={priceRange}
                onChange={handlePriceChange}
                style={{ width: "300px" }}
              />
            </div>
          </div>

          <br />

          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Asset ID</th>
                <th>Asset Image</th>
                <th>Asset Name</th>
                <th>Asset Category</th>
                <th>Asset Model</th>
                <th>Asset Value</th>
                <th>Warranty Upto</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">No assets available.</td>
                </tr>
              ) : (
                filteredAssets.map(asset => (
                  <tr key={asset.assetID}>
                    <td>{asset.assetID}</td>
                    <td>{<img src={asset.imgUrl} alt='No Images' style={{ width: "200px", height: "150px" }} />}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.assetCategory}</td>
                    <td>{asset.assetModel}</td>
                    <td>{asset.assetValue}</td>
                    <td>{asset.manufacturingDate}</td>
                    <td>{asset.expiryDate}</td>
                    <td>{asset.status}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <Link to={`/edit-asset/${asset.assetID}`} className="btn btn-info btn-sm">Edit</Link> &nbsp; &nbsp;
                        <button onClick={() => handleDelete(asset.assetID)} className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination-controls d-flex justify-content-center align-items-center mb-3">
            <button className="btn btn-sm btn-primary mx-1" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
              <button key={page} className={`btn btn-sm mx-1 ${currentPage === page ? 'btn-info' : 'btn-outline-primary'}`} onClick={() => goToPage(page)}>{page}</button>
            ))}
            <button className="btn btn-sm btn-primary mx-1" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            <span className="mx-2">Total Pages: {totalPages}</span>
            <input type="number" className="form-control form-control-sm mx-1" placeholder="Page" value={inputPage} onChange={handleInputChange} style={{ width: '60px' }} />
            <button className="btn btn-sm btn-primary" onClick={handlePageNavigation}>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAssets;