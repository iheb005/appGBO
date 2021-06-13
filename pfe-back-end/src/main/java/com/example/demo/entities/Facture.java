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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Facture {
    @Id
    @GeneratedValue
    private Long id;
    private String numFournisseur;
    private String raisonSocial;
    private String numBonde;
    private String numFact;
    private String ttc;
    private String etat;
    /*@CreationTimestamp*/
    private LocalDateTime dateFact;


    @ManyToMany
    @JoinTable(
            name = "annexe",
            joinColumns = {@JoinColumn(name = "facture_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "fiche_id", referencedColumnName = "id")}
    )
    private List<FicheAnnexe> annexes = new ArrayList<>();

    @OneToMany(mappedBy = "utilisateur")
    private List<Structure> structures = new ArrayList<>();
}
