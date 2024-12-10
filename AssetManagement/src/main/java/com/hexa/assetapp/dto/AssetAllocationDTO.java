package com.hexa.assetapp.dto;

import com.hexa.assetapp.entities.AllocationStatus;
import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.Employee;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AssetAllocationDTO {
	
	private int allocationID;

	@NotNull
	@Enumerated(EnumType.STRING)
	private AllocationStatus status = AllocationStatus.PROCESSING;; // ('Allocated','Returned')
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String allocationDate;
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String returnDate;

	@NotNull
	private Asset asset;
	
	@NotNull
	private Employee employee;

	public AllocationStatus getStatus() {
		return status;
	}

	public void setStatus(AllocationStatus status) {
		this.status = status;
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public AssetAllocationDTO(@NotNull AllocationStatus status) {
		super();
		this.status = status;
	}
	

	public int getAllocationID() {
		return allocationID;
	}

	public void setAllocationID(int allocationID) {
		this.allocationID = allocationID;
	}
	

	public String getAllocationDate() {
		return allocationDate;
	}

	public void setAllocationDate(String allocationDate) {
		this.allocationDate = allocationDate;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public AssetAllocationDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
