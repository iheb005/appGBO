package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Inheritance( strategy = InheritanceType.JOINED )
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Utilisateur {

    @Id
    @GeneratedValue
    private Long id;
    private String nomPrenom;
    private String email;
    private String password;
    //private String typeStructure;
    private String telephone;
    private String structure;
    private boolean active;
    @CreationTimestamp
    private LocalDateTime dateCreation;
    private String role;

    @OneToMany(mappedBy = "utilisateur")
    private List<Structure> structures = new ArrayList<>();



}
