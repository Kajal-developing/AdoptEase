package com.adoptEase.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDashboardResponse {

    private Long totalParents;
    private Long totalCenters;
    private Long approvedCenters;
    private Long pendingCenters;

    private Long totalChildren;
    private Long availableChildren;

    private Long totalMeetings;
    private Long pendingMeetings;

    private Long totalTickets;
    private Long openTickets;
}