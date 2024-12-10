package com.hexa.assetapp.dto;


import java.util.List;

import com.hexa.assetapp.entities.AssetAllocation;
import com.hexa.assetapp.entities.AssetStatus;
import com.hexa.assetapp.entities.Audit;
import com.hexa.assetapp.entities.ServiceRequest;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AssetDTO {
	
	private int assetID;
	
	private String imgUrl;

	@NotNull
	@Size(min = 2, max = 20)
	private String assetName;

	@NotNull
	private String assetCategory;

	@NotNull
	private String assetModel;
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String manufacturingDate;

	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String expiryDate;

	@NotNull
	@Min(100)
	private Long assetValue;

	@NotNull
	@Enumerated(EnumType.STRING)
	private AssetStatus status = AssetStatus.AVAILABLE; // ENUM('Available', 'Assigned', 'In Service') DEFAULT 'Available',
	
	
	private List<ServiceRequest> serviceRequests;
	
	private List<AssetAllocation> assetAllocation; 

	public List<ServiceRequest> getServiceRequests() {
		return serviceRequests;
	}

	public void setServiceRequests(List<ServiceRequest> serviceRequests) {
		this.serviceRequests = serviceRequests;
	}
	
	public List<AssetAllocation> getAssetAllocation() {
		return assetAllocation;
	}

	public void setAssetAllocation(List<AssetAllocation> assetAllocation) {
		this.assetAllocation = assetAllocation;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public String getAssetCategory() {
		return assetCategory;
	}

	public void setAssetCategory(String assetCategory) {
		this.assetCategory = assetCategory;
	}

	public String getAssetModel() {
		return assetModel;
	}

	public void setAssetModel(String assetModel) {
		this.assetModel = assetModel;
	}

	public String getManufacturingDate() {
		return manufacturingDate;
	}

	public void setManufacturingDate(String manufacturingDate) {
		this.manufacturingDate = manufacturingDate;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public Long getAssetValue() {
		return assetValue;
	}

	public void setAssetValue(Long assetValue) {
		this.assetValue = assetValue;
	}

	public AssetStatus getStatus() {
		return status;
	}

	public void setStatus(AssetStatus status) {
		this.status = status;
	}

	public int getAssetID() {
		return assetID;
	}

	public void setAssetID(int assetID) {
		this.assetID = assetID;
	}
	
	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public AssetDTO(int assetID, @NotNull @Size(min = 2, max = 20) String assetName, @NotNull String assetCategory,
			@NotNull String assetModel,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String manufacturingDate,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String expiryDate,
			@NotNull @Min(100) Long assetValue, @NotNull AssetStatus status) {
		super();
		this.assetID = assetID;
		this.assetName = assetName;
		this.assetCategory = assetCategory;
		this.assetModel = assetModel;
		this.manufacturingDate = manufacturingDate;
		this.expiryDate = expiryDate;
		this.assetValue = assetValue;
		this.status = status;
	}
	
	public AssetDTO(int assetID, String imgUrl, @NotNull @Size(min = 2, max = 20) String assetName,
			@NotNull String assetCategory, @NotNull String assetModel,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String manufacturingDate,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String expiryDate,
			@NotNull @Min(100) Long assetValue, @NotNull AssetStatus status) {
		super();
		this.assetID = assetID;
		this.imgUrl = imgUrl;
		this.assetName = assetName;
		this.assetCategory = assetCategory;
		this.assetModel = assetModel;
		this.manufacturingDate = manufacturingDate;
		this.expiryDate = expiryDate;
		this.assetValue = assetValue;
		this.status = status;
	}

	public AssetDTO() {
		super();
		// TODO Auto-generated constructor stub
	}


}
