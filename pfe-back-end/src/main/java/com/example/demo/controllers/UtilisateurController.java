package com.example.demo.controllers;

import com.example.demo.entities.Facture;
import com.example.demo.entities.Utilisateur;
import com.example.demo.services.UtilisateurService;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/utilisateur")
public class UtilisateurController
{

    private final UtilisateurService service;
    public UtilisateurController(UtilisateurService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public Utilisateur addUser(@RequestBody Utilisateur utilisateur) {
        return service.save(utilisateur);
    }


    @PutMapping({"/update/{UtilisateurId}"})
    public Utilisateur updateFacture(@PathVariable("UtilisateurId") Long UtilisateurId, @RequestBody Utilisateur utilisateur) {
        service.update(UtilisateurId,utilisateur);
        return  service.getById(UtilisateurId);
    }

    @GetMapping("/byEmail")
    public Utilisateur getByEmailUser(@RequestParam String email) {
        return service.getByEmail(email);
    }


    @GetMapping("/byId")
    public Utilisateur getByIdUser(@RequestParam Long id) {
        return service.getById(id);
    }


    @GetMapping("/all")
    public List<Utilisateur> getAllUser() {
        return service.getAll();
    }


    @PutMapping ("/activer/{factureId}")
    public Utilisateur activerUser(@PathVariable("factureId") Long UserId,@RequestBody Utilisateur utilisateur)
    {
      service.activer(UserId,utilisateur);
        return service.getById(UserId);
    }


}
