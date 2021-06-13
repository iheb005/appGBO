package com.example.demo.controllers;

import com.example.demo.services.impl.NotificationDispatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

//@Controller
public class NotificationController {

    private final NotificationDispatcher dispatcher;

    @Autowired
    public NotificationController(NotificationDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    @MessageMapping("/start")
    public void start(StompHeaderAccessor stompHeaderAccessor) {
        dispatcher.add(stompHeaderAccessor.getSessionId());
    }

    @MessageMapping("/stop")
    public void stop(StompHeaderAccessor stompHeaderAccessor) {
        dispatcher.remove(stompHeaderAccessor.getSessionId());
    }
}
