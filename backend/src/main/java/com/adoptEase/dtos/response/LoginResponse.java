package com.adoptEase.dtos.response;

import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
	private Long userId;

    private String userName;

    private String email;

    private Role role;

    private String token;
    
    private ApprovalStatus approvalStatus;
}
