package com.adoptEase.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.MeetingApprovalRequest;
import com.adoptEase.dtos.request.MeetingRejectionRequest;
import com.adoptEase.dtos.request.UpdateCenterProfileRequest;
import com.adoptEase.dtos.request.UpdatePasswordRequest;
import com.adoptEase.dtos.response.CenterMeetingResponse;
import com.adoptEase.dtos.response.CenterResponse;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.services.CenterService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/center")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CENTER_ADMIN')")
public class CenterController {

    private final CenterService centerService;

    @Operation(description = "Get all pending meeting requests")
    @GetMapping("/{userId}/meetings")
    public ResponseEntity<List<CenterMeetingResponse>> getMeetingRequests(
            @PathVariable Long userId) {

        return ResponseEntity.ok(centerService.getMeetingRequests(userId));
    }
    
    @Operation(description = "Approve meeting request")
    @PutMapping("/meetings/{meetingId}/approve")
    public ResponseEntity<String> approveMeeting(
            @PathVariable Long meetingId,
            @RequestBody MeetingApprovalRequest request) {

        return ResponseEntity.ok(
                centerService.approveMeeting(meetingId, request));
    }
    
    @Operation(description = "Reject meeting request")
    @PutMapping("/meetings/{meetingId}/reject")
    public ResponseEntity<String> rejectMeeting(
            @PathVariable Long meetingId,
            @Valid @RequestBody MeetingRejectionRequest request) {

        return ResponseEntity.ok(
                centerService.rejectMeeting(meetingId, request));
    }
    
    @PutMapping("/profile/{userId}")
    public ResponseEntity<String> updateCenterProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateCenterProfileRequest request) {

        return ResponseEntity.ok(
                centerService.updateCenterProfile(userId, request));
    }
    
    @Operation(description = "Get center profile")
    @GetMapping("/profile/{userId}")
    public ResponseEntity<CenterResponse> getCenterProfile(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                centerService.getCenterProfile(userId));
    }
    
    @PutMapping("/{userId}/change-password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long userId,
            @Valid @RequestBody UpdatePasswordRequest request) {

        return ResponseEntity.ok(
                centerService.changePassword(userId, request));
    }
    
    @PutMapping("/{userId}/deactivate")
    public ResponseEntity<String> deactivateAccount(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                centerService.deactivateAccount(userId));
    }
    
    @Operation(description = "Get all children of the logged-in adoption center")
    @GetMapping("/{userId}/children")
    public ResponseEntity<List<ChildResponse>> getChildrenByCenter(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                centerService.getChildrenByCenter(userId));
    }
    
    @PutMapping(
            value = "/profile/{userId}/center-photo",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<String> updateCenterPhoto(
            @PathVariable Long userId,
            @RequestParam("centerPhoto") MultipartFile centerPhoto) {

        return ResponseEntity.ok(
                centerService.updateCenterPhoto(
                        userId,
                        centerPhoto
                )
        );
    }
}