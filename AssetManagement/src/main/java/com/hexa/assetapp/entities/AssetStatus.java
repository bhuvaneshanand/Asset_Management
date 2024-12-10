package com.hexa.assetapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AssetStatus {
	@JsonProperty("Available")
	AVAILABLE, 
	
	@JsonProperty("Assigned")
	ASSIGNED, 
	
	@JsonProperty("In Service")
	IN_SERVICE;
}

