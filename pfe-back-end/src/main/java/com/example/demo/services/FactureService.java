package com.example.demo.services;

import com.example.demo.entities.Facture;

import java.util.List;
import java.util.Optional;

public interface FactureService {

    List<Facture> getFacture();

    Facture getFactureById(Long id);
    Facture getFactureById2();

    Facture insert(Facture facture);

    void updateFacture(Long id, Facture facture);

    void deleteFacture(Long factureId);


}
