package com.adoptEase.services.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.Period;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.adoptEase.dtos.request.AddChildRequest;
import com.adoptEase.dtos.request.UpdateChildRequest;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.entities.Child;
import com.adoptEase.entities.User;
import com.adoptEase.enums.ChildStatus;
import com.adoptEase.enums.Role;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.AdoptionCenterRepository;
import com.adoptEase.repositories.ChildRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.services.ChildService;
import com.adoptEase.services.logger.LoggerService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChildServiceImpl implements ChildService {

	private final ChildRepository childRepository;
	private final AdoptionCenterRepository adoptionCenterRepository;
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final LoggerService loggerService;

	@Override
	public String addChild(Long userId, AddChildRequest request, MultipartFile image) {

		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center not found with ID: " + userId));

		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center details not found."));

		Child child = modelMapper.map(request, Child.class);

		// Backend-controlled values
		child.setAvailableStatus(ChildStatus.AVAILABLE);
		child.setIsActive(true);

		// Associate child with center
		child.setAdoptionCenter(center);

		// Upload child image
		if (image != null && !image.isEmpty()) {

			try {

				String fileName = image.getOriginalFilename();

				Path uploadPath = Paths.get("uploads/children");

				Files.createDirectories(uploadPath);

				Path filePath = uploadPath.resolve(fileName);

				Files.copy(image.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

				// Store filename in database
				child.setChildPhoto(fileName);

			} catch (IOException e) {

				throw new RuntimeException("Failed to upload child image.");
			}
		}

		childRepository.save(child);

		loggerService.log("INFO", "CHILD_ADDED", "Child added successfully.", "/center/" + userId + "/children",
				user.getEmail());

		return "Child added successfully.";
	}

	@Override
	@Transactional(readOnly = true)
	public List<ChildResponse> getChildrenByCenter(Long userId) {

		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center not found with ID: " + userId));

		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center details not found."));

		List<Child> children = childRepository.findByAdoptionCenterIdAndIsActiveTrue(center.getId());

		loggerService.log("INFO", "VIEW_CHILDREN", "Viewed children list.", "/center/" + userId + "/children",
				user.getEmail());

		return children.stream().map(child -> {
			ChildResponse response = modelMapper.map(child, ChildResponse.class);

			response.setChildId(child.getId());
			response.setAdoptionCenterId(center.getId());
			response.setAge(calculateAge(child.getDateOfBirth()));

			return response;
		}).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public ChildResponse getChildById(Long childId) {

		Child child = childRepository.findById(childId)
				.orElseThrow(() -> new ResourceNotFoundException("Child not found with id : " + childId));

		loggerService.log("INFO", "VIEW_CHILD", "Viewed child details.", "/children/" + childId,
				child.getAdoptionCenter().getUserDetails().getEmail());

		ChildResponse response = modelMapper.map(child, ChildResponse.class);

		response.setChildId(child.getId());
		response.setAdoptionCenterId(child.getAdoptionCenter().getId());
		response.setAge(calculateAge(child.getDateOfBirth()));

		return response;
	}

	@Override
	public String updateChild(Long childId, UpdateChildRequest request) {

	    Child child = childRepository.findById(childId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Child not found with id : " + childId));

	    // Update basic information
	    child.setChildName(request.getChildName());
	    child.setDateOfBirth(request.getDateOfBirth());
	    child.setGender(request.getGender());
	    child.setHealthStatus(request.getHealthStatus());
	    child.setDescription(request.getDescription());

	    // Update status
	    child.setAvailableStatus(request.getAvailableStatus());

	    // Update image only when a new image is selected
	    if (request.getChildPhoto() != null
	            && !request.getChildPhoto().isEmpty()) {

	        try {

	            String fileName =
	                    request.getChildPhoto().getOriginalFilename();

	            Path uploadPath =
	                    Paths.get("uploads/children");

	            Files.createDirectories(uploadPath);

	            Path filePath =
	                    uploadPath.resolve(fileName);

	            Files.copy(
	                    request.getChildPhoto().getInputStream(),
	                    filePath,
	                    java.nio.file.StandardCopyOption.REPLACE_EXISTING
	            );

	            // Store new filename in database
	            child.setChildPhoto(fileName);

	        }
	        catch (IOException e) {

	            throw new RuntimeException(
	                    "Failed to upload child image."
	            );

	        }
	    }

	    childRepository.save(child);

	    loggerService.log(
	            "INFO",
	            "CHILD_UPDATED",
	            "Child updated successfully.",
	            "/children/" + childId,
	            child.getAdoptionCenter()
	                 .getUserDetails()
	                 .getEmail()
	    );

	    return "Child updated successfully.";
	}

	@Override
	public String deactivateChild(Long childId) {

		Child child = childRepository.findById(childId)
				.orElseThrow(() -> new ResourceNotFoundException("Child not found with id : " + childId));

		child.setIsActive(false);

		childRepository.save(child);

		loggerService.log("INFO", "CHILD_DEACTIVATED", "Child deactivated successfully.", "/children/" + childId,
				child.getAdoptionCenter().getUserDetails().getEmail());

		return "Child deactivated successfully.";
	}

	private Integer calculateAge(LocalDate dob) {

		if (dob == null) {
			return null;
		}

		return Period.between(dob, LocalDate.now()).getYears();
	}

}
