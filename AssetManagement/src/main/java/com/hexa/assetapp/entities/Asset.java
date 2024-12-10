package com.hexa.assetapp.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "asset")
public class Asset {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private AssetStatus status = AssetStatus.AVAILABLE; // ENUM('Available', 'Assigned', 'In Service') DEFAULT
														// 'Available',
	@JsonManagedReference(value = "asset-serviceRequest")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="assetID",referencedColumnName = "assetID")
	private List<ServiceRequest> serviceRequests=new ArrayList<ServiceRequest>();
	
	@JsonManagedReference(value = "asset-assetallocation")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="assetID",referencedColumnName = "assetID")
    private List<AssetAllocation> assetAllocation =new ArrayList<AssetAllocation>();
	
	@JsonManagedReference(value = "asset-audit")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="assetID",referencedColumnName = "assetID")
    private List<Audit> audit =new ArrayList<Audit>();

	public int getAssetID() {
		return assetID;
	}

	public void setAssetID(int assetID) {
		this.assetID = assetID;
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
	
	public List<Audit> getAudit() {
		return audit;
	}

	public void setAudit(List<Audit> audit) {
		this.audit = audit;
	}



	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Asset(int assetID, @NotNull @Size(min = 2, max = 20) String assetName, @NotNull String assetCategory,
			@NotNull String assetModel,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String manufacturingDate,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String expiryDate,
			@NotNull @Min(100) Long assetValue, @NotNull AssetStatus status, List<ServiceRequest> serviceRequests,
			List<AssetAllocation> assetAllocation, List<Audit> audit) {
		super();
		this.assetID = assetID;
		this.assetName = assetName;
		this.assetCategory = assetCategory;
		this.assetModel = assetModel;
		this.manufacturingDate = manufacturingDate;
		this.expiryDate = expiryDate;
		this.assetValue = assetValue;
		this.status = status;
		this.serviceRequests = serviceRequests;
		this.assetAllocation = assetAllocation;
		this.audit = audit;
	}
	public Asset(int assetID, String imgUrl,  @NotNull @Size(min = 2, max = 20) String assetName, @NotNull String assetCategory,
			@NotNull String assetModel,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String manufacturingDate,
			@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY") String expiryDate,
			@NotNull @Min(100) Long assetValue, @NotNull AssetStatus status, List<ServiceRequest> serviceRequests,
			List<AssetAllocation> assetAllocation, List<Audit> audit) {
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
		this.serviceRequests = serviceRequests;
		this.assetAllocation = assetAllocation;
		this.audit = audit;
	}
	

	public Asset() {
		super();
		// TODO Auto-generated constructor stub

	}



}
