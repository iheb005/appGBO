package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;


@Data
@Entity
@PrimaryKeyJoinColumn( name = "idUtilisateur" )
public class RBO  extends  Utilisateur
{
}
