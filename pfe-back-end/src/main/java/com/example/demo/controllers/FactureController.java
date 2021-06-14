package com.example.demo.controllers;

import com.example.demo.entities.Facture;
import com.example.demo.repository.FactureRepository;
import com.example.demo.services.FactureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class FactureController {

    FactureService factureService;
    FactureRepository factureRepository;

    public FactureController(FactureService factureService) {
        this.factureService = factureService;
    }

    //The function receives a GET request, processes it and gives back a list of Structure as a response.
    @GetMapping({"/factures"})
    public List<Facture> getAllFactures() {
        return factureService.getFacture();
    }

    /*GETFACTURE**/
    @GetMapping({"/facture/{factureId}"})
    public Facture getFacture(@PathVariable Long factureId) {
        return factureService.getFactureById(factureId);
    }

    //The function receives a POST request, processes it, creates a new DAOStructure and saves it to the database, and returns a resource link to the created todo.    @PostMapping
    @RequestMapping(value = "/facture/save", method = RequestMethod.POST)
    public Facture saveFacture(@RequestBody Facture facture) {
        return factureService.insert(facture);
    }

    //The function receives a PUT request, updates the DAOStructure with the specified Id and returns the updated DAOStructure
    @PutMapping({"/facture/update/{factureId}"})
    public Facture updateFacture(@PathVariable("factureId") Long factureId, @RequestBody Facture facture) {
        factureService.updateFacture(factureId, facture);
        return factureService.getFactureById(factureId);
    }



    //The function receives a DELETE request, deletes the DAOStructure with the specified Id.
    @DeleteMapping({"/facture/delete/{factureId}"})

    public ResponseEntity<?> deleteDAOFacture(@PathVariable("factureId") Long factureId) {
        factureService.deleteFacture(factureId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
