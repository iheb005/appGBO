package com.example.demo.services.impl;

import com.example.demo.entities.Notification;
import com.example.demo.entities.Utilisateur;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.services.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UtilisateurService utilisateurService;

    public void add(Notification notification) {
        if (notification != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Utilisateur user = utilisateurService.getByEmail(userDetails.getUsername());
            notification.setSenderId(user.getId());
            if ("ROLE_RBO".equals(user.getRole())) {
                notification.setSendTo("ROLE_RS");
            } else if ("ROLE_RS".equals(user.getRole())) {
                notification.setSendTo("ROLE_RBO");
            }
            notificationRepository.save(notification);
        }
    }

    public List<Notification> findAll() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Utilisateur byEmail = utilisateurService.getByEmail(userDetails.getUsername());
        return notificationRepository.findAllBySendToAndStructureName(byEmail.getRole(), byEmail.getStructure());
    }
}
