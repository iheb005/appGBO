package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Structure {

    @Id
    @GeneratedValue
    private Long id;
    private String nomStructure;
    private String numeroStructure;
    private  Boolean etat;
    @CreationTimestamp
    private Date  dateCreation;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur")
    private Utilisateur utilisateur;

   /* @OneToMany(mappedBy = "structure")
    private List<RS> rs = new ArrayList<>();*/

    @ManyToOne
    @JoinColumn(name="id_facture")
    private Facture facture ;

}