package com.hexa.assetapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetapp.dto.ServiceRequestDTO;
import com.hexa.assetapp.entities.ServiceRequest;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.service.ServiceRequestServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/assetapp/serviceRequest")
@ResponseBody
@CrossOrigin("*")
public class ServiceRequestContoller {

	private ServiceRequestServiceImpl serviceRequestServiceImpl;

	private ModelMapper modelMapper;

	@Autowired
	public ServiceRequestContoller(ServiceRequestServiceImpl serviceRequestServiceImpl, ModelMapper modelMapper) {
		super();
		this.serviceRequestServiceImpl = serviceRequestServiceImpl;
		this.modelMapper = modelMapper;
	}

	@PreAuthorize("hasRole('EMPLOYEE')")
	@PostMapping(value = "/createRequest", consumes = "application/json")
	public ResponseEntity<ServiceRequestDTO> createRequest(@Valid @RequestBody ServiceRequestDTO serviceRequestDTO)
			throws ResourceNotFoundException {
		ServiceRequest createdRequest = this.serviceRequestServiceImpl.createRequest(serviceRequestDTO);
		ServiceRequestDTO createdRequestDTO = this.modelMapper.map(createdRequest, ServiceRequestDTO.class);
		return ResponseEntity.ok().body(createdRequestDTO);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByEmployeeId")
	public ResponseEntity<List<ServiceRequestDTO>> findByEmployeeId(@RequestParam("id")Integer employeeId) 
			throws ResourceNotFoundException {
		List<ServiceRequest> serviceRequestObj = this.serviceRequestServiceImpl.findByEmployeeId(employeeId);
		List<ServiceRequestDTO> serviceRequestDtoObj = new ArrayList<>();
		for (ServiceRequest serviceRequest : serviceRequestObj) {
			ServiceRequestDTO ServiceReqDto = this.modelMapper.map(serviceRequest, ServiceRequestDTO.class);
			serviceRequestDtoObj.add(ServiceReqDto);
		}
		return ResponseEntity.ok(serviceRequestDtoObj);
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findByAssetId")
	public ResponseEntity<List<ServiceRequestDTO>> findByAssetId(@RequestParam("id") Integer assetId)
			throws ResourceNotFoundException {
		List<ServiceRequest> assetRequestObj = this.serviceRequestServiceImpl.findByAssetId(assetId);
		List<ServiceRequestDTO> serviceRequestDtoObj = new ArrayList<>();
		for (ServiceRequest serviceRequest : assetRequestObj) {
			ServiceRequestDTO ServiceReqDto = this.modelMapper.map(serviceRequest, ServiceRequestDTO.class);
			serviceRequestDtoObj.add(ServiceReqDto);
		}
		return ResponseEntity.ok(serviceRequestDtoObj);

	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findByRequestStatus")
	public ResponseEntity<List<ServiceRequestDTO>> findByRequestStatus(@RequestParam("status") String status)
			throws ResourceNotFoundException {
		List<ServiceRequest> statusRequestObj = this.serviceRequestServiceImpl.findByRequestStatus(status);
		List<ServiceRequestDTO> serviceRequestDtoObj = new ArrayList<>();
		for (ServiceRequest serviceRequest : statusRequestObj) {
			ServiceRequestDTO ServiceReqDto = this.modelMapper.map(serviceRequest, ServiceRequestDTO.class);
			serviceRequestDtoObj.add(ServiceReqDto);
		}
		return ResponseEntity.ok(serviceRequestDtoObj);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@DeleteMapping("/deleteByServiceRequestId")
	public ResponseEntity<String> deleteByServiceRequestId(@RequestParam("id")Integer requestID) throws ResourceNotFoundException{
		this.serviceRequestServiceImpl.deleteByServiceReqtId(requestID);
		return ResponseEntity.ok("ServiceRequestId "+requestID+" deleted.");
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@PutMapping("/updateServiceRequest")
	public ResponseEntity<ServiceRequestDTO> updateServiceRequest(@RequestParam("id") Integer requestID, @RequestBody ServiceRequestDTO serviceRequestDtoObj)
			throws ResourceNotFoundException {
		ServiceRequest updatedServiceRequest =this.serviceRequestServiceImpl.updateServiceRequest(requestID, serviceRequestDtoObj);
		ServiceRequestDTO serviceRequestDTO = this.modelMapper.map(updatedServiceRequest,ServiceRequestDTO.class);
		return ResponseEntity.ok(serviceRequestDTO);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/serviceRequests")
	public ResponseEntity<List<ServiceRequestDTO>> findAllRequest() throws ResourceNotFoundException{
		List<ServiceRequest> serviceRequest=this.serviceRequestServiceImpl.findAllRequest();
		List<ServiceRequestDTO> serviceRequestDTO=new ArrayList<>();
		for(ServiceRequest sr:serviceRequest) {
			ServiceRequestDTO srDto=this.modelMapper.map(sr, ServiceRequestDTO.class);
			serviceRequestDTO.add(srDto);
		}
		return ResponseEntity.ok(serviceRequestDTO);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findbyRequestId")
	public ResponseEntity<ServiceRequestDTO> findByRequestId(@RequestParam("id") Integer requestID) throws ResourceNotFoundException{
		ServiceRequest serviceRequest=this.serviceRequestServiceImpl.findByRequestId(requestID);
		ServiceRequestDTO serviceRequestDTO=this.modelMapper.map(serviceRequest, ServiceRequestDTO.class);
		return ResponseEntity.ok(serviceRequestDTO);
	}
}
