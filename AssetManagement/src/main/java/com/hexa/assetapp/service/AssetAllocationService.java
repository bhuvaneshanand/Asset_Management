package com.hexa.assetapp.service;

import java.util.List;

import com.hexa.assetapp.dto.AssetAllocationDTO;
import com.hexa.assetapp.entities.AssetAllocation;
import com.hexa.assetapp.exception.ResourceNotFoundException;

public interface AssetAllocationService {
	
	public AssetAllocation createAssetAllocation(AssetAllocationDTO assetObj) throws ResourceNotFoundException;
    public AssetAllocation findAssetAllocationById(int allocationId) throws ResourceNotFoundException;
    public List<AssetAllocation> findByEmployeeId(int employeeId) throws ResourceNotFoundException;
    public List<AssetAllocation> findByAssetId(int assetId) throws ResourceNotFoundException;
    public AssetAllocation updateAssetAllocation(int allocationID, AssetAllocationDTO assetAllocationDtoObj) throws ResourceNotFoundException;
    public List<AssetAllocation> findAllAssetAllocation() throws ResourceNotFoundException;
    public void deleteByAllocationId(int allocationID) throws ResourceNotFoundException;
    
}

