package com.example.demo.services;

import com.example.demo.entities.Facture;
import com.example.demo.entities.Structure;
import com.example.demo.entities.Utilisateur;
import com.example.demo.message.RegistrationModel;

import java.util.List;

public interface UtilisateurService {

    Utilisateur save(Utilisateur utilisateur);

    void update(Long id, Utilisateur utilisateur) ;

    Utilisateur getByEmail(String email);

    Utilisateur getById(Long id);

    List<Utilisateur> getAll();


    Utilisateur activer(Long id);

}
