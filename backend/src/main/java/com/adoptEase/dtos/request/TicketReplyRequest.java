package com.adoptEase.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketReplyRequest {

    @NotBlank(message = "Response is required")
    private String response;
}