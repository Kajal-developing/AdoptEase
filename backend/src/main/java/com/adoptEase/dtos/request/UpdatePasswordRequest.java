package com.adoptEase.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {

    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;

}