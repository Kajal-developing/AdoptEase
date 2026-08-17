package com.adoptEase.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRemarkRequest {

    @NotBlank(message = "Remark is required.")
    private String remark;
}