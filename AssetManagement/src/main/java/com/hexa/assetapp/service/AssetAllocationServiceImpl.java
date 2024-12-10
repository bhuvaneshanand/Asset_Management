package com.hexa.assetapp.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetapp.dto.AssetAllocationDTO;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.AssetAllocation;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.repository.AssetAllocationRepository;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.repository.EmployeeRepository;

@Service
public class AssetAllocationServiceImpl implements AssetAllocationService {
	
	@Autowired
	private AssetAllocationRepository assetAllocationRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private AssetRepository assetRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public AssetAllocation createAssetAllocation(AssetAllocationDTO assetAllocateObj) throws ResourceNotFoundException{
		Asset asset =this.assetRepository.findById(assetAllocateObj.getAsset().getAssetID())
		        .orElseThrow(() -> new ResourceNotFoundException("Asset","ID",assetAllocateObj.getAsset().getAssetID()));
		
		Employee employee=this.employeeRepository.findById(assetAllocateObj.getEmployee().getEmployeeID())
				.orElseThrow(() -> new ResourceNotFoundException("Employee","ID",assetAllocateObj.getEmployee().getEmployeeID()));

		assetAllocateObj.setAsset(asset);
		assetAllocateObj.setEmployee(employee);
		
		AssetAllocation assetAllocation=this.modelMapper.map(assetAllocateObj, AssetAllocation.class);
		return this.assetAllocationRepository.save(assetAllocation);
	}

	@Override
	public AssetAllocation findAssetAllocationById(int allocationId) throws ResourceNotFoundException{
        AssetAllocation  assetAllocationObj =this.assetAllocationRepository.findById(allocationId)
        		.orElseThrow(() -> new ResourceNotFoundException("AssetAllocation","ID",allocationId));
		return assetAllocationObj;
	}

	@Override
	public List<AssetAllocation> findByEmployeeId(int employeeId) throws ResourceNotFoundException{
	List<AssetAllocation> listAssetAllocation = this.assetAllocationRepository.findByEmployee_EmployeeID(employeeId);
	
    if (listAssetAllocation.isEmpty()) {
        throw new ResourceNotFoundException("Employee","ID",employeeId);
    }
    
		return listAssetAllocation;
	}

	@Override
	public List<AssetAllocation> findByAssetId(int assetId) throws ResourceNotFoundException{
	List<AssetAllocation> listAssetAllocationObj = this.assetAllocationRepository.findByAsset_AssetID(assetId);
	
	if (listAssetAllocationObj.isEmpty()) {
        throw new ResourceNotFoundException("Asset","ID",assetId);
    }
	
    return listAssetAllocationObj;
	}
	
	@Override
	public AssetAllocation updateAssetAllocation(int allocationID, AssetAllocationDTO assetAllocationDtoObj) throws ResourceNotFoundException {

		AssetAllocation existingAssetAllocation = this.assetAllocationRepository.findById(allocationID)
	            .orElseThrow(() -> new ResourceNotFoundException("AssetAllocation", "ID", allocationID));
		
	    int existingAssetAllocationID = existingAssetAllocation.getAllocationID();
	    this.modelMapper.map(assetAllocationDtoObj, existingAssetAllocation);
	    existingAssetAllocation.setAllocationID(existingAssetAllocationID);
	    AssetAllocation updatedAssetAllocation = this.assetAllocationRepository.save(existingAssetAllocation);

	    return updatedAssetAllocation;
	}

	@Override
    public List<AssetAllocation> findAllAssetAllocation() throws ResourceNotFoundException{
		List<AssetAllocation> findAllAllocation=this.assetAllocationRepository.findAll();
		return findAllAllocation;
	}
	
	@Override
	public void deleteByAllocationId(int allocationID) throws ResourceNotFoundException{
		this.assetAllocationRepository.deleteById(allocationID);
	}
    
}