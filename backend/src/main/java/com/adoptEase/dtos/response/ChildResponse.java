package com.adoptEase.dtos.response;

import java.time.LocalDate;

import com.adoptEase.enums.ChildStatus;
import com.adoptEase.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChildResponse {

    private Long childId;

    private String childName;
    
    private LocalDate dateOfBirth;

    private Integer age;

    private Gender gender;

    private String healthStatus;

    private String description;

    private String childPhoto;

    private ChildStatus availableStatus;

    private Long adoptionCenterId;
    
    private String city;
}