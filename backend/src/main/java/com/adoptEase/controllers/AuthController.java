package com.adoptEase.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.LoginRequest;
import com.adoptEase.dtos.request.RegisterCenterRequest;
import com.adoptEase.dtos.request.RegisterParentRequest;
import com.adoptEase.dtos.response.LoginResponse;
import com.adoptEase.services.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final AuthService authService;

    // Register Parent
    @Operation(description = "Register parent")
    @PostMapping(value = "/register/parent", consumes = "multipart/form-data")
    public ResponseEntity<String> registerParent(
            @Valid @RequestPart("data") RegisterParentRequest request,
            @RequestPart(value = "profilePhoto", required = false) MultipartFile profilePhoto,
            @RequestPart(value = "housePhoto", required = false) MultipartFile housePhoto,
            @RequestPart(value = "familyPhoto", required = false) MultipartFile familyPhoto) {

        return new ResponseEntity<>(
                authService.registerParent(
                        request,
                        profilePhoto,
                        housePhoto,
                        familyPhoto
                ),
                HttpStatus.CREATED
        );
    }

    // Register Adoption Center
    @Operation(description = "Register center")
    @PostMapping(value = "/register/center", consumes = "multipart/form-data")
    public ResponseEntity<String> registerCenter(
            @Valid @RequestPart("data") RegisterCenterRequest request,
            @RequestPart(value = "centerPhoto", required = false) MultipartFile centerPhoto) {

        return new ResponseEntity<>(
                authService.registerCenter(
                        request,
                        centerPhoto
                ),
                HttpStatus.CREATED
        );
    }

    // Login User
    @Operation(description = "Login")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }
    
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(authService.checkEmail(email));
    }

}