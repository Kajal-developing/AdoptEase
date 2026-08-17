package com.adoptEase.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.MeetingApprovalRequest;
import com.adoptEase.dtos.request.MeetingRejectionRequest;
import com.adoptEase.dtos.request.UpdateCenterProfileRequest;
import com.adoptEase.dtos.request.UpdatePasswordRequest;
import com.adoptEase.dtos.response.CenterMeetingResponse;
import com.adoptEase.dtos.response.CenterResponse;
import com.adoptEase.dtos.response.ChildResponse;

public interface CenterService {

    List<CenterMeetingResponse> getMeetingRequests(Long userId);
    
    String approveMeeting(Long meetingId, MeetingApprovalRequest request);

    String rejectMeeting(Long meetingId,
            MeetingRejectionRequest request);
    
    CenterResponse getCenterProfile(Long userId);
    
    String updateCenterProfile(
            Long userId,
            UpdateCenterProfileRequest request);
    
    String changePassword(Long userId,
            UpdatePasswordRequest request);
    
    String deactivateAccount(Long userId);
    
    List<ChildResponse> getChildrenByCenter(Long userId);
    
    String updateCenterPhoto(
            Long userId,
            MultipartFile centerPhoto);
}