package com.hexa.assetapp.repositorytest;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetapp.entities.AllocationStatus;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.AssetAllocation;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.IssueType;
import com.hexa.assetapp.entities.RequestStatus;
import com.hexa.assetapp.entities.ServiceRequest;
import com.hexa.assetapp.repository.AssetAllocationRepository;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.repository.EmployeeRepository;

@SpringBootTest
public class AssetAllocationTest {
    @Autowired
    private AssetAllocationRepository assetAllocationRepository;
    
    @Autowired 
    private AssetRepository assetRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    @Order(1)
    void createAssetAllocation(){
        AssetAllocation assetAllocation = new AssetAllocation();
        Asset asset = new Asset();
        Employee employee= new Employee();
        assetAllocation.setStatus(AllocationStatus.PROCESSING);
        assetAllocation.setAllocationDate("06-09-2024");
        assetAllocation.setReturnDate("06-10-2024");
        asset.setAssetID(2);
        employee.setEmployeeID(2);
		this.assetAllocationRepository.save(assetAllocation);
    }

    @Test
    @Order(2)
    void findAllocationById(){
        int id = 1;
        AssetAllocation assetAllocationObj = this.assetAllocationRepository.findById(id).get();
    }
    
    @Test
    @Order(3)
    
    void updateAllocationByid() {
    	int allocationID= 1;
    	Asset asset = new Asset();
        Employee employee= new Employee();
    	Optional<AssetAllocation> optionalAssetAllocation = assetAllocationRepository.findById(allocationID);
    	AssetAllocation assetAllocation = optionalAssetAllocation.get();
    	assetAllocation.setStatus(AllocationStatus.RETURNED);
    	assetAllocation.setAllocationDate("06-09-2024");
    	assetAllocation.setReturnDate("06-10-2024"); 
    	asset.setAssetID(2);
        employee.setEmployeeID(2);
        
    	AssetAllocation updatedAssetAllocation = this.assetAllocationRepository.save(assetAllocation);
    }
    
    @Test
    @Order(4)
    void deleteAllocation() {
    	int allocationid = 1;
    	this.assetAllocationRepository.deleteById(allocationid);
    }
    
    

}
