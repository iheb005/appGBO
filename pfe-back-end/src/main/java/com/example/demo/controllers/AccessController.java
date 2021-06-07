package com.example.demo.controllers;

import com.example.demo.configuration.security.jwt.JwtUtils;
import com.example.demo.message.LoginModel;
import com.example.demo.message.LoginResponse;
import com.example.demo.message.RegistrationModel;
import com.example.demo.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/access")
public class AccessController {

    private final AuthenticationManager authManager;
    private final JwtUtils tokenUtils;
    private final UserDetailsService userDetailsService;
    private final UtilisateurService utilisateurService;

    @Autowired
    public AccessController(AuthenticationManager authManager,
                            JwtUtils tokenUtils,
                            @Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService,
                            UtilisateurService utilisateurService) {
        this.authManager = authManager;
        this.tokenUtils = tokenUtils;
        this.userDetailsService = userDetailsService;
        this.utilisateurService = utilisateurService;
    }

    @PostMapping(value = "/authenticate")
    public LoginResponse authenticate(@RequestBody LoginModel login) throws Exception {
        authenticate(login.getEmail(), login.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(login.getEmail());
        final String token = tokenUtils.generateToken(userDetails);
        return new LoginResponse(token);
    }



    private void authenticate(String username, String password) throws AuthenticationException {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException de) {
            throw new DisabledException("USER DISABLED", de);
        } catch (BadCredentialsException bce) {
            throw new BadCredentialsException("Invalid credentials", bce);
        }
    }
}
