package com.adoptEase.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adoptEase.dtos.request.AdminRemarkRequest;
import com.adoptEase.dtos.request.UpdateAdminProfileRequest;
import com.adoptEase.dtos.response.AdminDashboardResponse;
import com.adoptEase.dtos.response.AdminProfileResponse;
import com.adoptEase.dtos.response.AdoptionCenterResponse;
import com.adoptEase.dtos.response.ParentResponse;
import com.adoptEase.services.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    // Get all pending parents
    @Operation(description = "Get pending parents")
    @GetMapping("/parents/pending")
    public ResponseEntity<List<ParentResponse>> getPendingParents() {
        return ResponseEntity.ok(adminService.getPendingParents());
    }

    // Get all pending adoption centers
    @Operation(description = "Get pending centers")
    @GetMapping("/centers/pending")
    public ResponseEntity<List<AdoptionCenterResponse>> getPendingCenters() {
        return ResponseEntity.ok(adminService.getPendingCenters());
    }

    // Approve parent
    @Operation(description = "Approve parent")
    @PutMapping("/parents/{userId}/approve")
    public ResponseEntity<String> approveParent(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.approveParent(userId));
    }

    // Reject parent
    @PutMapping("/parents/{userId}/reject")
    public ResponseEntity<String> rejectParent(
            @PathVariable Long userId,
            @Valid @RequestBody AdminRemarkRequest request) {

        return ResponseEntity.ok(
                adminService.rejectParent(
                        userId,
                        request.getRemark()
                )
        );
    }

    // Approve adoption center
    @Operation(description = "Approve center")
    @PutMapping("/centers/{userId}/approve")
    public ResponseEntity<String> approveCenter(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.approveCenter(userId));
    }

    // Reject adoption center
    @Operation(description = "Reject center")
    @PutMapping("/centers/{userId}/reject")
    public ResponseEntity<String> rejectCenter(
            @PathVariable Long userId,
            @Valid @RequestBody AdminRemarkRequest request) {

        return ResponseEntity.ok(
                adminService.rejectCenter(
                        userId,
                        request.getRemark()
                )
        );
    }
    
    @Operation(summary = "Get Admin Dashboard Statistics")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dashboard fetched successfully")
    })
    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {

        return ResponseEntity.ok(adminService.getDashboard());
    }
    
    @Operation(description = "Get admin profile")
    @GetMapping("/profile/{userId}")
    public ResponseEntity<AdminProfileResponse> getAdminProfile(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                adminService.getAdminProfile(userId)
        );
    }
    
    @Operation(description = "Update admin profile")
    @PutMapping("/profile/{userId}")
    public ResponseEntity<AdminProfileResponse> updateAdminProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateAdminProfileRequest request) {

        return ResponseEntity.ok(
                adminService.updateAdminProfile(userId, request)
        );
    }
}