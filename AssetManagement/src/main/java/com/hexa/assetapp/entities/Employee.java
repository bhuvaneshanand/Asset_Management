package com.hexa.assetapp.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "employee")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int employeeID;

	@NotNull
	@Size(min = 2, max = 50)
	private String name;
	
	@NotNull
	@Pattern(regexp = "^(Male|Female|Other)$")
	private String gender;
	
	@NotNull
	private String contactNumber;

	
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	
	@JsonManagedReference(value = "employee-serviceRequest")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="employeeID",referencedColumnName = "employeeID")
    private List<ServiceRequest> serviceRequests=new ArrayList<ServiceRequest>();
	
	@JsonManagedReference(value = "employee-assetallocation")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="employeeID",referencedColumnName = "employeeID")
    private List<AssetAllocation> assetAllocation =new ArrayList<AssetAllocation>();
	
	@JsonManagedReference(value = "employee-audit")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="employeeID",referencedColumnName = "employeeID")
    private List<Audit> audit =new ArrayList<Audit>();
	
	

	public List<Audit> getAudit() {
		return audit;
	}

	public void setAudit(List<Audit> audit) {
		this.audit = audit;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public int getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(int employeeID) {
		this.employeeID = employeeID;
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Employee(int employeeID, @NotNull @Size(min = 2, max = 50) String name,
			@NotNull @Pattern(regexp = "^(Male|Female|Other)$") String gender, @NotNull String contactNumber,
			LocalDateTime createdAt) {
		super();
		this.employeeID = employeeID;
		this.name = name;
		this.gender = gender;
		this.contactNumber = contactNumber;
		this.createdAt = createdAt;
	}

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
    

