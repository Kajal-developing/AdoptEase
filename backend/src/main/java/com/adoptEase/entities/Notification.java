package com.adoptEase.entities;

import com.adoptEase.enums.NotificationType;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "notifications")
@AttributeOverride(name = "id", column = @Column(name = "notification_id"))
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "user", callSuper = true)
public class Notification extends BaseEntity {

    @Column(nullable = false, length = 60)
    private String title;

    @Column(nullable = false, length = 250)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    private NotificationType notificationType;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    /*
     * Many Notifications ----> One User
     */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Notification(String title,
                        String message,
                        NotificationType notificationType,
                        Boolean isRead) {

        this.title = title;
        this.message = message;
        this.notificationType = notificationType;
        this.isRead = isRead;
    }
}