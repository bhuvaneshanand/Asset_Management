package com.hexa.assetapp.dto;

import java.util.List;

import com.hexa.assetapp.entities.AssetAllocation;
import com.hexa.assetapp.entities.Role;
import com.hexa.assetapp.entities.ServiceRequest;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class EmployeeDTO {
	
	private int employeeID;
	
	@NotNull
	@Size(min = 2, max = 50)
	private String name;
	
	@NotNull
	@Pattern(regexp = "^(Male|Female|Other)$")
	private String gender;
	
	@NotNull
	private String contactNumber;

	/*@NotNull
	@Email
	private String email;*/
	
	private List<ServiceRequest> serviceRequests;
	
	private List<AssetAllocation> assetAllocation ;
	
    private UserDTO user;
    

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
	 
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public int getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(int employeeID) {
		this.employeeID = employeeID;
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

	public EmployeeDTO(@NotNull @Size(min = 2, max = 50) String name,
			@NotNull @Pattern(regexp = "^(Male|Female|Other)$") String gender, @NotNull String contactNumber) {
		super();
		this.name = name;
		this.gender = gender;
		this.contactNumber = contactNumber;
	}

	public EmployeeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
