package com.hexa.assetapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AllocationStatus {
	@JsonProperty("Allocated")
	ALLOCATED,
	
	@JsonProperty("Processing")
	PROCESSING,
	
	@JsonProperty("Returned")
	RETURNED;
}

