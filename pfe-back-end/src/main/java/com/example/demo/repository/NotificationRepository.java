package com.example.demo.repository;


import com.example.demo.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllBySendToAndStructureName(String to, String structure);
}
