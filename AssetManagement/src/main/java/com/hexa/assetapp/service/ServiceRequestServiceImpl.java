package com.hexa.assetapp.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetapp.dto.ServiceRequestDTO;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.ServiceRequest;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.repository.EmployeeRepository;
import com.hexa.assetapp.repository.ServiceRequestRepository;
@Service
public class ServiceRequestServiceImpl implements ServiceRequestService{
	
	
	private ServiceRequestRepository serviceRequestRepository;
	@Autowired
	private AssetRepository assetRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	private ModelMapper modelMapper;
	
	
	@Autowired
	public ServiceRequestServiceImpl(ServiceRequestRepository serviceRequestRepository, ModelMapper modelMapper) {
		super();
		this.serviceRequestRepository = serviceRequestRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public ServiceRequest createRequest(ServiceRequestDTO serviceRequestDTO) throws ResourceNotFoundException {
		Asset asset = assetRepository.findById(serviceRequestDTO.getAsset().getAssetID())
		        .orElseThrow(() -> new ResourceNotFoundException("Asset","ID",serviceRequestDTO.getAsset().getAssetID()));
		
		Employee employee=employeeRepository.findById(serviceRequestDTO.getEmployee().getEmployeeID())
				.orElseThrow(() -> new ResourceNotFoundException("Employee","ID",serviceRequestDTO.getEmployee().getEmployeeID()));

		 serviceRequestDTO.setAsset(asset);
		 serviceRequestDTO.setEmployee(employee);
		 
		ServiceRequest serviceRequest=this.modelMapper.map(serviceRequestDTO, ServiceRequest.class);
		return this.serviceRequestRepository.save(serviceRequest);
	}


	@Override
	public List<ServiceRequest> findByAssetId(Integer assetId) throws ResourceNotFoundException {
        List<ServiceRequest> assetRequestObj = this.serviceRequestRepository.findByAsset_AssetID(assetId);
        
        if (assetRequestObj.isEmpty()) {
            throw new ResourceNotFoundException("Asset","ID",assetId);
        }
        
		return assetRequestObj;   
	}
	
	@Override
	public List<ServiceRequest> findByEmployeeId(Integer employeeId) throws ResourceNotFoundException {
		List<ServiceRequest> serviceRequestObj = this.serviceRequestRepository.findByEmployee_EmployeeID(employeeId);
		
        if (serviceRequestObj.isEmpty()) {
            throw new ResourceNotFoundException("Employee","ID",employeeId);
        }
        
        return serviceRequestObj;
	}

	@Override
	public List<ServiceRequest> findByRequestStatus(String status) throws ResourceNotFoundException {
		List<ServiceRequest> statusRequestObj=this.serviceRequestRepository.findByRequestStatus(status);
	    if (statusRequestObj.isEmpty()) {
            throw new ResourceNotFoundException("Service","ID",status);
        }
		return statusRequestObj;
	}
	@Override
	public void deleteByServiceReqtId(int requestID) throws ResourceNotFoundException{
		this.serviceRequestRepository.deleteById(requestID);	
	}
	
	@Override
	public ServiceRequest updateServiceRequest(int requestID, ServiceRequestDTO serviceRequestDtoObj) throws ResourceNotFoundException {

		ServiceRequest existingServiceRequest = this.serviceRequestRepository.findById(requestID)
	            .orElseThrow(() -> new ResourceNotFoundException("ServiceRequest", "ID", requestID));
		
	    int existingServiceRequestID = existingServiceRequest.getRequestID();
	    this.modelMapper.map(serviceRequestDtoObj, existingServiceRequest);
	    existingServiceRequest.setRequestID(existingServiceRequestID);
	    ServiceRequest updatedServiceRequest = this.serviceRequestRepository.save(existingServiceRequest);

	    return updatedServiceRequest;
	}
	
	@Override
	public List<ServiceRequest> findAllRequest() throws ResourceNotFoundException{
		 List<ServiceRequest> serviceRequests=this.serviceRequestRepository.findAllWithAssets();
		 return serviceRequests;
	}
	
	@Override
	public ServiceRequest findByRequestId(int requestID) throws ResourceNotFoundException{
		ServiceRequest serviceRequest=this.serviceRequestRepository.findById(requestID)
				.orElseThrow(() -> new ResourceNotFoundException("Service Request","ID",requestID));
		return serviceRequest;
		
	}
}

