package com.hexa.assetapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexa.assetapp.entities.Audit;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Integer>{

	@Query(value = "SELECT * FROM audit WHERE audit_status = :status", nativeQuery = true)
	List<Audit> findByAuditStatus(String status);
	
	List<Audit> findByEmployee_EmployeeID(Integer employeeID);
    List<Audit> findByAsset_AssetID(Integer assetID);
}
