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

import com.hexa.assetapp.dto.AssetAllocationDTO;
import com.hexa.assetapp.entities.AssetAllocation;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.service.AssetAllocationServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/assetapp/assetallocation")
@ResponseBody
@CrossOrigin("*")
public class AssetAllocationController {
    @Autowired
	private AssetAllocationServiceImpl assetAllocationServiceImpl;
	
	@Autowired
	private ModelMapper modelMapper;

	public AssetAllocationController(AssetAllocationServiceImpl assetAllocationServiceImpl) {
		super();
		this.assetAllocationServiceImpl = assetAllocationServiceImpl;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(value="/createAssetAllocation",consumes = "application/json")
	public ResponseEntity<AssetAllocationDTO> createAssetAllocation(@Valid @RequestBody AssetAllocationDTO assetAllocationObj) throws ResourceNotFoundException {
		
		AssetAllocation assetAllocationCreateObj=this.assetAllocationServiceImpl.createAssetAllocation(assetAllocationObj);
		AssetAllocationDTO assetAllocationDtoCreateObj=this.modelMapper.map(assetAllocationCreateObj, AssetAllocationDTO.class);
		return ResponseEntity.ok(assetAllocationDtoCreateObj);
		
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByEmployeeId")
	public ResponseEntity<List<AssetAllocationDTO>> findByEmployeeId(@RequestParam("id") Integer employeeId) throws ResourceNotFoundException{
        List<AssetAllocation> assetAllocationObj = this.assetAllocationServiceImpl.findByEmployeeId(employeeId);
        List<AssetAllocationDTO> assetAllocationDtoListObj = new ArrayList<>();
        for(AssetAllocation assetAllocation: assetAllocationObj) {
        	AssetAllocationDTO assetAllocationDTO = this.modelMapper.map(assetAllocation, AssetAllocationDTO.class);
        	assetAllocationDtoListObj.add(assetAllocationDTO);
		}
        
        return ResponseEntity.ok(assetAllocationDtoListObj); 
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByAssetId")
	public ResponseEntity<List<AssetAllocationDTO>> findByAssetId(@RequestParam("id") Integer assetId) throws ResourceNotFoundException{
        List<AssetAllocation> listAssetAllocationObj1 = this.assetAllocationServiceImpl.findByAssetId(assetId);
        List<AssetAllocationDTO> assetAllocationDtoListObj1 = new ArrayList<>();
        for(AssetAllocation assetAllocation: listAssetAllocationObj1) {
        	AssetAllocationDTO assetAllocationDTO = this.modelMapper.map(assetAllocation, AssetAllocationDTO.class);
        	assetAllocationDtoListObj1.add(assetAllocationDTO);
		}
        
        return ResponseEntity.ok(assetAllocationDtoListObj1);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findAssetAllocationById")
	public ResponseEntity<AssetAllocationDTO> findAssetAllocationById(@RequestParam("id") Integer allocationId) throws ResourceNotFoundException{
		AssetAllocation assetAllocationObj2 = this.assetAllocationServiceImpl.findAssetAllocationById(allocationId);
		AssetAllocationDTO assetAllocationDtoObj2 = this.modelMapper.map(assetAllocationObj2, AssetAllocationDTO.class);
		return ResponseEntity.ok(assetAllocationDtoObj2);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateAssetAllocation")
	public ResponseEntity<AssetAllocationDTO> updateAssetAllocation(@RequestParam("id") Integer allocationId, @RequestBody AssetAllocationDTO assetAllocationDto)
			throws ResourceNotFoundException {
		AssetAllocation updatedAssetAllocation = this.assetAllocationServiceImpl.updateAssetAllocation(allocationId, assetAllocationDto);
		AssetAllocationDTO assetAllocationDTO = this.modelMapper.map(updatedAssetAllocation,AssetAllocationDTO.class);
		return ResponseEntity.ok(assetAllocationDTO);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findAllAssetAllocation")
	public ResponseEntity<List<AssetAllocationDTO>>findAllAssetAllocation() throws ResourceNotFoundException{
		List<AssetAllocation> allAllocation=this.assetAllocationServiceImpl.findAllAssetAllocation();
		List<AssetAllocationDTO> allAllocationDto=new ArrayList<>();
		for (AssetAllocation assetAllocation : allAllocation) {
			AssetAllocationDTO assetAllocationDTO=this.modelMapper.map(assetAllocation, AssetAllocationDTO.class);
			allAllocationDto.add(assetAllocationDTO);
		}
		return ResponseEntity.ok(allAllocationDto);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteByAllocationId")
	public ResponseEntity<String> deleteByAseetId(@RequestParam("id") Integer allocationId) throws ResourceNotFoundException{
		this.assetAllocationServiceImpl.deleteByAllocationId(allocationId);
		return ResponseEntity.ok("Asset Allocation ID "+allocationId+" deleted.");
	}
}