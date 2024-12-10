package com.hexa.assetapp.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "assetallocation")
public class AssetAllocation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int allocationID;

	@NotNull
	@Enumerated(EnumType.STRING)
	private AllocationStatus status=AllocationStatus.PROCESSING; // ('Allocated','Processing','Returned')
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String allocationDate;
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String returnDate;
	
	@JsonBackReference(value = "employee-assetallocation")
	@ManyToOne
    @JoinColumn(name = "employeeID")
    private Employee employee;

	@JsonBackReference(value = "asset-assetallocation")
    @ManyToOne
    @JoinColumn(name = "assetID")
    private Asset asset;

	public int getAllocationID() {
		return allocationID;
	}

	public void setAllocationID(int allocationID) {
		this.allocationID = allocationID;
	}

	public AllocationStatus getStatus() {
		return status;
	}

	public void setStatus(AllocationStatus status) {
		this.status = status;
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

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	public AssetAllocation() {
		super();
		// TODO Auto-generated constructor stub
	}
	
  
}