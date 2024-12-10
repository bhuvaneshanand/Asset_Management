package com.hexa.assetapp.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexa.assetapp.dto.EmployeeDTO;
import com.hexa.assetapp.dto.EmployeeUserDTO;
import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.User;
import com.hexa.assetapp.exception.ResourceNotFoundException;
import com.hexa.assetapp.repository.EmployeeRepository;
import com.hexa.assetapp.repository.UserRepository;

@Service
public class EmployeeServiceImpl implements  EmployeeService{
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public Employee createEmployee(EmployeeUserDTO employeeObj) {
		Employee createEmployeeObj=this.modelMapper.map(employeeObj,Employee.class );
		User user=this.modelMapper.map(employeeObj,User.class);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user=userRepository.save(user);
		createEmployeeObj.setUser(user);
		return this.employeeRepository.save(createEmployeeObj);
	}

	@Override
	public Employee findByUsername(String username) throws ResourceNotFoundException{
		Employee employee = this.employeeRepository.findByUserUsername(username);
		
		 if (employee == null) {
			 
		        throw new ResourceNotFoundException("Employee", "Username", username);
		    }

		return employee;
	}
		

	@Override
	public Employee findByEmail(String email) throws ResourceNotFoundException{
		Employee employee = this.employeeRepository.findByUserEmail(email);
		if (employee == null) {
	        throw new ResourceNotFoundException("Employee", "email", email);
	    }
		
		return employee;
	}

	@Override
	public List<Employee> findAllEmployee() throws ResourceNotFoundException{
		List<Employee> findEmployeeObj = this.employeeRepository.findAll();
		if (findEmployeeObj == null) {
	        throw new ResourceNotFoundException();
	    }
		
		return findEmployeeObj;
	}
	
	@Override
	public void deleteByEmployeeId(int employeeID) throws ResourceNotFoundException{
		Employee employee = employeeRepository.findById(employeeID)
                .orElseThrow(() -> new ResourceNotFoundException("Employee","ID",employeeID));
		 employeeRepository.deleteById(employeeID);
		 userRepository.deleteById(employee.getUser().getId());
	}

	@Override
	public EmployeeDTO updateEmployee(int employeeId, EmployeeDTO employeeDTO) throws ResourceNotFoundException {
		Employee existingEmployee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee","ID", employeeId));
        modelMapper.map(employeeDTO, existingEmployee);
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return modelMapper.map(updatedEmployee, EmployeeDTO.class);
	}
	
}
