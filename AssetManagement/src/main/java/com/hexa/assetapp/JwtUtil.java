package com.hexa.assetapp;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component //This registers JwtUtilty with spring
public class JwtUtil {
	
	private String SECRET_KEY = "secret";
	
	//This method is used to extract user name from the token that will come from the UI.
	//This happens automatically with spring security HTTP basic .
	public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
	
	//This method will set the expiry date of the token usually it is 3 days (3*24*60*30 seconds)
	public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
	
	//This method resolves the  claim placed by UI developer while giving the token.
	//This claim must also be registered with overall Claims class.
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		//Extract the claims basis given token.
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
	
	//This method 1st encodes the  secret key using the base64 encoder and parses it to create a stronger token.
	//Such methods are called as helper methods
	private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(Base64.getEncoder().encodeToString(SECRET_KEY.getBytes())).parseClaimsJws(token).getBody();
    }
	
	private String createToken(Map<String, Object> claims, String subject) {
		 
        return Jwts.builder()
        		//this is called as builder-design pattern which we are using to build jwt objects
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3*24*60*60*1000)) // Adding 3 days in milliseconds
                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(SECRET_KEY.getBytes()))
                .compact();
    }
	
	//This will generate the token basis username
	public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }
	
	//Checks whether  the token is valid or expired
	private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
	
	//This is to validate the token when it comes from the UI.
	public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
 
}














