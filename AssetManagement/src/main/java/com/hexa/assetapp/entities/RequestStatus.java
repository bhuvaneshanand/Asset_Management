package com.hexa.assetapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum RequestStatus {
	@JsonProperty("Pending")
	PENDING, 
	
	@JsonProperty("In Progress")
	IN_PROGRESS, 
	
	@JsonProperty("Completed")
	COMPLETED;
}
