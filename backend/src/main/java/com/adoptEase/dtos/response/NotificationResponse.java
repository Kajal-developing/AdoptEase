package com.adoptEase.dtos.response;

import java.time.LocalDateTime;

import com.adoptEase.enums.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {

    private Long notificationId;

    private String title;

    private String message;

    private NotificationType notificationType;

    private Boolean isRead;

    private LocalDateTime createdAt;
}