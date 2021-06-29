package com.example.demo.entities;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HistoriqueID implements Serializable {

    @Column(name = "id")
    private Long id;

    @Column(name = "etat")
    private String etat;


    public HistoriqueID() {
    }

    public HistoriqueID(Long id, String etat) {
        this.id = id;
        this.etat = etat;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEtat() {
        return this.etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HistoriqueID that = (HistoriqueID) o;
        return id.equals(that.id) &&
                etat.equals(that.etat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, etat);
    }
}