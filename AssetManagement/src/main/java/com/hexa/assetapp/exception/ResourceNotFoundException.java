package com.hexa.assetapp.exception;

public class ResourceNotFoundException extends Exception {
	
	private String resourceName;
	private String fieldName;
	private Integer fieldValue;
	private String fieldvalue;
	
	public ResourceNotFoundException(String resourceName, String fieldName, Integer integer) {
		super();
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = integer;
	}
	
	public ResourceNotFoundException(String resourceName, String fieldName, String string) {
		super();
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldvalue = string;
	}

	public ResourceNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getMessage() {
		return this.resourceName+" is not found with " +this.fieldName+" value "+this.fieldValue;
	}
	
}
