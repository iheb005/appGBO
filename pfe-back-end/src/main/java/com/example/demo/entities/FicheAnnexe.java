package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FicheAnnexe {

    @Id
    @GeneratedValue
    private String id;
    private String type;
    @Lob
    private byte[] data;
    private String nom;
    @CreationTimestamp
    private LocalDateTime date;


}
