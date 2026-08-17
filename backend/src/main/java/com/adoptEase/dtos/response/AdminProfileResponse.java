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
public class AdminProfileResponse {

    private Long userId;

    private String userName;

    private String email;

    private String contactNo;

    private String address;

    private String city;

    private Role role;

    private ApprovalStatus approvalStatus;
}