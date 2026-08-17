package com.adoptEase.dtos.request;

import java.math.BigDecimal;

import com.adoptEase.enums.Gender;
import com.adoptEase.enums.MaritalStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
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
public class RegisterParentRequest {
	
	// User Details
    @NotBlank(message = "Name is required")
    private String userName;

    @NotBlank(message = "Email is required.")
    @Email(message = "Please enter a valid email address.")
    @Pattern(
        regexp = "^[A-Za-z0-9._%+-]+@gmail\\.com$",
        message = "Email must be a valid @gmail.com address."
    )
    private String email;

    @NotBlank(message = "Password is required.")
    @Pattern(
        regexp = "^(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,}$",
        message = "Password must contain at least 8 characters, one number and one special character."
    )
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

    // Parent Profile Details
    @NotNull(message = "Age is required")
    @Min(value = 21, message = "Age must be at least 21")
    private Integer age;

    @NotBlank(message = "Occupation is required")
    private String occupation;

    @NotNull(message = "Annual income is required")
    private BigDecimal annualIncome;

    @NotNull(message = "Marital status is required")
    private MaritalStatus maritalStatus;
    
    @NotNull(message = "Gender is required")
    private Gender gender;
}
