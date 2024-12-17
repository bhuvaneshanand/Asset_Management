package com.hexa.assetapp.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetapp.dto.EmployeeDTO;
import com.hexa.assetapp.dto.EmployeeUserDTO;
import com.hexa.assetapp.dto.UserDTO;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.service.EmployeeServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/assetapp/auth")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private EmployeeServiceImpl employeeServiceImpl;

	@Autowired
	private ModelMapper modelMapper;
	
	    @PostMapping("/signup")
	    public ResponseEntity<EmployeeDTO> signup(@Valid @RequestBody EmployeeUserDTO employeeObj) {
			
			Employee createEmployeeObj=this.employeeServiceImpl.createEmployee(employeeObj);
			EmployeeDTO createEmployeeDtoObj=this.modelMapper.map(createEmployeeObj, EmployeeDTO.class);
			UserDTO userdto=this.modelMapper.map(employeeObj,UserDTO.class);
			
			createEmployeeDtoObj.setUser(userdto);
			return ResponseEntity.ok(createEmployeeDtoObj);
			
		}
	    
}

