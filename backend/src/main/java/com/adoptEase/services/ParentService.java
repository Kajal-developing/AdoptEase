package com.adoptEase.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.BookMeetingRequest;
import com.adoptEase.dtos.request.RescheduleMeetingRequest;
import com.adoptEase.dtos.request.UpdateParentProfileRequest;
import com.adoptEase.dtos.request.UpdatePasswordRequest;
import com.adoptEase.dtos.response.CenterResponse;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.dtos.response.MeetingResponse;
import com.adoptEase.dtos.response.ParentProfileResponse;

public interface ParentService {

    List<CenterResponse> getCentersByCity(String city);

    List<ChildResponse> getAvailableChildren(Long centerId);
    
    MeetingResponse bookMeeting(Long userId, BookMeetingRequest request);
    
    List<MeetingResponse> getScheduledMeetings(Long userId);
    
    String rescheduleMeeting(Long meetingId,
            RescheduleMeetingRequest request);
    
    String cancelMeeting(Long meetingId);
    
    ParentProfileResponse getParentProfile(Long userId);
    
    String updateParentProfile(
            Long userId,
            UpdateParentProfileRequest request);
    
    String updateHousePhoto(
            Long userId,
            MultipartFile housePhoto);

    String updateFamilyPhoto(
            Long userId,
            MultipartFile familyPhoto);
    
    String updateProfilePhoto(
            Long userId,
            MultipartFile profilePhoto);
    
    String changePassword(
            Long userId,
            UpdatePasswordRequest request);

    CenterResponse getCenterById(Long centerId);
    
    ChildResponse getChildById(Long childId);
}