package com.adoptEase.dtos.response;

import com.adoptEase.enums.MaritalStatus;

import java.math.BigDecimal;

import com.adoptEase.enums.ApprovalStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentResponse {

    // User Details
    private Long userId;

    private String userName;

    private String email;

    private String contactNo;

    private String address;

    private String city;

    private ApprovalStatus approvalStatus;

    // Parent Profile Details
    private Integer age;

    private String occupation;

    private BigDecimal annualIncome;

    private MaritalStatus maritalStatus;

    private String profilePhoto;

    private String housePhoto;

    private String familyPhoto;
}