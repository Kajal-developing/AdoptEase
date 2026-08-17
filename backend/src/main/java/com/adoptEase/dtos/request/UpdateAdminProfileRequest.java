package com.adoptEase.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAdminProfileRequest {

    @NotBlank(message = "Name is required")
    private String userName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    @Pattern(
        regexp = "^[A-Za-z0-9._%+-]+@gmail\\.com$",
        message = "Email must be a valid @gmail.com address."
    )
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits."
    )
    private String contactNo;
}