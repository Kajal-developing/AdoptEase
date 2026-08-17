package com.adoptEase.dtos.response;

import com.adoptEase.enums.TicketStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketResponse {

    private Long ticketId;

    private Long parentId;

    private String parentName;

    private Long adoptionCenterId;

    private String adoptionCenterName;

    private String subject;

    private String description;

    private String response;

    private TicketStatus status;
}