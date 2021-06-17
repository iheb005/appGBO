package com.example.demo.controllers;

import com.example.demo.entities.Facture;
import com.example.demo.entities.Notification;
import com.example.demo.entities.Utilisateur;
import com.example.demo.services.FactureService;
import com.example.demo.services.UtilisateurService;
import com.example.demo.services.impl.NotificationDispatcher;
import com.example.demo.services.impl.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private  NotificationService notificationService;
    @Autowired
    private  FactureService factureService;
    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping("")
    public List<Notification> getAllNotification() {
        try {

            return notificationService.findAll();
        } catch (Exception e){
            return new ArrayList<>();
        }
    }
    @PostMapping("/save")
    public Notification saveNotification(@RequestBody Map<String, Object> notification) {
        Facture facture = factureService.getFactureById(Long.valueOf(
                notification.get("idFacture").toString())
        );
        facture.setEtat("Envoyer");
        factureService.updateFacture(facture.getId(),facture);
        Notification notification1 = new Notification();
        notification1.setStructureName("");
        notification1.setIdFacture(facture.getId());
        notification1.setSeen(false);
        return notificationService.add(notification1);

    }
    @PostMapping("/save2")
    public void saveNotification2(@RequestBody Map<String, Object> notification) {
        Facture facture = factureService.getFactureById(Long.valueOf(
                notification.get("idFacture").toString())
        );
        facture.setEtat("Valider");
        factureService.updateFacture(facture.getId(),facture);
    }
    @PostMapping("/save3")
    public void saveNotification3(@RequestBody Map<String, Object> notification) {
        Facture facture = factureService.getFactureById(Long.valueOf(
                notification.get("idFacture").toString())
        );
        facture.setEtat(" Annuler");
        factureService.updateFacture(facture.getId(),facture);
    }
}
