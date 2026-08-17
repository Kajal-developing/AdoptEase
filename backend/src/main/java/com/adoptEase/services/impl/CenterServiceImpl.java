package com.adoptEase.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.MeetingApprovalRequest;
import com.adoptEase.dtos.request.MeetingRejectionRequest;
import com.adoptEase.dtos.request.UpdateCenterProfileRequest;
import com.adoptEase.dtos.request.UpdatePasswordRequest;
import com.adoptEase.dtos.response.CenterMeetingResponse;
import com.adoptEase.dtos.response.CenterResponse;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.entities.Child;
import com.adoptEase.entities.Meeting;
import com.adoptEase.entities.User;
import com.adoptEase.enums.MeetingStatus;
import com.adoptEase.enums.NotificationType;
import com.adoptEase.enums.Role;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.AdoptionCenterRepository;
import com.adoptEase.repositories.ChildRepository;
import com.adoptEase.repositories.MeetingRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.services.CenterService;
import com.adoptEase.services.NotificationService;
import com.adoptEase.services.logger.LoggerService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CenterServiceImpl implements CenterService {

	private final ModelMapper modelMapper;

	private final UserRepository userRepository;
	private final AdoptionCenterRepository adoptionCenterRepository;
	private final MeetingRepository meetingRepository;
	private final NotificationService notificationService;
	private final LoggerService loggerService;
	private final ChildRepository childRepository;
	private final PasswordEncoder passwordEncoder;
	@Override
	@Transactional(readOnly = true)
	public List<CenterMeetingResponse> getMeetingRequests(Long userId) {

		// Step 1 : Validate Center User
		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center not found with ID: " + userId));

		// Step 2 : Get Adoption Center Profile
		AdoptionCenter center = adoptionCenterRepository.findById(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center profile not found."));

		// Step 3 : Fetch Pending Meeting Requests
		List<Meeting> meetings = meetingRepository.findByAdoptionCenterIdAndMeetingStatus(center.getId(),
				MeetingStatus.PENDING);

		loggerService.log("INFO", "VIEW_MEETING_REQUESTS", "Center viewed pending meeting requests.",
				"/center/meetings", user.getEmail());

		// Step 4 : Convert Entity to DTO
		return meetings.stream().map(meeting -> {

			CenterMeetingResponse response = new CenterMeetingResponse();

			response.setMeetingId(meeting.getId());

			response.setParentId(meeting.getParentProfile().getId());
			response.setParentName(meeting.getParentProfile().getUserDetails().getUserName());

			response.setChildId(meeting.getChild().getId());
			response.setChildName(meeting.getChild().getChildName());

			response.setAge(calculateAge(meeting.getChild().getDateOfBirth()));

			response.setMeetingDate(meeting.getMeetingDate());
			response.setMeetingTime(meeting.getMeetingTime());

			response.setParentRemarks(meeting.getParentRemarks());

			response.setParentAddress(meeting.getParentProfile().getUserDetails().getAddress());
			return response;

		}).toList();
	}

	// Helper Method
	private Integer calculateAge(LocalDate dob) {

		if (dob == null) {
			return null;
		}

		return Period.between(dob, LocalDate.now()).getYears();
	}

	@Override
	public String approveMeeting(Long meetingId, MeetingApprovalRequest request) {

		Meeting meeting = meetingRepository.findById(meetingId)
				.orElseThrow(() -> new ResourceNotFoundException("Meeting not found with ID: " + meetingId));

		if (meeting.getMeetingStatus() != MeetingStatus.PENDING) {
			throw new IllegalStateException("Only pending meetings can be approved.");
		}

		meeting.setMeetingStatus(MeetingStatus.APPROVED);

		meeting.setCenterRemarks(request.getCenterRemarks());

		meetingRepository.save(meeting);

		loggerService.log("INFO", "MEETING_APPROVED", "Meeting approved successfully.",
				"/center/meetings/" + meetingId + "/approve", meeting.getAdoptionCenter().getUserDetails().getEmail());

		// Notify Parent
		notificationService.createNotification(meeting.getParentProfile().getUserDetails(), "Meeting Approved",
				"Your meeting request for child " + meeting.getChild().getChildName() + " has been approved.",
				NotificationType.APPROVAL);

		return "Meeting approved successfully.";
	}

	@Override
	public String rejectMeeting(Long meetingId, MeetingRejectionRequest request) {

		Meeting meeting = meetingRepository.findById(meetingId)
				.orElseThrow(() -> new ResourceNotFoundException("Meeting not found with ID: " + meetingId));

		// Only pending meetings can be rejected
		if (meeting.getMeetingStatus() != MeetingStatus.PENDING) {
			throw new IllegalStateException("Only pending meetings can be rejected.");
		}

		meeting.setMeetingStatus(MeetingStatus.REJECTED);

		meeting.setCenterRemarks(request.getCenterRemarks());

		meetingRepository.save(meeting);

		loggerService.log("INFO", "MEETING_REJECTED", "Meeting rejected successfully.",
				"/center/meetings/" + meetingId + "/reject", meeting.getAdoptionCenter().getUserDetails().getEmail());

		// Notify Parent
		notificationService
				.createNotification(meeting.getParentProfile().getUserDetails(), "Meeting Rejected",
						"Your meeting request for child " + meeting.getChild().getChildName()
								+ " has been rejected. Reason: " + meeting.getCenterRemarks(),
						NotificationType.APPROVAL);

		return "Meeting rejected successfully.";
	}

	@Override
	public CenterResponse getCenterProfile(Long userId) {

		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
				.orElseThrow(() -> new ResourceNotFoundException("Center user not found."));

		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Center not found."));

		CenterResponse response = modelMapper.map(center, CenterResponse.class);

		response.setApprovalStatus(center.getUserDetails().getApprovalStatus());

		response.setCreatedAt(center.getCreatedAt());

		response.setCenterId(center.getId());

		response.setEmail(center.getUserDetails().getEmail());

		response.setContactNo(center.getUserDetails().getContactNo());

		response.setCity(center.getUserDetails().getCity());

		response.setLatitude(center.getLatitude());
		response.setLongitude(center.getLongitude());
		
		return response;
	}

	@Override
	public String updateCenterProfile(Long userId, UpdateCenterProfileRequest request) {

		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
				.orElseThrow(() -> new ResourceNotFoundException("Center user not found."));

		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Center not found."));

		center.setCenterName(request.getCenterName());
		center.setDescription(request.getDescription());
		center.setAddress(request.getAddress());
		center.setLatitude(request.getLatitude());
		center.setLongitude(request.getLongitude());
		center.setLicenseNumber(request.getLicenseNumber());

		user.setEmail(request.getEmail());
		user.setContactNo(request.getContactNo());
		user.setCity(request.getCity());
		adoptionCenterRepository.save(center);
		userRepository.save(user);

		loggerService.log("INFO", "CENTER_PROFILE_UPDATED", "Center profile updated successfully.",
				"/center/profile/" + userId, user.getEmail());

		return "Center profile updated successfully.";
	}

	@Override
	@Transactional
	public String changePassword(Long userId, UpdatePasswordRequest request) {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("User not found."));

	    // Verify current password
	    if (!passwordEncoder.matches(
	            request.getOldPassword(),
	            user.getPassword())) {

	        throw new IllegalArgumentException(
	                "Current password is incorrect.");
	    }

	    // Encode new password before saving
	    user.setPassword(
	            passwordEncoder.encode(request.getNewPassword())
	    );

	    userRepository.save(user);

	    loggerService.log(
	            "INFO",
	            "PASSWORD_CHANGED",
	            "Password changed successfully.",
	            "/center/change-password",
	            user.getEmail()
	    );

	    return "Password changed successfully.";
	}

	@Override
	@Transactional
	public String deactivateAccount(Long userId) {

		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Adoption Center not found."));

		center.setIsActive(false);

		adoptionCenterRepository.save(center);

		loggerService.log("INFO", "CENTER_ACCOUNT_DEACTIVATED", "Adoption Center account deactivated.",
				"/center/" + userId + "/deactivate", center.getUserDetails().getEmail());

		return "Account deactivated successfully.";
	}

	@Override
	@Transactional(readOnly = true)
	public List<ChildResponse> getChildrenByCenter(Long userId) {

		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
				.orElseThrow(() -> new ResourceNotFoundException("Center user not found."));

		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Center not found."));

		List<Child> children = childRepository.findByAdoptionCenterIdAndIsActiveTrue(center.getId());

		return children.stream().map(child -> {

			ChildResponse response = new ChildResponse();

			response.setChildId(child.getId());
			response.setChildName(child.getChildName());
			response.setDateOfBirth(child.getDateOfBirth());
			response.setAge(calculateAge(child.getDateOfBirth()));
			response.setGender(child.getGender());
			response.setHealthStatus(child.getHealthStatus());
			response.setDescription(child.getDescription());
			response.setChildPhoto(child.getChildPhoto());
			response.setAvailableStatus(child.getAvailableStatus());
			response.setAdoptionCenterId(center.getId());
			response.setCity(user.getCity());

			return response;

		}).toList();
	}
	
	@Override
	@Transactional
	public String updateCenterPhoto(
	        Long userId,
	        MultipartFile centerPhoto) {

	    if (centerPhoto == null ||
	            centerPhoto.isEmpty()) {

	        throw new IllegalArgumentException(
	                "Center photo is required."
	        );
	    }

	    AdoptionCenter centerProfile =
	            adoptionCenterRepository
	                    .findByUserDetailsId(userId)
	                    .orElseThrow(() ->
	                            new ResourceNotFoundException(
	                                    "Center profile not found."
	                            )
	                    );

	    String fileName =
	            saveCenterImage(centerPhoto);

	    centerProfile.setCenterPhoto(fileName);

	    adoptionCenterRepository.save(centerProfile);

	    return "Center photo updated successfully.";
	}
	
	private String saveCenterImage(
	        MultipartFile image) {

	    if (image == null || image.isEmpty()) {
	        throw new IllegalArgumentException(
	                "Center photo is required."
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

	    } catch (IOException e) {

	        throw new RuntimeException(
	                "Failed to upload center image.",
	                e
	        );
	    }
	}
}