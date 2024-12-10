package com.hexa.assetapp.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetapp.dto.AuditDTO;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.Audit;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.repository.AuditRepository;
import com.hexa.assetapp.repository.EmployeeRepository;

@Service
public class AuditServiceImpl implements AuditService {
	
	@Autowired
	private AuditRepository auditRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private AssetRepository assetRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Audit createAudit(AuditDTO auditObj) throws ResourceNotFoundException {
	
		Asset asset = assetRepository.findById(auditObj.getAsset().getAssetID())
		        .orElseThrow(() -> new ResourceNotFoundException("Asset","ID",auditObj.getAsset().getAssetID()));
		
		Employee employee=employeeRepository.findById(auditObj.getEmployee().getEmployeeID())
				.orElseThrow(() -> new ResourceNotFoundException("Employee","ID",auditObj.getEmployee().getEmployeeID()));
		
		auditObj.setAsset(asset);
		auditObj.setEmployee(employee);
		
		Audit audit=this.modelMapper.map(auditObj, Audit.class);
		
		return this.auditRepository.save(audit);
		
	}
	
	@Override
	public List<Audit> findByEmployeeId(Integer employeeId) throws ResourceNotFoundException{
        List<Audit> auditObj = this.auditRepository.findByEmployee_EmployeeID(employeeId);
        if (auditObj.isEmpty()) {
	        throw new ResourceNotFoundException("Employee", "Asset ID", employeeId);
	    }
        return auditObj;
		
	}

	@Override
	public List<Audit> findByAssetId(Integer assetId) throws ResourceNotFoundException{
		 List<Audit> auditfindObj = this.auditRepository.findByAsset_AssetID(assetId);
		 if (auditfindObj.isEmpty()) {
		        throw new ResourceNotFoundException("Audit", "Asset ID", assetId);
		    }

		return auditfindObj;

	}

	@Override
	public List<Audit> findByAuditStatus(String status) throws ResourceNotFoundException{
		List<Audit> auditfindstatusObj = this.auditRepository.findByAuditStatus(status);
		
		 if (auditfindstatusObj.isEmpty()) {
		        throw new ResourceNotFoundException("Audit", "Asset ID", status);
		    }
		return auditfindstatusObj;

	}
	@Override
	public Audit updateAudit(int auditID, AuditDTO auditDtoObj) throws ResourceNotFoundException {

		Audit existingAudit = this.auditRepository.findById(auditID)
	            .orElseThrow(() -> new ResourceNotFoundException("Audit", "ID", auditID));
		
	    int existingAuditID = existingAudit.getAuditID();
	    this.modelMapper.map(auditDtoObj, existingAudit);
	    existingAudit.setAuditID(existingAuditID);
	    Audit updatedAudit = this.auditRepository.save(existingAudit);
	    return updatedAudit;
	}
	
	@Override
	public List<Audit> findAllAudit() throws ResourceNotFoundException{
		List<Audit> auditList = this.auditRepository.findAll();
		return auditList;
	}
	
	@Override
	public Audit findByAuditId(int auditID) throws ResourceNotFoundException{
		Audit audit = this.auditRepository.findById(auditID)
				.orElseThrow(() -> new ResourceNotFoundException("Audit","ID",auditID));
		return audit;
		
	}
	
	@Override
	public void deleteAuditById(int auditID) throws ResourceNotFoundException {
		 this.auditRepository.deleteById(auditID);
	}
		
}