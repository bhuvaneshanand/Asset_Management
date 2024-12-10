package com.hexa.assetapp.service;

import java.util.List;

import com.hexa.assetapp.dto.AuditDTO;
import com.hexa.assetapp.entities.Audit;
import com.hexa.assetapp.exception.ResourceNotFoundException;

public interface AuditService {
	
	public Audit createAudit(AuditDTO auditObj) throws ResourceNotFoundException;
	public List<Audit> findByEmployeeId(Integer employeeId) throws ResourceNotFoundException;
	public List<Audit> findByAssetId(Integer assetId) throws ResourceNotFoundException;
	public List<Audit> findByAuditStatus(String status) throws ResourceNotFoundException;
	public Audit updateAudit(int auditID, AuditDTO auditDtoObj) throws ResourceNotFoundException;
	public List<Audit> findAllAudit() throws ResourceNotFoundException;
	public Audit findByAuditId(int auditID) throws ResourceNotFoundException;
	public void deleteAuditById(int auditID) throws ResourceNotFoundException;


}