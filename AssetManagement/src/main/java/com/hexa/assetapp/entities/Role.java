package com.hexa.assetapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Role {
	@JsonProperty("Admin")
	ADMIN, 
	
	@JsonProperty("Employee")
	EMPLOYEE;
}
