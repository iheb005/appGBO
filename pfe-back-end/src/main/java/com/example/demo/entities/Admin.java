package com.example.demo.entities;


import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;


@Data
@Entity
@PrimaryKeyJoinColumn( name = "idUtilisateur" )
public class Admin extends  Utilisateur
{



}
