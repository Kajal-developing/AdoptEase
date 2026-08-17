package com.adoptEase.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adoptEase.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    long countByUserIdAndIsReadFalse(Long userId);
}