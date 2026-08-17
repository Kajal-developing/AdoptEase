package com.adoptEase.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingRejectionRequest {

    @NotBlank(message = "Rejection reason is required")
    private String centerRemarks;
}