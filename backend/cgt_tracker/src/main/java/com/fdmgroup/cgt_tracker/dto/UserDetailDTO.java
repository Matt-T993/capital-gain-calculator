package com.fdmgroup.cgt_tracker.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserDetailDTO {
    @NotNull
    private String username;

    @NotNull
    private String email;
    
    @NotNull
    private String password;
}
