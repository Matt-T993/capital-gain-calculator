package com.fdmgroup.cgt_tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "password")
public class UserLoginDTO {

    @NotBlank(message = "Email or Username cannot be blank")
    @Size(max = 50, message = "Email or Username cannot exceed 50 characters")
    private String emailOrUsername;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    private boolean rememberMe;
}
