package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;


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

    @OneToMany( mappedBy = "structure")
    private Collection<Facture> factures ;

    @JsonIgnore
    public Collection<Facture> getFactures() {
        return factures;
    }

    public void setFactures(Collection<Facture> factures) {
        this.factures = factures;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomStructure() {
        return nomStructure;
    }

    public void setNomStructure(String nomStructure) {
        this.nomStructure = nomStructure;
    }

    public String getNumeroStructure() {
        return numeroStructure;
    }

    public void setNumeroStructure(String numeroStructure) {
        this.numeroStructure = numeroStructure;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
