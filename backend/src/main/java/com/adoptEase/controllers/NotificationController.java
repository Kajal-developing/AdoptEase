package com.adoptEase.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adoptEase.dtos.response.NotificationResponse;
import com.adoptEase.services.NotificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "Get all notifications of a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notifications fetched successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationResponse>> getNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getNotifications(userId));
    }

    @Operation(summary = "Mark notification as read")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notification marked as read"),
            @ApiResponse(responseCode = "404", description = "Notification not found")
    })
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<String> markAsRead(
            @PathVariable Long notificationId) {

        return ResponseEntity.ok(
                notificationService.markAsRead(notificationId));
    }

    @Operation(summary = "Get unread notification count")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Unread count fetched successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}/unread-count")
    public ResponseEntity<Long> getUnreadCount(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUnreadCount(userId));
    }
}