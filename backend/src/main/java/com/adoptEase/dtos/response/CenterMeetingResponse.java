package com.adoptEase.dtos.response;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CenterMeetingResponse {

    private Long meetingId;

    private Long parentId;
    private String parentName;
    private String parentAddress;

    private Long childId;
    private String childName;
    private Integer age;

    private LocalDate meetingDate;
    private LocalTime meetingTime;

    private String parentRemarks;
}