package com.hexa.assetapp.dto;

import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.AuditStatus;
import com.hexa.assetapp.entities.Employee;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuditDTO {
	
	private int auditID;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private AuditStatus auditStatus = AuditStatus.PENDING; 
	
	@Size(max = 200)
	private String description;
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String auditDate;
	
	@NotNull
	private Asset asset;
	
	@NotNull
	private Employee employee;

	public AuditStatus getAuditStatus() {
		return auditStatus;
	}

	public void setAuditStatus(AuditStatus auditStatus) {
		this.auditStatus = auditStatus;
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

	public AuditDTO(@NotNull AuditStatus auditStatus) {
		super();
		this.auditStatus = auditStatus;
	}

	public AuditDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getAuditID() {
		return auditID;
	}

	public void setAuditID(int auditID) {
		this.auditID = auditID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAuditDate() {
		return auditDate;
	}

	public void setAuditDate(String auditDate) {
		this.auditDate = auditDate;
	}
	
}
