package com.hexa.assetapp.repositorytest;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.IssueType;
import com.hexa.assetapp.entities.RequestStatus;
import com.hexa.assetapp.entities.ServiceRequest;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.repository.EmployeeRepository;
import com.hexa.assetapp.repository.ServiceRequestRepository;

@SpringBootTest
public class ServiceRequestTest {
	@Autowired
	private ServiceRequestRepository serviceRequestRepository;
	
	@Autowired
	private AssetRepository assetRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Test
	@Order(1)
	void createServiceRequest() {

		ServiceRequest serviceRequest = new ServiceRequest();
		Asset asset= new Asset();
		Employee employee= new Employee();
		serviceRequest.setDescription("phone malfunctioning");
		serviceRequest.setIssueType(IssueType.MALFUNCTION);
		serviceRequest.setRequestStatus(RequestStatus.PENDING);
		asset.setAssetID(2);
		employee.setEmployeeID(2);
		this.serviceRequestRepository.save(serviceRequest);

	}
    
	@Test
	@Order(2)
	void deleteService() {
		int requestID = 1;
		this.serviceRequestRepository.deleteById(requestID);
	}
	
	@Test
    @Order(3)
    void updateServiceRequest() {
        Integer requestID = 2;
        Optional<ServiceRequest> optionalServiceRequest = serviceRequestRepository.findById(requestID);
        assertTrue(optionalServiceRequest.isPresent(), "ServiceRequest should exist with ID: " + requestID);
        
        ServiceRequest serviceRequest = optionalServiceRequest.get();
        serviceRequest.setDescription("Updated description for phone");
        serviceRequest.setIssueType(IssueType.REPAIR);
        serviceRequest.setRequestStatus(RequestStatus.IN_PROGRESS); 
        
        ServiceRequest updatedServiceRequest = this.serviceRequestRepository.save(serviceRequest);
        
    }

}
