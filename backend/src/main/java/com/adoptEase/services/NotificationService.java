package com.adoptEase.services;

import java.util.List;

import com.adoptEase.dtos.response.NotificationResponse;
import com.adoptEase.entities.User;
import com.adoptEase.enums.NotificationType;

public interface NotificationService {

    void createNotification(User user,
                            String title,
                            String message,
                            NotificationType notificationType);

    List<NotificationResponse> getNotifications(Long userId);

    String markAsRead(Long notificationId);

    long getUnreadCount(Long userId);
}