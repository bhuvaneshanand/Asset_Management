package com.hexa.assetapp.service;

import java.util.List;

import com.hexa.assetapp.dto.AssetDTO;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.exception.ResourceNotFoundException;



public interface AssetService {

	public Asset createAsset(AssetDTO assetObj);
	public List<Asset> findAllAsset() throws ResourceNotFoundException;
	public Asset findByAssetID(int assetID) throws ResourceNotFoundException;
	public void deleteByAseetId(int assetID) throws ResourceNotFoundException;
	public List<Asset> findByStatus(String status) throws ResourceNotFoundException;
	public List<Asset> findByCategory(String category) throws ResourceNotFoundException;
	public Asset updateAsset(int assetID, AssetDTO assetDtoObj) throws ResourceNotFoundException;
}
