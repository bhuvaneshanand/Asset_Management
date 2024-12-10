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
@Table(name = "servicerequest")
public class ServiceRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int requestID;
	
	@NotNull
	@Size(max = 300)
	private String description;

	@NotNull
	@Enumerated(EnumType.STRING)
	private IssueType issueType = IssueType.NO_ISSUE; // ENUM('Malfunction', 'Repair'),

	@NotNull
	@Enumerated(EnumType.STRING)
	private RequestStatus requestStatus = RequestStatus.PENDING; // ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String requestDate;
	
	@JsonBackReference(value = "asset-serviceRequest")
	@ManyToOne
    @JoinColumn(name = "assetID")
    private Asset asset;
	
	@JsonBackReference(value = "employee-serviceRequest")
	@ManyToOne
    @JoinColumn(name = "employeeID")
	private Employee employee;

	public int getRequestID() {
		return requestID;
	}

	public void setRequestID(int requestID) {
		this.requestID = requestID;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public IssueType getIssueType() {
		return issueType;
	}

	public void setIssueType(IssueType issueType) {
		this.issueType = issueType;
	}

	public RequestStatus getRequestStatus() {
		return requestStatus;
	}

	public void setRequestStatus(RequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
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


	public ServiceRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	

}
