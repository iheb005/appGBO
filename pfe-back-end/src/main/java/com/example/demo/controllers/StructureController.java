package com.example.demo.controllers;

import com.example.demo.entities.Facture;
import com.example.demo.entities.Structure;
import com.example.demo.entities.Utilisateur;
import com.example.demo.services.StructureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class StructureController {

    private final StructureService service;

    public StructureController(StructureService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public void addStructure(@RequestBody Structure structure) {
        service.addStructure(structure);
    }



    @GetMapping("/all")
    public List<Structure> findAll() {
        return service.findAll();
    }


    @PutMapping({"/update/{StructureId}"})
    public Structure updateStructure(@PathVariable("StructureId") Long StructureId, @RequestBody Structure structure) {
        service.updateStructure(StructureId,structure);
        return   service.getStructureById(StructureId);
    }


    @PutMapping("/activer/{StructureId}")
    public Structure activerUser(@PathVariable("StructureId") Long StructureId)
    {
        service.activerStructure(StructureId);
        return service.getStructureById(StructureId);
    }
}
