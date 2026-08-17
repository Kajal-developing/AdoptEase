package com.adoptEase.dtos.request;

import java.math.BigDecimal;

import com.adoptEase.enums.Gender;
import com.adoptEase.enums.MaritalStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateParentProfileRequest {

    @NotBlank
    private String userName;

    @NotBlank
    private String contactNo;

    @NotBlank
    private String city;

    @NotBlank
    private String address;

    @NotNull
    private Integer age;

    @NotNull
    private Gender gender;

    @NotBlank
    private String occupation;

    @NotNull
    private BigDecimal annualIncome;

    @NotNull
    private MaritalStatus maritalStatus;

}