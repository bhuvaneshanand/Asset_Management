package com.hexa.assetapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hexa.assetapp.entities.User;


public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);
	User findByEmail(String email);
	
	@Query("select u from User u where u.username = :username")
	User getUserByUsername(String username);

}