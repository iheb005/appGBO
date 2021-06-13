package com.example.demo.services.impl;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.entities.Facture;
import com.example.demo.entities.FicheAnnexe;
import com.example.demo.repository.FactureRepository;

import com.example.demo.services.FactureService;
import org.springframework.stereotype.Service;

@Service
public class FactureServiceImpl implements FactureService {

    FactureRepository factureRepository;

    public FactureServiceImpl(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }

    @Override
    public List<Facture> getFacture() {
        List<Facture> factures = new ArrayList<>();
        factureRepository.findAll().forEach(factures::add);
        return factures;
    }

    @Override
    public Facture getFactureById(Long id) {
        return factureRepository.findById(id).get();
    }

    @Override
    public Facture insert(Facture facture) {
        return factureRepository.save(facture);
    }

    @Override
    public void updateFacture(Long id, Facture facture) {
        Facture factureFromDb = factureRepository.findById(id).get();
        System.out.println(factureFromDb.toString());
        factureFromDb.setNumBonde(facture.getNumBonde());
        factureFromDb.setNumFact(facture.getNumFact());
        factureFromDb.setDateFact(facture.getDateFact());
        factureFromDb.setNumFournisseur(facture.getNumFournisseur());
        factureFromDb.setTtc(facture.getTtc());
        factureFromDb.setRaisonSocial(facture.getRaisonSocial());
        factureFromDb.setEtat(facture.getEtat());



        factureRepository.save(factureFromDb);
    }

    @Override
    public void deleteFacture(Long factureId) {
        factureRepository.deleteById(factureId);
    }



    public void addFicheAnnexe(FicheAnnexe annexe, Long idFacture) {
        Facture facture = factureRepository.findById(idFacture).get();
        facture.getAnnexes().add(annexe);
        factureRepository.save(facture);
    }


}
