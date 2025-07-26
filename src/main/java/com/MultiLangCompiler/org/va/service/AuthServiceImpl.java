package com.MultiLangCompiler.org.va.service;

import com.MultiLangCompiler.org.va.Entity.User;
import com.MultiLangCompiler.org.va.dao.UserRepository;
import com.MultiLangCompiler.org.va.dto.auth.AuthResponse;
import com.MultiLangCompiler.org.va.dto.auth.LoginRequest;
import com.MultiLangCompiler.org.va.dto.auth.RegisterRequest;
import com.MultiLangCompiler.org.va.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            
            return new AuthResponse(jwt, "Login successful", true);
        } catch (Exception e) {
            return new AuthResponse(null, "Invalid email or password", false);
        }
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest registerRequest) {
        // Check if user exists
        if (userRepository.existsByGmail(registerRequest.getEmail())) {
            return new AuthResponse(null, "Email is already in use!", false);
        }

        // Create and save user in a single transaction
        User user = new User();
        user.setKey(UUID.randomUUID());
        user.setName(registerRequest.getName());
        user.setGmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        
        // Save the user (will be managed by the current transaction)
        User savedUser = userRepository.save(user);
        
        return new AuthResponse(null, "User registered successfully!", true);
    }
}
