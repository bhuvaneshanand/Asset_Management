package com.hexa.assetapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum IssueType {
	@JsonProperty("Malfunction")
	MALFUNCTION, 
	
	@JsonProperty("Repair")
	REPAIR, 
	
	@JsonProperty("No Issue")
	NO_ISSUE;
	
}
