package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.model.Notification;
import com.nicolecohen.vouched.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    List<Notification> findByRecipient(User recipient);

    //Find by recipients UNREAD notifications
    List<Notification> findByRecipientAndIsReadFalse(User recipient);

}
