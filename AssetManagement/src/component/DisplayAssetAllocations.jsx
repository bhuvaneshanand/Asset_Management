import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AssetAllocationService from '../services/AssetAllocationService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const DisplayAssetAllocations = () => {
  const [assetAllocations, setAssetAllocations] = useState([]);
  const [error,setError]=React.useState("")
  const errorRef=useRef();
  const { auth } = useAuth();
  const token = auth.token;

  useEffect(() => {
    AssetAllocationService.findAllAssetAllocations(token)
      .then((response) => {
        console.log('API Response:', response.data); // Check the structure
        // Map through the response data and extract the necessary details
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
      }).catch((error) => {
        if(error.response?.status===444){
        console.error('Error fetching asset allocations:', error);
        setError("No server response")
        }
      });
  }, []);

  const handleDelete = (id) => {
    AssetAllocationService.deleteAssetAllocation(id,token).then((response) => {
      console.log("data received from deleteAssetAllocation()" + JSON.stringify(response.data))
      setAssetAllocations(assetAllocations.filter((alloc) => alloc.allocationID !== id));
    }).catch((error)=>{
      if(error.response?.status===403){
           console.log("error 403 occured")
          setError("You cannot delete asset allocations")
      }
      else if(error.response?.status===444){
          setError("No Server Response")
      }
  });
  };

  return (
    <div className="d-flex">
    <Sidenav />
    <div className="content-container d-flex flex-column align-items-center w-100">
    <div className="container">
      <h2 className="text-center">Asset Allocations</h2>
      <p ref={errorRef} className={error?'errmsg':'offscreen'}
                aria-live='assertive'>{error}
            </p>
      <div className="text-center mb-2">
        <Link to="/add-asset-allocation" className="btn btn-primary  mb-2">Add Asset Allocation</Link>
      </div>
      <table className="table  table-bordered table-striped">
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
          {assetAllocations.map((allocation, key) => (
            <tr key={allocation.allocationID}>
              <td>{allocation.employeeID}</td>
              <td>{allocation.assetID}</td>
              <td>{allocation.assetName}</td>
              <td>{allocation.allocationDate}</td>
              <td>{allocation.returnDate}</td>
              <td>{allocation.status}</td>
              <td>
                <Link to={`/edit-asset-allocation/${allocation.allocationID}`} className="btn btn-info btn-sm">Edit</Link>
                &nbsp; &nbsp;
                <button onClick={() => handleDelete(allocation.allocationID)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default DisplayAssetAllocations;
