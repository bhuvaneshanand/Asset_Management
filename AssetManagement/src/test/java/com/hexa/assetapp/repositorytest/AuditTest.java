package com.hexa.assetapp.repositorytest;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.Audit;
import com.hexa.assetapp.entities.AuditStatus;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.repository.AuditRepository;
import com.hexa.assetapp.repository.EmployeeRepository;

@SpringBootTest
public class AuditTest {
    @Autowired
    private AuditRepository auditRepository;
    
    @Autowired
    private AssetRepository assetRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    @Order(1)
    void creatingAudit(){
        Audit audit = new Audit();
        Asset asset = new Asset();
        Employee employee = new Employee();
		audit.setAuditStatus(AuditStatus.PENDING);
		audit.setDescription("slow");
		audit.setAuditDate("10-10-2024");
		asset.setAssetID(2);
		employee.setEmployeeID(2);
		
		this.auditRepository.save(audit);
    }
    
    @Test
    @Order(2)
    void findbyAuditId() {
    	int auditid= 1;
    	this.auditRepository.findById(auditid);
    }
    
    @Test
	@Order(3)
	void deleteAudit() {
		int auditid= 3;
		this.auditRepository.deleteById(auditid);
	}
    
    @Test
    @Order(4)
    void updateAudit() {
    	Integer auditid = 2;
        Optional<Audit> optionalAudit = auditRepository.findById(auditid);
        Audit audit = optionalAudit.get();
        audit.setAuditStatus(AuditStatus.VERIFIED);
        audit.setDescription("completed");
        audit.setAuditDate("10-10-2024");
        
        Audit updatedAudit = this.auditRepository.save(audit);
    }

}
