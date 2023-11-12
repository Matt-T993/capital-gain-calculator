package com.fdmgroup.cgt_tracker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fdmgroup.cgt_tracker.dto.UserDetailDTO;
import com.fdmgroup.cgt_tracker.dto.UserRegisterDTO;
import com.fdmgroup.cgt_tracker.model.User;
import com.fdmgroup.cgt_tracker.repository.UserRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
        User user = findUserByEmailOrUsername(emailOrUsername)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email or username: " + emailOrUsername));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found with username: " + username));
    }

    public User getUser(Long userId) {
        return userRepository.findByUserId(userId).orElseThrow(
                () -> new EntityNotFoundException("User not found with userId: " + userId));
    }

    private Optional<User> findUserByEmailOrUsername(String emailOrUsername) {
        return userRepository.findByUsername(emailOrUsername)
                .or(() -> userRepository.findByEmail(emailOrUsername));
    }

    public User createUser(UserRegisterDTO userRegisterDTO) {

        if (userRegisterDTO.getUsername() == null || userRegisterDTO.getEmail() == null
                || userRegisterDTO.getPassword() == null) {
            throw new IllegalArgumentException("User fields cannot be empty.");
        }

        Optional<User> existingUserByUsername = userRepository.findByUsername(userRegisterDTO.getUsername());
        if (existingUserByUsername.isPresent()) {
            throw new EntityExistsException("User registration failed - Duplicate fields.");
        }

        Optional<User> existingUserByEmail = userRepository.findByEmail(userRegisterDTO.getEmail());
        if (existingUserByEmail.isPresent()) {
            throw new EntityExistsException("User registration failed - Duplicate fields.");
        }

        User user = new User();
        user.setUsername(userRegisterDTO.getUsername());
        user.setEmail(userRegisterDTO.getEmail());

        String encodedPassword = passwordEncoder.encode(userRegisterDTO.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public UserDetailDTO getUserDetailsDTO(String username) {
        User user = getUser(username);
        UserDetailDTO userDetailDTO = new UserDetailDTO();
        userDetailDTO.setUsername(user.getUsername());
        userDetailDTO.setEmail(user.getEmail());
        userDetailDTO.setPassword(user.getPassword());

        return userDetailDTO;
    }
    
    
    
    
    public User updateUserDetailsDTO(UserDetailDTO userDTO, UserDetailDTO newUserDTO) {
    	User userDTOinDatabase=userRepository.findByUsername(userDTO.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
    	
    	userDTOinDatabase.setUsername(newUserDTO.getUsername());
    	userDTOinDatabase.setEmail(newUserDTO.getEmail());
    	userDTOinDatabase.setPassword(newUserDTO.getPassword());
    	
    	return userRepository.save(userDTOinDatabase);
    }
    


}
