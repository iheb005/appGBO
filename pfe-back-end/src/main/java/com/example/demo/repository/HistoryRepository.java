package com.example.demo.repository;

import com.example.demo.entities.Historique;
import com.example.demo.entities.HistoriqueID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<Historique, HistoriqueID>
{

}
