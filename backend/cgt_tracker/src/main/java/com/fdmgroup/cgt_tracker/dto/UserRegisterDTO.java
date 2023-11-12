package com.fdmgroup.cgt_tracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "password")
public class UserRegisterDTO {

    @NotBlank(message = "Username cannot be blank")
    @NotNull
    @Size(max = 25, message = "Username cannot exceed 25 characters")
    private String username;

    @Email(message = "Must be a valid email address")
    @NotBlank(message = "Email cannot be blank")
    @Size(max = 50, message = "Email cannot exceed 50 characters")
    @NotNull
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @NotNull
    private String password;
}
