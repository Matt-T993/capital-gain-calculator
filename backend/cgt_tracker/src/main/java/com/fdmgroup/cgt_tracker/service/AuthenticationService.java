package com.fdmgroup.cgt_tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fdmgroup.cgt_tracker.dto.UserLoginDTO;
import com.fdmgroup.cgt_tracker.model.User;

@Service
public class AuthenticationService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public User loginUser(UserLoginDTO userLoginDTO) {
        String emailOrUsername = userLoginDTO.getEmailOrUsername();
        String rawPassword = userLoginDTO.getPassword();

        UserDetails userDetails = userService.loadUserByUsername(emailOrUsername);

        if (passwordEncoder.matches(rawPassword, userDetails.getPassword())) {
            return userService.getUser(userDetails.getUsername());
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}
