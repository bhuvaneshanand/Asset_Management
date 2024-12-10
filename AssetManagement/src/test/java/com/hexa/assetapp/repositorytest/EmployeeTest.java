package com.hexa.assetapp.repositorytest;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetapp.entities.Employee;
import com.hexa.assetapp.entities.Role;
import com.hexa.assetapp.entities.User;
import com.hexa.assetapp.repository.EmployeeRepository;
import com.hexa.assetapp.repository.UserRepository;
import com.hexa.assetapp.service.EmployeeServiceImpl;

@SpringBootTest
public class EmployeeTest {
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmployeeServiceImpl employeeServiceimpl;

    @Test
    @Order(1)
    void saveTest(){

        Employee employee = new Employee();
        User user= new User();
  
        employee.setName("John Doe");
        employee.setGender("Male");
        employee.setContactNumber("1234567890");
        user.setEmail("john.doe@example.com");
        user.setUsername("johndoe");
        user.setPassword("password123");
        user.setRole(Role.EMPLOYEE);
        this.employeeRepository.save(employee);
        this.userRepository.save(user);

    }

    @Test
    @Order(2)
    void findByName(){
        String name = "johndoe";
        Employee employee = this.employeeRepository.findByUserEmail(name);
    }
    
    @Test
    @Order(3)
    void findByEmail(){
        String email = "john.doe@example.com";
        Employee employee = this.employeeRepository.findByUserEmail(email);
    }

    @Test
    @Order(4)
    void findAll(){
        List<Employee> employeeList = this.employeeRepository.findAll();
    }
    
    @Test
	@Order(5)
	void deleteEmployee() {
		int employeeId = 1;
		this.employeeRepository.deleteById(employeeId);
	}
    
    @Test
    @Order(6)
    void updateEmployee() {
        Integer employeeID = 2;
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        Employee employee = optionalEmployee.get();
        employee.setName("John");
        employee.setGender("Male");
        employee.setContactNumber("1234567890");
        
        Employee updatedEmployee = this.employeeRepository.save(employee);
}
}