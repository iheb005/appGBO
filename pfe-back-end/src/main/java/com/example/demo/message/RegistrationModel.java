package com.example.demo.message;

import lombok.Data;

@Data
public class RegistrationModel {

    private Long id;
    private String nomComplete;
    private String email;
    private String password;
    private String typeStructure;
    private String telephone;
    private boolean active;
    private String role;
}
