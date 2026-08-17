package com.adoptEase.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionCenterResponse {

    // User Details
    private Long centerId;

    private String centerAdminName;

    private String email;

    private String contactNo;

    private String address;

    private String city;

    // Adoption Center Details
    private String centerName;

    private String licenseNo;

    private String description;

    private Double latitude;

    private Double longitude;

    private Boolean isActive;
    
    private String centerPhoto;
}