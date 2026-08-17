package com.adoptEase.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCenterProfileRequest {

    @NotBlank
    private String centerName;

    @NotBlank
    private String description;

    @NotBlank
    private String address;

    @NotBlank
    private String city;

    private Double latitude;

    private Double longitude;

    @NotBlank
    private String contactNo;

    @NotBlank
    private String email;

    @NotBlank
    private String licenseNumber;
}