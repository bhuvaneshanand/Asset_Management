package com.hexa.assetapp.service;

import java.util.List;

import com.hexa.assetapp.dto.EmployeeDTO;
import com.hexa.assetapp.dto.EmployeeUserDTO;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.User;
import com.hexa.assetapp.exception.ResourceNotFoundException;

public interface EmployeeService {
	
	public Employee createEmployee(EmployeeUserDTO employeeObj);
	public Employee findByUsername(String username) throws ResourceNotFoundException;
	public Employee findByEmail(String email) throws ResourceNotFoundException;
	public List<Employee> findAllEmployee() throws ResourceNotFoundException;
	public void deleteByEmployeeId(int employeeID) throws ResourceNotFoundException;
	public EmployeeDTO updateEmployee(int employeeId, EmployeeDTO employeeDTO) throws ResourceNotFoundException;
	
}
