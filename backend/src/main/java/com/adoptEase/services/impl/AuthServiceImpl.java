package com.adoptEase.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.LoginRequest;
import com.adoptEase.dtos.request.RegisterCenterRequest;
import com.adoptEase.dtos.request.RegisterParentRequest;
import com.adoptEase.dtos.response.LoginResponse;
import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.entities.ParentProfile;
import com.adoptEase.entities.User;
import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.Role;
import com.adoptEase.exceptions.InvalidCredentialsException;
import com.adoptEase.exceptions.ResourceAlreadyExistsException;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.AdoptionCenterRepository;
import com.adoptEase.repositories.ParentProfileRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.security.JwtService;
import com.adoptEase.services.AuthService;
import com.adoptEase.services.logger.LoggerService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final ParentProfileRepository parentProfileRepository;
	private final AdoptionCenterRepository adoptionCenterRepository;
	private final ModelMapper modelMapper;
	private final JwtService jwtService;
	private final LoggerService loggerService;
	private final PasswordEncoder passwordEncoder; 
	
	@Override
	public LoginResponse login(LoginRequest request) {

	    // Find user by email
	    User user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() ->
	                    new InvalidCredentialsException(
	                            "Email is not registered. Please register first."
	                    ));

	    // Check password
	    if (!passwordEncoder.matches(
	            request.getPassword(),
	            user.getPassword())) {

	        loggerService.log(
	                "WARN",
	                "LOGIN_FAILED",
	                "Incorrect password.",
	                "/api/auth/login",
	                request.getEmail()
	        );

	        throw new InvalidCredentialsException(
	                "Incorrect password. Please try again."
	        );
	    }

	    // Check center account status
	    if (user.getRole() == Role.CENTER_ADMIN) {

	        AdoptionCenter center =
	                adoptionCenterRepository
	                        .findByUserDetailsId(user.getId())
	                        .orElseThrow(() ->
	                                new ResourceNotFoundException(
	                                        "Adoption Center not found."
	                                ));

	        if (Boolean.FALSE.equals(center.getIsActive())) {

	            throw new IllegalStateException(
	                    "Your Adoption Center account has been deactivated."
	            );
	        }
	    }

	    // Generate JWT
	    String token = jwtService.generateToken(user.getEmail());

	    // Create response
	    LoginResponse response = new LoginResponse();

	    response.setUserId(user.getId());
	    response.setUserName(user.getUserName());
	    response.setEmail(user.getEmail());
	    response.setRole(user.getRole());
	    response.setApprovalStatus(user.getApprovalStatus());
	    response.setToken(token);

	    // Log successful login
	    loggerService.log(
	            "INFO",
	            "LOGIN_SUCCESS",
	            "User logged in successfully.",
	            "/api/auth/login",
	            user.getEmail()
	    );

	    return response;
	}
	
	@Override
	public String registerParent(
	        RegisterParentRequest request,
	        MultipartFile profilePhoto,
	        MultipartFile housePhoto,
	        MultipartFile familyPhoto) {

	    // Check if email already exists
	    if (userRepository.existsByEmail(request.getEmail())) {

	        throw new ResourceAlreadyExistsException(
	                "Email already registered."
	        );
	    }

	    // Create User
	    User user = modelMapper.map(
	            request,
	            User.class
	    );

	    // BCrypt password
	    user.setPassword(
	            passwordEncoder.encode(
	                    request.getPassword()
	            )
	    );

	    // Default values
	    user.setRole(Role.PARENT);
	    user.setApprovalStatus(
	            ApprovalStatus.PENDING
	    );

	    // Save User
	    User savedUser =
	            userRepository.save(user);

	    // Create Parent Profile
	    ParentProfile parentProfile =
	            new ParentProfile();

	    parentProfile.setUserDetails(
	            savedUser
	    );

	    parentProfile.setAge(
	            request.getAge()
	    );

	    parentProfile.setOccupation(
	            request.getOccupation()
	    );

	    parentProfile.setAnnualIncome(
	            request.getAnnualIncome()
	    );

	    parentProfile.setMaritalStatus(
	            request.getMaritalStatus()
	    );

	    parentProfile.setGender(
	            request.getGender()
	    );

	 // Upload Parent Photos

	    parentProfile.setProfilePhoto(
	            saveParentImage(profilePhoto)
	    );

	    parentProfile.setHousePhoto(
	    		saveParentImage(housePhoto)
	    );

	    parentProfile.setFamilyPhoto(
	    		saveParentImage(familyPhoto)
	    );

	    parentProfileRepository.save(
	            parentProfile
	    );

	    loggerService.log(
	            "INFO",
	            "PARENT_REGISTERED",
	            "Parent account created successfully.",
	            "/api/auth/register/parent",
	            savedUser.getEmail()
	    );

	    return "Parent account created successfully.";
	}
	
	@Override
	public String registerCenter(
	        RegisterCenterRequest request,
	        MultipartFile centerPhoto) {

	    // Check email
	    if (userRepository.existsByEmail(
	            request.getEmail())) {

	        throw new ResourceAlreadyExistsException(
	                "Email already registered."
	        );
	    }

	    request.setUserName(
	            request.getCenterName()
	    );

	    // Create User
	    User user = modelMapper.map(
	            request,
	            User.class
	    );

	    // BCrypt password
	    user.setPassword(
	            passwordEncoder.encode(
	                    request.getPassword()
	            )
	    );

	    // Default values
	    user.setRole(
	            Role.CENTER_ADMIN
	    );

	    user.setApprovalStatus(
	            ApprovalStatus.PENDING
	    );

	    // Save User
	    User savedUser =
	            userRepository.save(user);

	    // Create Adoption Center
	    AdoptionCenter adoptionCenter =
	            new AdoptionCenter();

	    adoptionCenter.setUserDetails(
	            savedUser
	    );

	    adoptionCenter.setCenterName(
	            request.getCenterName()
	    );

	    adoptionCenter.setLicenseNumber(
	            request.getLicenseNo()
	    );

	    adoptionCenter.setDescription(
	            request.getDescription()
	    );

	    adoptionCenter.setAddress(
	            request.getAddress()
	    );

	    adoptionCenter.setIsActive(true);

	    adoptionCenter.setLatitude(request.getLatitude());
	    adoptionCenter.setLongitude(request.getLongitude());

	    // Upload Center Photo
	    adoptionCenter.setCenterPhoto(
	            saveCenterImage(centerPhoto)
	    );

	    adoptionCenterRepository.save(
	            adoptionCenter
	    );

	    loggerService.log(
	            "INFO",
	            "CENTER_REGISTERED",
	            "Center account created successfully.",
	            "/api/auth/register/center",
	            savedUser.getEmail()
	    );

	    return "Center account created successfully.";
	}

	@Override
	public boolean checkEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	
	private String saveCenterImage(MultipartFile image) {

	    if (image == null || image.isEmpty()) {

	        throw new IllegalArgumentException(
	                "Center image is required."
	        );
	    }

	    try {

	        String originalFileName =
	                image.getOriginalFilename();

	        String extension = "";

	        if (originalFileName != null &&
	                originalFileName.contains(".")) {

	            extension =
	                    originalFileName.substring(
	                            originalFileName.lastIndexOf(".")
	                    );
	        }

	        String fileName =
	                java.util.UUID.randomUUID()
	                        .toString()
	                        + extension;

	        Path uploadPath =
	                Paths.get(
	                        "src/main/resources/static/images/centers"
	                );

	        Files.createDirectories(
	                uploadPath
	        );

	        Path filePath =
	                uploadPath.resolve(fileName);

	        Files.copy(
	                image.getInputStream(),
	                filePath,
	                StandardCopyOption.REPLACE_EXISTING
	        );

	        return fileName;

	    }
	    catch (IOException e) {

	        throw new RuntimeException(
	                "Failed to upload center image.",
	                e
	        );
	    }
	}

	private String saveParentImage(MultipartFile image) {

	    if (image == null || image.isEmpty()) {

	        throw new IllegalArgumentException(
	                "Image is required."
	        );
	    }

	    try {

	        String originalFileName =
	                image.getOriginalFilename();

	        String extension = "";

	        if (originalFileName != null &&
	                originalFileName.contains(".")) {

	            extension =
	                    originalFileName.substring(
	                            originalFileName.lastIndexOf(".")
	                    );
	        }

	        String fileName =
	                java.util.UUID.randomUUID()
	                        .toString()
	                        + extension;

	        Path uploadPath =
	                Paths.get(
	                        "src/main/resources/static/images/parents"
	                );

	        Files.createDirectories(
	                uploadPath
	        );

	        Path filePath =
	                uploadPath.resolve(fileName);

	        Files.copy(
	                image.getInputStream(),
	                filePath,
	                StandardCopyOption.REPLACE_EXISTING
	        );

	        return fileName;

	    }
	    catch (IOException e) {

	        throw new RuntimeException(
	                "Failed to upload parent image.",
	                e
	        );
	    }
	}
}
