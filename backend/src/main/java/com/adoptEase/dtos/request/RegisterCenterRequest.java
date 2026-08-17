package com.adoptEase.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterCenterRequest {

    // User Details

    @NotBlank(message = "Center admin name is required")
    private String userName;

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Contact number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Contact number must contain exactly 10 digits."
    )
    private String contactNo;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    // Adoption Center Details

    @NotBlank(message = "Center name is required")
    private String centerName;

    @NotBlank(message = "License number is required")
    private String licenseNo;

    @NotBlank(message = "Description is required")
    private String description;
  
    private Double latitude;

    private Double longitude;
}