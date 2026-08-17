package com.adoptEase.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.adoptEase.dtos.response.NotificationResponse;
import com.adoptEase.entities.Notification;
import com.adoptEase.entities.User;
import com.adoptEase.enums.NotificationType;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.NotificationRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.services.NotificationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public void createNotification(User user,
                                   String title,
                                   String message,
                                   NotificationType notificationType) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setNotificationType(notificationType);
        notification.setIsRead(false);

        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationResponse> getNotifications(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with ID: " + userId));

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(notification -> {
                    NotificationResponse response =
                            modelMapper.map(notification, NotificationResponse.class);

                    response.setNotificationId(notification.getId());

                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public String markAsRead(Long notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Notification not found with ID: " + notificationId));

        notification.setIsRead(true);

        notificationRepository.save(notification);

        return "Notification marked as read.";
    }

    @Override
    public long getUnreadCount(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with ID: " + userId));

        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }
}