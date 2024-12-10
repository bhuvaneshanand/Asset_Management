package com.hexa.assetapp.service;

import java.util.List;

import com.hexa.assetapp.dto.ServiceRequestDTO;
import com.hexa.assetapp.entities.ServiceRequest;
import com.hexa.assetapp.exception.ResourceNotFoundException;

public interface ServiceRequestService {
	public ServiceRequest createRequest(ServiceRequestDTO serviceRequestDTO)throws ResourceNotFoundException;
	public List<ServiceRequest> findByAssetId(Integer assetId) throws ResourceNotFoundException;
	public List<ServiceRequest> findByEmployeeId(Integer employeeId) throws ResourceNotFoundException; 
	public List<ServiceRequest> findByRequestStatus(String status) throws ResourceNotFoundException;
	public void deleteByServiceReqtId(int requestID) throws ResourceNotFoundException;
	public ServiceRequest updateServiceRequest(int requestID, ServiceRequestDTO serviceRequestDtoObj) throws ResourceNotFoundException;
	public List<ServiceRequest> findAllRequest() throws ResourceNotFoundException;
	public ServiceRequest findByRequestId(int requestID) throws ResourceNotFoundException;
	
}
