package com.example.demo.services;

import com.example.demo.entities.Facture;

import java.util.List;

public interface FactureService {

    List<Facture> getFacture();

    Facture getFactureById(Long id);

    Facture insert(Facture facture);

    void updateFacture(Long id, Facture facture);

    void deleteFacture(Long factureId);


}
