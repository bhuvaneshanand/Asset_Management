package com.hexa.assetapp.service;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetapp.dto.AssetDTO;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.repository.AssetRepository;
@Service
public class AssetServiceImpl implements AssetService {
	@Autowired
	private AssetRepository assetRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Asset createAsset(AssetDTO assetObj) {
		Asset createAssetObj= this.modelMapper.map(assetObj, Asset.class);
		return this.assetRepository.save(createAssetObj);
	}

	@Override
	public List<Asset> findAllAsset() throws ResourceNotFoundException{
		List<Asset> findAssets = this.assetRepository.findAll();
		return findAssets;
	}

	@Override
	public Asset findByAssetID(int assetID) throws ResourceNotFoundException{
		Asset assetbyID = this.assetRepository.findById(assetID)
				.orElseThrow(() -> new ResourceNotFoundException("Employee","ID",assetID));
		return assetbyID;
	}
	
	@Override
	public List<Asset> findByCategory(String category) throws ResourceNotFoundException{
		List<Asset> assetbyID = this.assetRepository.findByassetCategory(category);
		
		 if (assetbyID.isEmpty()) {
		        throw new ResourceNotFoundException("Audit", "Asset ID", category);
		    }
		 
		return assetbyID;
	}

	@Override
	public void deleteByAseetId(int assetID) throws ResourceNotFoundException{
		this.assetRepository.deleteById(assetID);
	}

	@Override
	public List<Asset> findByStatus(String status) throws ResourceNotFoundException{
		List<Asset> assetListbyStatus=this.assetRepository.findByStatus(status);
		
		 if (assetListbyStatus.isEmpty()) {
		        throw new ResourceNotFoundException("Audit", "Asset ID", status);
		    }
		 
		return assetListbyStatus;
	}
	@Override
	public Asset updateAsset(int assetID, AssetDTO assetDtoObj) throws ResourceNotFoundException {

		Asset existingAsset = this.assetRepository.findById(assetID)
	            .orElseThrow(() -> new ResourceNotFoundException("Asset", "ID", assetID));
		
	    int existingAssetID = existingAsset.getAssetID();
	    this.modelMapper.map(assetDtoObj, existingAsset);
	    existingAsset.setAssetID(existingAssetID);
	    Asset updatedAsset = this.assetRepository.save(existingAsset);

	    return updatedAsset;
	}
}
