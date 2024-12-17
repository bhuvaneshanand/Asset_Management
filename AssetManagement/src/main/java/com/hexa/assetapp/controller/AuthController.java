package com.hexa.assetapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetapp.JwtUtil;
import com.hexa.assetapp.entities.User;
import com.hexa.assetapp.repository.UserRepository;
import com.hexa.assetapp.service.MyUserDetailsService;


@RestController
@RequestMapping("/api/v1/assetapp/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private MyUserDetailsService userDetailsService;
 
    @Autowired
    private JwtUtil jwtUtil;
    
	@Autowired
	private UserRepository userRepository;
    
    @PostMapping("/login")
    public Map<String, String> createAuthenticationToken(@RequestBody User authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        User user = userRepository.findByUsernameOrEmail(authenticationRequest.getUsername(), authenticationRequest.getUsername());
        if (user == null) {
            throw new Exception("User not found with username or email: " + authenticationRequest.getUsername());
        }
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        response.put("username", userDetails.getUsername());
        response.put("role", user.getRole().name());

        return response;
    }
}