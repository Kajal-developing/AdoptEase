package com.adoptEase.dtos.request;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookMeetingRequest {

    @NotNull(message = "Child ID is required")
    private Long childId;

    @NotNull(message = "Meeting date is required")
    @Future(message = "Meeting date must be in the future")
    private LocalDate meetingDate;

    @NotNull(message = "Meeting time is required")
    private LocalTime meetingTime;

    private String remarks;
}