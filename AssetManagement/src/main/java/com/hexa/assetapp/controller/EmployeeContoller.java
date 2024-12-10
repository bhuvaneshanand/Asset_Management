package com.hexa.assetapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetapp.dto.EmployeeDTO;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.service.EmployeeServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/assetapp/employee")
@ResponseBody
@CrossOrigin("*")
public class EmployeeContoller {


	private EmployeeServiceImpl employeeServiceImpl;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public EmployeeContoller(EmployeeServiceImpl employeeServiceImpl) {
		super();
		this.employeeServiceImpl = employeeServiceImpl;
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findByUsername")
	public ResponseEntity<EmployeeDTO> findByUsername(@RequestParam("username") String username) throws ResourceNotFoundException{
		Employee employee  = this.employeeServiceImpl.findByUsername(username);
		EmployeeDTO employeeDTO =this.modelMapper.map(employee, EmployeeDTO.class);
		
		return ResponseEntity.ok(employeeDTO);
	}	
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findByEmail")
	public ResponseEntity<EmployeeDTO> findByEmail(@RequestParam("email")String email) throws ResourceNotFoundException{
		Employee findByEmailObj = this.employeeServiceImpl.findByEmail(email);
		EmployeeDTO findByDtoEmailObj=this.modelMapper.map(findByEmailObj, EmployeeDTO.class);
		return ResponseEntity.ok(findByDtoEmailObj);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/findAllEmployee")
	public ResponseEntity<List<EmployeeDTO>> findAllEmployee() throws ResourceNotFoundException{
		List<Employee> findEmployeeObj = this.employeeServiceImpl.findAllEmployee();
		List<EmployeeDTO> findEmployeeDto = new ArrayList<>();
		for(Employee employee:findEmployeeObj) {
			EmployeeDTO employeeDTO=this.modelMapper.map(employee, EmployeeDTO.class);
			findEmployeeDto.add(employeeDTO);
		}
		return ResponseEntity.ok(findEmployeeDto);
		
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteByEmployeeId")
	public ResponseEntity<String> deleteByServiceRequestId(@RequestParam("id")Integer employeeID) throws ResourceNotFoundException{
		this.employeeServiceImpl.deleteByEmployeeId(employeeID);
		return ResponseEntity.ok("Employee ID "+employeeID+" deleted.");
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@PutMapping("/updateEmployee")
	public ResponseEntity<EmployeeDTO> updateEmployee(@RequestParam("id") int id, @RequestBody @Valid EmployeeDTO employeeDTO) throws ResourceNotFoundException{
		EmployeeDTO updatedEmployee =this.employeeServiceImpl.updateEmployee(id, employeeDTO);
		return ResponseEntity.ok(updatedEmployee);
	}
}
