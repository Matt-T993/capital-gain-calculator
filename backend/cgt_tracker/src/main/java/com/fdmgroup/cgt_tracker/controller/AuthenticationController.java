package com.fdmgroup.cgt_tracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.cgt_tracker.config.CookieUtil;
import com.fdmgroup.cgt_tracker.config.JwtUtil;
import com.fdmgroup.cgt_tracker.dto.UserLoginDTO;
import com.fdmgroup.cgt_tracker.model.User;
import com.fdmgroup.cgt_tracker.service.AuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CookieUtil cookieUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody @Valid UserLoginDTO userLoginDTO,
            HttpServletResponse response) {
        try {
            User user = authenticationService.loginUser(userLoginDTO);
            String sessionToken = jwtUtil.createSessionToken(user.getUsername());

            Cookie sessionCookie = cookieUtil.createCookie("SESSION-TOKEN", sessionToken);
            response.addCookie(sessionCookie);
            Map<String, Object> responseBody = new HashMap<>();
            
            if (userLoginDTO.isRememberMe()) {
                String rememberMeToken = jwtUtil.createRememberMeToken(user.getUsername());
                Cookie rememberMeCookie = cookieUtil.createCookie("REMEMBER-ME-TOKEN", rememberMeToken);
                response.addCookie(rememberMeCookie);
                responseBody.put("rememberMeToken", rememberMeToken);
            }

            responseBody.put("sessionToken", sessionToken);
            responseBody.put("username", user.getUsername());
            responseBody.put("email", user.getEmail());

            return new ResponseEntity<Map<String, Object>>(responseBody, HttpStatus.OK);
        } catch (BadCredentialsException ex) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid credentials");

            return new ResponseEntity<Map<String, Object>>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> tokens = cookieUtil.getTokensFromCookies(request.getCookies());
       

        String sessionToken = tokens.get("sessionToken");
        String rememberMeToken = tokens.get("rememberMeToken");


        if (sessionToken != null) {
            jwtUtil.invalidateToken(sessionToken);
            cookieUtil.invalidateCookie(response, "SESSION-TOKEN");
        }
        if (rememberMeToken != null) {
            jwtUtil.invalidateToken(rememberMeToken);
            cookieUtil.invalidateCookie(response, "REMEMBER-ME-TOKEN");
        }

        if (sessionToken != null || rememberMeToken != null) {
        	  System.out.println("Log out succuessful");
            return ResponseEntity.ok().body("Logged out successfully");
          
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Logout failed");
    }
}
