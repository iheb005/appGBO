package com.example.demo.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Notification {

    @Id
    @GeneratedValue
    private Long id;
    private Long senderId;
    private String sendTo;
    private String structureName;
    private Long idFacture;
    private boolean seen;
}
