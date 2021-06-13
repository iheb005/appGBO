package com.example.demo.repository;

import com.example.demo.entities.Structure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StructureRepository extends JpaRepository<Structure, Long> {
}
