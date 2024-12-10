package com.hexa.assetapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexa.assetapp.entities.ServiceRequest;


@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Integer> {
	
	@Query(value = "SELECT * FROM servicerequest WHERE request_status = :status", nativeQuery = true)
	List<ServiceRequest> findByRequestStatus(String status);
	List<ServiceRequest> findByEmployee_EmployeeID(Integer employeeId);
    List<ServiceRequest> findByAsset_AssetID(Integer assetID);
    @Query("SELECT sr FROM ServiceRequest sr JOIN FETCH sr.asset")
    List<ServiceRequest> findAllWithAssets();
    
}
