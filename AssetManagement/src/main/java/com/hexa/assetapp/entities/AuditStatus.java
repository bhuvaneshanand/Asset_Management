package com.hexa.assetapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AuditStatus {
	@JsonProperty("Pending")
	PENDING, 
	
	@JsonProperty("Verified")
	VERIFIED, 
	
	@JsonProperty("Rejected")
	REJECTED;
}
