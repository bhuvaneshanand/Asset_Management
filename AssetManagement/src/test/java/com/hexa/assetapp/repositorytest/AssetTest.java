package com.hexa.assetapp.repositorytest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetapp.dto.AssetDTO;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.AssetStatus;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.repository.AssetRepository;
import com.hexa.assetapp.service.AssetServiceImpl;

@SpringBootTest
public class AssetTest {

	@Autowired
	private AssetRepository assetRepository;
	
	@Autowired
	private AssetServiceImpl assetServiceImpl;

	@Test
	@Order(1)
	void createAssetTest() {

		Asset asset = new Asset();

		asset.setAssetName("Laptop");
		asset.setAssetCategory("Hardware");
		asset.setAssetModel("Dell");
		asset.setManufacturingDate("19-09-2005");
		asset.setExpiryDate("15-09-2009");
		asset.setAssetValue(800L);
		asset.setStatus(AssetStatus.AVAILABLE);

		this.assetRepository.save(asset);

	}

	@Test
	@Order(1)
	void findAllAsset() {
      
	}

	@Test
	@Order(2)
	void findByAssetID() {
		int id=1;
		Asset assetObj=this.assetRepository.findById(1).get();
		
	}

	@Test
	@Order(3)
	void findByCategory() {
		String category="Hardware";
		List<Asset> assetObj=this.assetRepository.findByassetCategory(category);
	}

	@Test
	@Order(4)
	void findByStatus() {
		
		String status="AVAILABLE";
		List<Asset> assetObj=this.assetRepository.findByassetCategory(status);
	}
	
	@Test
	@Order(5)
	void deleteByAssetIdTest() {
	    Asset asset = new Asset();
	    asset.setAssetName("Monitor");
	    asset.setAssetCategory("Hardware");
	    asset.setAssetModel("HP");
	    asset.setManufacturingDate("01-01-2020");
	    asset.setExpiryDate("01-01-2025");
	    asset.setAssetValue(500L);
	    asset.setStatus(AssetStatus.AVAILABLE);
	    asset = this.assetRepository.save(asset);
	    int assetId = asset.getAssetID(); 
	    this.assetRepository.deleteById(assetId);
	    Optional<Asset> deletedAsset = this.assetRepository.findById(assetId);
	    assertFalse(deletedAsset.isPresent(), "Asset should be deleted but still exists.");
	}
	
	@Test
	@Order(6)
	void updateAssetTest() throws ResourceNotFoundException {
	    Asset asset = new Asset();
	    asset.setAssetName("Printer");
	    asset.setAssetCategory("Hardware");
	    asset.setAssetModel("Canon");
	    asset.setManufacturingDate("01-05-2019");
	    asset.setExpiryDate("01-05-2024");
	    asset.setAssetValue(300L);
	    asset.setStatus(AssetStatus.AVAILABLE);
	    
	    asset = this.assetRepository.save(asset);
	    int assetId = asset.getAssetID();  
	    AssetDTO assetDto = new AssetDTO();
	    assetDto.setAssetName("Updated Printer");
	    assetDto.setAssetCategory("Updated Hardware");
	    assetDto.setAssetModel("Updated Canon");
	    assetDto.setManufacturingDate("01-01-2020");
	    assetDto.setExpiryDate("01-01-2025");
	    assetDto.setAssetValue(400L);
	    assetDto.setStatus(AssetStatus.AVAILABLE);
	    Asset updatedAsset = this.assetServiceImpl.updateAsset(assetId, assetDto);
	    
	}

}
