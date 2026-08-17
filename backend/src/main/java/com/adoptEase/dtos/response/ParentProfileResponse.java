package com.adoptEase.dtos.response;

import java.math.BigDecimal;

import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.Gender;
import com.adoptEase.enums.MaritalStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParentProfileResponse {

    private Long userId;

    private String userName;

    private String email;

    private String contactNo;

    private String city;

    private String address;

    private ApprovalStatus approvalStatus;

    private Integer age;

    private String occupation;

    private BigDecimal annualIncome;

    private MaritalStatus maritalStatus;

    private String profilePhoto;

    private String housePhoto;

    private String familyPhoto;
    
    private Gender gender;
}