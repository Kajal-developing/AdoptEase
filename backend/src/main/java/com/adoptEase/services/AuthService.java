package com.adoptEase.services;

import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.LoginRequest;
import com.adoptEase.dtos.request.RegisterCenterRequest;
import com.adoptEase.dtos.request.RegisterParentRequest;
import com.adoptEase.dtos.response.LoginResponse;

public interface AuthService {
	
	//login request
	LoginResponse login(LoginRequest request);
	
	String registerParent(
	        RegisterParentRequest request,
	        MultipartFile profilePhoto,
	        MultipartFile housePhoto,
	        MultipartFile familyPhoto
	);

	String registerCenter(
	        RegisterCenterRequest request,
	        MultipartFile centerPhoto
	);
	
    boolean checkEmail(String email);
}
