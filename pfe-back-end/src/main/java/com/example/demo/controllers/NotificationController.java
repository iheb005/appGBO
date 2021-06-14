package com.example.demo.controllers;

import com.example.demo.entities.Notification;
import com.example.demo.services.impl.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notification")
public class NotificationController {


    private final NotificationService notificationService;

    @PostMapping("/save")
    public void save(@RequestBody Notification notification) {
        notificationService.add(notification);
    }

    @GetMapping("/")
    public List<Notification> findAll() {
        return notificationService.findAll();
    }
}
