package com.hexa.assetapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexa.assetapp.entities.Asset;


@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer>{
	
	@Query(value = "SELECT * FROM asset WHERE status = :status", nativeQuery = true)
	List<Asset> findByStatus(String status);
	
	List<Asset> findByassetCategory(String category);
	
}