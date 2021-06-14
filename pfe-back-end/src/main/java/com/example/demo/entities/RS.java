package com.example.demo.entities;


import lombok.Data;


import javax.persistence.*;


@Entity
@Data
@PrimaryKeyJoinColumn( name = "idUtilisateur" )
public class RS  extends  Utilisateur
{


}
