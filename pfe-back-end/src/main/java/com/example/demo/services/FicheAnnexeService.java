package com.example.demo.services;


import com.example.demo.entities.FicheAnnexe;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

public interface FicheAnnexeService
{
    public FicheAnnexe store(MultipartFile file) throws IOException;
    public FicheAnnexe getFile(String id);
    public Stream<FicheAnnexe> getAllFiles();
}
