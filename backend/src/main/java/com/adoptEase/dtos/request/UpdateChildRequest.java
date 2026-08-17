package com.adoptEase.dtos.request;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.enums.ChildStatus;
import com.adoptEase.enums.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateChildRequest {

    @NotBlank
    private String childName;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    private Gender gender;

    @NotBlank
    private String healthStatus;

    @NotBlank
    private String description;

    @NotNull
    private ChildStatus availableStatus;

    private MultipartFile childPhoto;
}