package com.fdmgroup.cgt_tracker.config;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import jakarta.annotation.PostConstruct;

@Service
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private Algorithm algorithm;

    private Set<String> tokenBlacklist = Collections.synchronizedSet(new HashSet<>());

    @PostConstruct
    public void init() {
        algorithm = Algorithm.HMAC256(jwtSecret);
    }

    public String createSessionToken(String username) {
        Instant expirationTime = Instant.now().plus(24, ChronoUnit.HOURS);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(Date.from(expirationTime))
                .sign(algorithm);
    }

    public String createRememberMeToken(String username) {
        Instant expirationTime = Instant.now().plus(30, ChronoUnit.DAYS);
        return JWT.create()
                .withSubject(username)
                .withClaim("rememberMe", true)
                .withExpiresAt(Date.from(expirationTime))
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token) throws JWTVerificationException {
        if (tokenBlacklist.contains(token)) {
            throw new JWTVerificationException("Token is no longer valid");
        }
        return JWT.require(algorithm).build().verify(token);
    }

    public String extractUsername(String token) {
        return verifyToken(token).getSubject();
    }

    public boolean isRememberMeToken(String token) {
        return verifyToken(token).getClaim("rememberMe").asBoolean();
    }

    public boolean isTokenExpired(String token) {
        Date expiryDate = verifyToken(token).getExpiresAt();
        return expiryDate.before(new Date());
    }

    public boolean isRememberMeTokenValid(String token) {
        return !isTokenExpired(token) && isRememberMeToken(token);
    }

    public void invalidateToken(String token) {
        tokenBlacklist.add(token);
    }
    
 


}
