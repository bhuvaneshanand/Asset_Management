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
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "audit")
public class Audit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int auditID;

	@NotNull
	@Enumerated(EnumType.STRING)
	private AuditStatus auditStatus = AuditStatus.PENDING; // ('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',

	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String auditDate;
	
	@Size(max = 200)
	private String description;
	
	@JsonBackReference(value = "asset-audit")
	@ManyToOne
    @JoinColumn(name = "assetID")
    private Asset asset;

	@JsonBackReference(value = "employee-audit")
	@ManyToOne
    @JoinColumn(name = "employeeID")
	private Employee employee;

	public int getAuditID() {
		return auditID;
	}

	public void setAuditID(int auditID) {
		this.auditID = auditID;
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}
	

	public AuditStatus getAuditStatus() {
		return auditStatus;
	}

	public void setAuditStatus(AuditStatus auditStatus) {
		this.auditStatus = auditStatus;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public void setAuditDate(String auditDate) {
		this.auditDate = auditDate;
	}

	public Audit() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}