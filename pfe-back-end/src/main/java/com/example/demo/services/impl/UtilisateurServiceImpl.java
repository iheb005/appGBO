package com.example.demo.services.impl;

import com.example.demo.entities.Facture;
import com.example.demo.entities.Structure;
import com.example.demo.entities.Utilisateur;
import com.example.demo.message.RegistrationModel;
import com.example.demo.repository.UtilisateurRepository;
import com.example.demo.services.UtilisateurService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurServiceImpl(UtilisateurRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Utilisateur save(Utilisateur utilisateur) {
        if (utilisateur != null && utilisateur.getPassword() != null) {
            utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
            return repository.save(utilisateur);
        }
        return null;
    }


    @Override
    public void update(Long id, Utilisateur utilisateur) {
        Utilisateur utilisateurFromDb = repository.findById(id).get();
        System.out.println(utilisateurFromDb.toString());
        utilisateurFromDb.setNomPrenom(utilisateur.getNomPrenom());
        utilisateurFromDb.setActive(utilisateur.isActive());
        utilisateurFromDb.setPassword(utilisateur.getPassword());
        utilisateurFromDb.setDateCreation(utilisateur.getDateCreation());
        utilisateurFromDb.setEmail(utilisateur.getEmail());
        utilisateurFromDb.setRole(utilisateur.getRole());
        utilisateurFromDb.setTelephone(utilisateur.getTelephone());
        //utilisateurFromDb.setStructures(utilisateur.getStructures());
        repository.save(utilisateurFromDb);
    }


    @Override
    public Utilisateur getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public Utilisateur getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Utilisateur> getAll() {
        return repository.findAll();
    }

   /* @Override
    public Utilisateur register(RegistrationModel registrationModel) {

        Utilisateur byMail = repository.findByEmail(registrationModel.getEmail());
        if (byMail == null) {
            Utilisateur user = new Utilisateur();
            user.setNomPrenom(registrationModel.getNomComplete());
            user.setEmail(registrationModel.getEmail());
            user.setPassword(passwordEncoder.encode(registrationModel.getPassword()));
            user.setRole(registrationModel.getRole());
            return repository.save(user);
        }
        return null;
    }*/

    @PostConstruct
    @Transactional
   public void initUser() {
       /* Utilisateur u = new Utilisateur();
        u.setNomPrenom("Foulen ben foulen");
        u.setEmail("admin");
        u.setPassword("admin");
         u.setActive(true);
        u.setRole("ROLE_ADMIN");
        this.save(u);
     Utilisateur u1 = new Utilisateur();
        u1.setNomPrenom("Foulen ");
        u1.setEmail("rbo");
        u1.setPassword("rbo");
        u1.setActive(true);
       u1.setRole("ROLE_RBO");
        this.save(u1);
       Utilisateur u2 = new Utilisateur();
       u2.setNomPrenom("Foulen ben");
        u2.setEmail("rs");
       u2.setPassword("rs");
     u2.setActive(true);
     u2.setRole("ROLE_RS");
        this.save(u2);*/
   }


    @Override
    public Utilisateur activer(Long id ,Utilisateur utilisateur) {
        Utilisateur utilisateurFromDb = repository.findById(id).get();
        System.out.println(utilisateurFromDb.toString());
        utilisateurFromDb.setActive(utilisateur.isActive());
        return repository.save(utilisateurFromDb);
    }
}
