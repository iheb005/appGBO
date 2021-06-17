package com.example.demo.services.impl;

import com.example.demo.entities.Structure;
import com.example.demo.entities.Utilisateur;
import com.example.demo.repository.StructureRepository;
import com.example.demo.services.StructureService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@Service
public class StructureServiceImpl implements StructureService {

    private final StructureRepository repository;

    public StructureServiceImpl(StructureRepository repository) {
        this.repository = repository;
    }

    @Override
    public void addStructure(Structure structure) {
        repository.save(structure);
    }

    @Override
    public void updateStructure(Long id, Structure structure) {

            Structure structureFromDb = repository.findById(id).get();
            System.out.println(structureFromDb.toString());
            structureFromDb.setEtat(structure.getEtat());
           structureFromDb.setNomStructure(structure.getNomStructure());
            repository.save(structureFromDb);
        }

    @Override
    public Structure getStructureById(Long id) {

            return  repository.findById(id).get();
        }



    @Override
    public List<Structure> findAll() {
        return repository.findAll();
    }

    @Override
    public Structure activerStructure(Long id) {
        Structure structureFromDb = repository.findById(id).get();
        System.out.println(structureFromDb.toString());
        structureFromDb.setEtat(!structureFromDb.getEtat());
        return repository.save(structureFromDb);
    }



}
