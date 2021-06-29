package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import java.io.Serializable;
import javax.persistence.Entity;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Historique implements Serializable{
    @GeneratedValue
    @EmbeddedId
    private HistoriqueID historiqueID;
 //   private Long id;
    private String numFournisseur;
    private String raisonSocial;
    private String numBonde;
    private String numFact;
    private String ttc;
 //   private String etat;
   // private String structure;
    @CreationTimestamp
    private LocalDateTime dateFact;

@OneToOne
private Facture facture;

   /* @ManyToMany
    @JoinTable(
            name = "annexe",
            joinColumns = {@JoinColumn(name = "historique_id", referencedColumnName = "id")}
//            inverseJoinColumns = {@JoinColumn(name = "fiche_id", referencedColumnName = "id")}
    )
    private List<FicheAnnexe> annexes = new ArrayList<>();*/
    /*@JsonIgnore
    @OneToMany(mappedBy = "utilisateur")
    private List<Structure> structures = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="id_structure")
    private Structure structure;
*/

    // public Long getId() {
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    public String getNumFournisseur() {
        return numFournisseur;
    }

    public void setNumFournisseur(String numFournisseur) {
        this.numFournisseur = numFournisseur;
    }

    public String getRaisonSocial() {
        return raisonSocial;
    }

    public void setRaisonSocial(String raisonSocial) {
        this.raisonSocial = raisonSocial;
    }

    public String getNumBonde() {
        return numBonde;
    }

    public void setNumBonde(String numBonde) {
        this.numBonde = numBonde;
    }

    public String getNumFact() {
        return numFact;
    }

    public void setNumFact(String numFact) {
        this.numFact = numFact;
    }

    public String getTtc() {
        return ttc;
    }

    public void setTtc(String ttc) {
        this.ttc = ttc;
    }

    // public String getEtat() {
    //     return etat;
    // }

    // public void setEtat(String etat) {
    //     this.etat = etat;
    // }

    public LocalDateTime getDateFact() {
        return dateFact;
    }

    public void setDateFact(LocalDateTime dateFact) {
        this.dateFact = dateFact;
    }

    // public List<FicheAnnexe> getAnnexes() {
    //     return annexes;
    // }

    // public void setAnnexes(List<FicheAnnexe> annexes) {
    //     this.annexes = annexes;
    // }

    // @JsonIgnore
    // public List<Structure> getStructures() {
    //     return structures;
    // }
    // public Structure getStructure() {
    //     return structure;
    // }

    // public void setStructure(Structure structure) {
    //     this.structure = structure;
    // }
    // public void setStructures(List<Structure> structures) {
    //     this.structures = structures;
    // }


    public Historique() {
    }


    public Historique(HistoriqueID historiqueID, String numFournisseur, String raisonSocial, String numBonde, String numFact, String ttc, LocalDateTime dateFact) {
        this.historiqueID = historiqueID;
        this.numFournisseur = numFournisseur;
        this.raisonSocial = raisonSocial;
        this.numBonde = numBonde;
        this.numFact = numFact;
        this.ttc = ttc;
        this.dateFact = dateFact;
        //this.annexes = annexes;
       // this.structures = structures;
        //this.structure = structure;
    }



}
