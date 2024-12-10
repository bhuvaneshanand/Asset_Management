package com.hexa.assetapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexa.assetapp.entities.AssetAllocation;

@Repository
public interface AssetAllocationRepository extends JpaRepository<AssetAllocation, Integer> {
	
		List<AssetAllocation> findByEmployee_EmployeeID(int employeeID);

	    List<AssetAllocation> findByAsset_AssetID(int assetID);
 
    
}
