package com.adoptEase.dtos.request;

import java.time.LocalDate;

import com.adoptEase.enums.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddChildRequest {

    @NotBlank
    private String childName;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotNull
    private Gender gender;

    @NotBlank
    private String healthStatus;

    @NotBlank
    private String description;

    private String childPhoto;

}