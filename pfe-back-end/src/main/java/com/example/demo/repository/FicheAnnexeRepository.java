package com.example.demo.repository;

import com.example.demo.entities.FicheAnnexe;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface FicheAnnexeRepository extends JpaRepository <FicheAnnexe,String >{

}
