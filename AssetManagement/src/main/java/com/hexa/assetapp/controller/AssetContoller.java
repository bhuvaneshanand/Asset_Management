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
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.service.AssetServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/assetapp/asset")
@ResponseBody
@CrossOrigin("*")
public class AssetContoller {
    @Autowired
	private AssetServiceImpl assetServiceImpl;
	
	@Autowired
	private ModelMapper modelMapper;

	public AssetContoller(AssetServiceImpl assetServiceImpl) {
		super();
		this.assetServiceImpl= assetServiceImpl;
	}
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(value="/createAsset",consumes = "application/json")
	public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetDTO assetObj){
		Asset assetCreateObj=this.assetServiceImpl.createAsset(assetObj);
		AssetDTO assetDtoCreateObj=this.modelMapper.map(assetCreateObj, AssetDTO.class);
		return ResponseEntity.ok(assetDtoCreateObj);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findByAssetId")
	public ResponseEntity<AssetDTO> findByAssetId(@RequestParam("id") Integer assetId) throws ResourceNotFoundException{
		Asset assetObj=this.assetServiceImpl.findByAssetID(assetId);
		AssetDTO assetDtoObj=this.modelMapper.map(assetObj, AssetDTO.class);
		return ResponseEntity.ok(assetDtoObj);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findByStatus")
	public ResponseEntity<List<AssetDTO>>findByStatus(@RequestParam("status") String status) throws ResourceNotFoundException{
		List<Asset> assetStatusObj = this.assetServiceImpl.findByStatus(status);
		List<AssetDTO> assetDtoListObj2 = new ArrayList<>();
		  for(Asset asset: assetStatusObj) {
			  AssetDTO assetDTO = this.modelMapper.map(asset, AssetDTO.class);
			  assetDtoListObj2.add(assetDTO);
		  }
		  return ResponseEntity.ok(assetDtoListObj2);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findByCategory")
	public ResponseEntity<List<AssetDTO>> findByCategory(@RequestParam("category")String category) throws ResourceNotFoundException{
		List<Asset> assetbyCategory= this.assetServiceImpl.findByCategory(category);
		List<AssetDTO> listAssetDto = new ArrayList<>();
		for(Asset asset:assetbyCategory) {
			AssetDTO assetDtobyID=this.modelMapper.map(asset, AssetDTO.class);
			listAssetDto.add(assetDtobyID);
		}
		return ResponseEntity.ok(listAssetDto);
		
	}
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findAllAsset")
	public ResponseEntity<List<AssetDTO>> findAllAsset() throws ResourceNotFoundException{
		List<Asset> findAssetObj = this.assetServiceImpl.findAllAsset();
		List<AssetDTO> findAssetDtoObj = new ArrayList<>();
		for(Asset asset:findAssetObj) {
			AssetDTO assetDTO=this.modelMapper.map(asset, AssetDTO.class);
			findAssetDtoObj.add(assetDTO);
		}
		return ResponseEntity.ok(findAssetDtoObj);
		
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteByAseetId")
	public ResponseEntity<String> deleteByAseetId(@RequestParam("id")Integer assetID) throws ResourceNotFoundException{
		this.assetServiceImpl.deleteByAseetId(assetID);
		return ResponseEntity.ok("Asset ID "+assetID+" deleted.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateAsset")
	public ResponseEntity<AssetDTO> updateAsset(@RequestParam("id") Integer assetID, @RequestBody AssetDTO assetDtoObj)
			throws ResourceNotFoundException {
		Asset updatedAsset = this.assetServiceImpl.updateAsset(assetID, assetDtoObj);
		AssetDTO assetDTO = this.modelMapper.map(updatedAsset,AssetDTO.class);
		return ResponseEntity.ok(assetDTO);
	}

}
