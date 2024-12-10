import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AssetService from '../services/AssetService';
import { useAuth } from '../context/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const DisplayAssetEmployee = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(1000000); // initial max price set to 10 lakh
  const [selectedStatus, setSelectedStatus] = useState([]); // For managing selected status checkboxes
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const errorRef = useRef();
  const token = auth.token;

  useEffect(() => {
    AssetService.findAllAssets(token)
      .then((response) => {
        setAssets(response.data);
        setFilteredAssets(response.data);
      })
      .catch((error) => {
        setError("Error fetching assets");
      });
  }, [token]);

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

  return (
    <div className="d-flex">
  <div className="content-container d-flex flex-column align-items-center w-100">
    <div className="container">
      <h1 className="text-center">Assets</h1>
      <p 
        ref={errorRef} 
        className={error ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {error}
      </p>

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

      <br/>
      {/* Assets Table */}
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
            <th>Asset Request</th>
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
                  <Link to={`/add-service-request?assetId=${asset.assetID}`}>
                    <button type='button' className='btn btn-primary btn-sm'  disabled={asset.status !== 'Available'}>Request</button>
                  </Link>
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
export default DisplayAssetEmployee;
