package com.example.demo.services.impl;

import com.example.demo.entities.FicheAnnexe;
import com.example.demo.repository.FicheAnnexeRepository;
import com.example.demo.services.FicheAnnexeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;


@Service
public class FicheAnnexeServiceImpl implements FicheAnnexeService {
    @Autowired
    FicheAnnexeRepository ficheAnnexeRepository;


   /* @Override
    public FicheAnnexe store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

//        FicheAnnexe fileDB = new FicheAnnexe(fileName, file.getContentType(), file.getBytes());
        FicheAnnexe fileDB = FicheAnnexe.builder()
                .nom(fileName)
                .type(file.getContentType())
                .data(file.getBytes())
                .build();

        return ficheAnnexeRepository.save(fileDB);
    }

    @Override
    public FicheAnnexe getFile(String id) {
        return ficheAnnexeRepository.findById(id).get();
    }

    @Override
    public Stream<FicheAnnexe> getAllFiles() {
        return ficheAnnexeRepository.findAll().stream();
    }*/


    public FicheAnnexe store (MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FicheAnnexe fileDB = FicheAnnexe.builder()
                .nom(fileName)
                .type(file.getContentType())
                .data(file.getBytes())
                .build();

        return ficheAnnexeRepository.save(fileDB);
    }

    public FicheAnnexe getFile(String id) {
        return ficheAnnexeRepository.findById(id).get();
    }

    public Stream<FicheAnnexe> getAllFiles() {
        return ficheAnnexeRepository.findAll().stream();
    }



















}

