package com.adoptEase.dtos.response;

import java.time.LocalDateTime;

import com.adoptEase.enums.ApprovalStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CenterResponse {

	 private Long centerId;

	    private String centerName;

	    private String description;

	    private String address;

	    private String city;

	    private Double latitude;

	    private Double longitude;

	    private String centerPhoto;

	    private String contactNo;

	    private String email;

	    private String licenseNumber;

	    private Boolean isActive;
	    
	    private ApprovalStatus approvalStatus;
	    
	    private LocalDateTime createdAt;
}