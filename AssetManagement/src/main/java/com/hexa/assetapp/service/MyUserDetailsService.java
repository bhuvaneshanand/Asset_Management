package com.hexa.assetapp.service;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.hexa.assetapp.entities.User;
import com.hexa.assetapp.repository.UserRepository;



@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	
	@Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User userInfo = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        
        	if (userInfo == null) {
        		throw new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail);
        	}
        
        String roleName ="ROLE_"+userInfo.getRole().name(); 

        return new org.springframework.security.core.userdetails.User(
                userInfo.getUsername(),
                userInfo.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
        
    }
}