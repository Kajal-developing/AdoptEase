package com.adoptEase.dtos.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.adoptEase.enums.MeetingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingResponse {

    private Long meetingId;

    private Long childId;
    private String childName;
    private Integer age;

    private Long adoptionCenterId;
    private String adoptionCenterName;

    private LocalDate meetingDate;

    private LocalTime meetingTime;

    private MeetingStatus meetingStatus;

    private String centerRemarks;
    
    private String childPhoto;
}