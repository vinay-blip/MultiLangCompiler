package com.MultiLangCompiler.org.va.service;

import com.MultiLangCompiler.org.va.dto.auth.AuthResponse;
import com.MultiLangCompiler.org.va.dto.auth.LoginRequest;
import com.MultiLangCompiler.org.va.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest registerRequest);
    AuthResponse login(LoginRequest loginRequest);
}
