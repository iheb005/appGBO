package com.example.demo.controllers;


import com.example.demo.message.ResponseFiche;
import com.example.demo.message.ResponseMessage;
import com.example.demo.services.FicheAnnexeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FicheAnnexeController {

    private final FicheAnnexeService ficheAnnexeService;

    public FicheAnnexeController(FicheAnnexeService ficheAnnexeService) {
        this.ficheAnnexeService = ficheAnnexeService;
    }

   @PostMapping("/upload")
    // TODO :: add file + data
   // @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public ResponseMessage uploadFile(@RequestParam("file") MultipartFile file)
    {
        String message ="";
        try {
            ficheAnnexeService.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return new ResponseMessage(message);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return new ResponseMessage(message);
        }
    }

//    @GetMapping("/files/{id}")
//    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
//        FicheAnnexe fileDB = ficheAnnexeService.getFile(id);
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getNom() + "\"")
//                .body(fileDB.getData());
//    }

   @GetMapping("/files")
public ResponseEntity<List<ResponseFiche>> getListFiles() {
    List<ResponseFiche> files = ficheAnnexeService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFiche(
                    dbFile.getNom(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
}
