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

import com.hexa.assetapp.dto.AssetDTO;
import com.hexa.assetapp.dto.AuditDTO;
import com.hexa.assetapp.entities.Audit;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.service.AuditServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/assetapp/audit")
@ResponseBody
@CrossOrigin("*")
public class AuditContoller {

	@Autowired
	private AuditServiceImpl auditServiceImpl;
	
	@Autowired
	private ModelMapper modelMapper;

	public AuditContoller(AuditServiceImpl auditServiceImpl) {
		super();
		this.auditServiceImpl = auditServiceImpl;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(value="/createAudit",consumes = "application/json")
	public ResponseEntity<AuditDTO> createAudit(@Valid @RequestBody AuditDTO auditObj) throws ResourceNotFoundException{
		Audit auditCreateObj=this.auditServiceImpl.createAudit(auditObj);
		AuditDTO auditDtoCreateObj=this.modelMapper.map(auditCreateObj, AuditDTO.class);
		return ResponseEntity.ok(auditDtoCreateObj);	
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByEmployeeId")
	public ResponseEntity<List<AuditDTO>> findByEmployeeId(@RequestParam("id") Integer employeeId) throws ResourceNotFoundException{
        List<Audit> auditObj = this.auditServiceImpl.findByEmployeeId(employeeId);
        List<AuditDTO> auditDtoListObj = new ArrayList<>();
        for(Audit audit: auditObj) {
        	AuditDTO auditDTO = this.modelMapper.map(audit, AuditDTO.class);
        	auditDtoListObj.add(auditDTO);
		}
        
        return ResponseEntity.ok(auditDtoListObj);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByAssetId")
	public ResponseEntity<List<AuditDTO>> findByAssetId(@RequestParam("id")Integer assetId) throws ResourceNotFoundException{
		 List<Audit> auditfindObj = this.auditServiceImpl.findByAssetId(assetId);
		 List<AuditDTO> auditDtoListObj = new ArrayList<>();
		  for(Audit audit: auditfindObj) {
			  AuditDTO auditDTO = this.modelMapper.map(audit, AuditDTO.class);
			  auditDtoListObj.add(auditDTO);
		  }
		  
		return ResponseEntity.ok(auditDtoListObj);

	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByAuditStatus")
	public ResponseEntity<List<AuditDTO>> findByAuditStatus(@RequestParam("status") String status) throws ResourceNotFoundException{
		List<Audit> auditfindstatusObj = this.auditServiceImpl.findByAuditStatus(status);
		List<AuditDTO> auditDtoListObj = new ArrayList<>();
		  for(Audit audit: auditfindstatusObj) {
			  AuditDTO auditDTO = this.modelMapper.map(audit, AuditDTO.class);
			  auditDtoListObj.add(auditDTO);
		  }
		  return ResponseEntity.ok(auditDtoListObj);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateAudit")
	public ResponseEntity<AssetDTO> updateAudit(@RequestParam("id") Integer auditID, @RequestBody AuditDTO auditDtoObj)
			throws ResourceNotFoundException {
		Audit updatedAudit = this.auditServiceImpl.updateAudit(auditID, auditDtoObj);
		AssetDTO auditDTO = this.modelMapper.map(updatedAudit,AssetDTO.class);
		return ResponseEntity.ok(auditDTO);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findAllAudit")
	public ResponseEntity<List<AuditDTO>> findAllAudit() throws ResourceNotFoundException{
		List<Audit> auditList=this.auditServiceImpl.findAllAudit();
		List<AuditDTO> auditDtoList=new ArrayList<>();
		 for(Audit audit:auditList) {
			 AuditDTO auditDTO = this.modelMapper.map(audit, AuditDTO.class);
			 auditDtoList.add(auditDTO);
		 }
		  return ResponseEntity.ok(auditDtoList);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByAuditId")
	public ResponseEntity<AuditDTO> findByAuditId(@RequestParam("id") Integer auditID) throws ResourceNotFoundException{
		Audit audit=this.auditServiceImpl.findByAuditId(auditID);
		AuditDTO auditDTO=this.modelMapper.map(audit, AuditDTO.class);
		return ResponseEntity.ok(auditDTO);
		
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteByAuditId")
	public ResponseEntity<String> deleteAuditById(@RequestParam("id")Integer auditID) throws ResourceNotFoundException{
		this.auditServiceImpl.deleteAuditById(auditID);
		return ResponseEntity.ok("Audit ID "+auditID+" deleted.");
	}
}

