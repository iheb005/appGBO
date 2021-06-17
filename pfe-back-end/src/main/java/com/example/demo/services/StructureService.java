package com.example.demo.services;

import com.example.demo.entities.Structure;

import java.util.List;

public interface StructureService {

    void addStructure(Structure structure);

    void updateStructure (Long id, Structure structure);

    Structure getStructureById(Long id);


    List<Structure> findAll();

    Structure activerStructure(Long id );

}
