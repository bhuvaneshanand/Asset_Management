package com.hexa.assetapp.dto;

import com.hexa.assetapp.entities.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserDTO {
	private int id;
	@NotNull
    @Size(min = 5, max = 20)
    private String username;
	
	@NotNull
	@Email
	private String email;

    @NotNull
    @Size(min = 8)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role=Role.EMPLOYEE;


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
