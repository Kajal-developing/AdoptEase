package com.adoptEase.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.BookMeetingRequest;
import com.adoptEase.dtos.request.RescheduleMeetingRequest;
import com.adoptEase.dtos.request.UpdateParentProfileRequest;
import com.adoptEase.dtos.request.UpdatePasswordRequest;
import com.adoptEase.dtos.response.CenterResponse;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.dtos.response.MeetingResponse;
import com.adoptEase.services.ParentService;
import com.adoptEase.dtos.response.ParentProfileResponse;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/parent")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PARENT')")
public class ParentController {

    private final ParentService parentService;

    @Operation(description = "Get all approved adoption centers by city")
    @GetMapping("/centers")
    public ResponseEntity<List<CenterResponse>> getCentersByCity(
            @RequestParam String city) {

        return ResponseEntity.ok(parentService.getCentersByCity(city));
    }
    
    @Operation(description = "Get all available children of an adoption center")
    @GetMapping("/centers/{centerId}/children")
    public ResponseEntity<List<ChildResponse>> getAvailableChildren(
            @PathVariable Long centerId) {

        return ResponseEntity.ok(parentService.getAvailableChildren(centerId));
    }
    
    @Operation(description = "Book a meeting with an adoption center")
    @PostMapping("/{userId}/meetings")
    public ResponseEntity<MeetingResponse> bookMeeting(
            @PathVariable Long userId,
            @Valid @RequestBody BookMeetingRequest request) {

        return ResponseEntity.ok(parentService.bookMeeting(userId, request));
    }
    
    @Operation(description = "Get all scheduled meetings")
    @GetMapping("/{userId}/meetings")
    public ResponseEntity<List<MeetingResponse>> getScheduledMeetings(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                parentService.getScheduledMeetings(userId));
    }
    
    @Operation(description = "Reschedule rejected meeting")
    @PutMapping("/meetings/{meetingId}/reschedule")
    public ResponseEntity<String> rescheduleMeeting(
            @PathVariable Long meetingId,
            @Valid @RequestBody RescheduleMeetingRequest request) {

        return ResponseEntity.ok(
                parentService.rescheduleMeeting(meetingId, request));
    }
    
    @DeleteMapping("/meetings/{meetingId}")
    public ResponseEntity<String> cancelMeeting(
            @PathVariable Long meetingId) {

        return ResponseEntity.ok(
                parentService.cancelMeeting(meetingId));
    }
    
    @GetMapping("/profile/{userId}")
    public ResponseEntity<ParentProfileResponse> getParentProfile(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                parentService.getParentProfile(userId));

    }
    
    @PutMapping("/profile/{userId}")
    public ResponseEntity<String> updateParentProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateParentProfileRequest request) {

        return ResponseEntity.ok(
                parentService.updateParentProfile(userId, request));

    }
    
    @PutMapping(
            value = "/profile/{userId}/house-photo",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<String> updateHousePhoto(
            @PathVariable Long userId,
            @RequestParam("housePhoto") MultipartFile housePhoto) {

        return ResponseEntity.ok(
                parentService.updateHousePhoto(
                        userId,
                        housePhoto
                )
        );
    }


    @PutMapping(
            value = "/profile/{userId}/family-photo",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<String> updateFamilyPhoto(
            @PathVariable Long userId,
            @RequestParam("familyPhoto") MultipartFile familyPhoto) {

        return ResponseEntity.ok(
                parentService.updateFamilyPhoto(
                        userId,
                        familyPhoto
                )
        );
    }
    
    @PutMapping(
            value = "/profile/{userId}/profile-photo",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<String> updateProfilePhoto(
            @PathVariable Long userId,
            @RequestParam("profilePhoto") MultipartFile profilePhoto) {

        return ResponseEntity.ok(
                parentService.updateProfilePhoto(
                        userId,
                        profilePhoto
                )
        );
    }
    
    @PutMapping("/{userId}/change-password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long userId,
            @Valid @RequestBody UpdatePasswordRequest request) {

        return ResponseEntity.ok(
                parentService.changePassword(userId, request));
    }
    
    @GetMapping("/centers/{centerId}")
    public ResponseEntity<CenterResponse> getCenterById(
            @PathVariable Long centerId) {

        return ResponseEntity.ok(
                parentService.getCenterById(centerId));
    }
    
    @GetMapping("/children/{childId}")
    public ResponseEntity<ChildResponse> getChildById(
            @PathVariable Long childId) {

        return ResponseEntity.ok(
                parentService.getChildById(childId));
    }
}