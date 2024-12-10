package com.hexa.assetapp.dto;



import com.hexa.assetapp.entities.Asset;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.IssueType;
import com.hexa.assetapp.entities.RequestStatus;
import com.hexa.assetapp.entities.ServiceRequest;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ServiceRequestDTO {
	
	private int requestID;

	@NotNull
	@Size(max = 300)
	private String description;

	@NotNull
	@Enumerated(EnumType.STRING)
	private IssueType issueType = IssueType.NO_ISSUE;

	@NotNull
	@Enumerated(EnumType.STRING)
	private RequestStatus requestStatus = RequestStatus.PENDING;
	
	@Pattern(regexp = "\\d{2}-\\d{2}-\\d{4}", message = "Format DD-MM-YYYY")
	private String requestDate;

	private Asset asset;
	
	private Employee employee;

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
	

	public int getRequestID() {
		return requestID;
	}

	public void setRequestID(int requestID) {
		this.requestID = requestID;
	}
	

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}

	public ServiceRequestDTO() {
		super();
	}


}
