package com.hexa.assetapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexa.assetapp.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	
	 //Employee findByUsername(String username);
	 Employee findByUserEmail(String email);
	 
	 /*@Query("select e from Employee e JOIN e.user u where u.username = :empUsername")
	 Employee getEmployee(String empUsername);*/
	 
	 Employee findByUserUsername(String username);
	 

}
