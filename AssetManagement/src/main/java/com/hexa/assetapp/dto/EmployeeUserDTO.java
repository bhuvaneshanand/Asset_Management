package com.hexa.assetapp.dto;

import com.hexa.assetapp.entities.Role;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class EmployeeUserDTO {


	@NotNull
	@Column(nullable = false, unique = true)
	private String username;

	private String password; 
	
	@NotNull
	@Email
	private String email;

	@Enumerated(EnumType.STRING)
	private Role role=Role.EMPLOYEE;
	
	@NotNull
	@Size(min = 2, max = 50)
	private String name;
	
	@NotNull
	@Pattern(regexp = "^(Male|Female|Other)$")
	private String gender;
	
	@NotNull
	private String contactNumber;


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
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


	
}
