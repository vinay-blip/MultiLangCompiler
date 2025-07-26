package com.MultiLangCompiler.org.va.controller;

import com.MultiLangCompiler.org.va.dto.auth.LoginRequest;
import com.MultiLangCompiler.org.va.dto.auth.RegisterRequest;
import com.MultiLangCompiler.org.va.dto.auth.AuthResponse;
import com.MultiLangCompiler.org.va.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8081")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (response != null && response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            String message = (response != null) ? response.getMessage() : "Authentication failed";
            return ResponseEntity.status(401)
                    .body(new AuthResponse(null, message, false));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}