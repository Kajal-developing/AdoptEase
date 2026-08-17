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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.BookMeetingRequest;
import com.adoptEase.dtos.request.RescheduleMeetingRequest;
import com.adoptEase.dtos.request.UpdateParentProfileRequest;
import com.adoptEase.dtos.request.UpdatePasswordRequest;
import com.adoptEase.dtos.response.CenterResponse;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.dtos.response.MeetingResponse;
import com.adoptEase.dtos.response.ParentProfileResponse;
import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.entities.Child;
import com.adoptEase.entities.Meeting;
import com.adoptEase.entities.ParentProfile;
import com.adoptEase.entities.User;
import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.ChildStatus;
import com.adoptEase.enums.MeetingStatus;
import com.adoptEase.enums.NotificationType;
import com.adoptEase.enums.Role;
import com.adoptEase.exceptions.InvalidCredentialsException;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.AdoptionCenterRepository;
import com.adoptEase.repositories.ChildRepository;
import com.adoptEase.repositories.MeetingRepository;
import com.adoptEase.repositories.ParentProfileRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.services.NotificationService;
import com.adoptEase.services.ParentService;
import com.adoptEase.services.logger.LoggerService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService {

	private final UserRepository userRepository;
	private final ParentProfileRepository parentProfileRepository;
	private final ChildRepository childRepository;
	private final MeetingRepository meetingRepository;
	private final AdoptionCenterRepository adoptionCenterRepository;
	private final ModelMapper modelMapper;
	private final NotificationService notificationService;
	private final LoggerService loggerService;
	private final PasswordEncoder passwordEncoder;
	
	private void validateApprovedUser() {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		if (user.getApprovalStatus() != ApprovalStatus.APPROVED) {

			throw new InvalidCredentialsException("Your account is pending approval.");

		}

	}

	@Override
	public List<CenterResponse> getCentersByCity(String city) {

		validateApprovedUser();

		List<AdoptionCenter> centers = adoptionCenterRepository
				.findByUserDetailsCityAndUserDetailsApprovalStatusAndIsActiveTrue(city, ApprovalStatus.APPROVED);

		return centers.stream().map(center -> {
			CenterResponse response = modelMapper.map(center, CenterResponse.class);

			response.setCenterId(center.getId());
			response.setCity(center.getUserDetails().getCity());

			return response;
		}).toList();
	}

	@Override
	public List<ChildResponse> getAvailableChildren(Long centerId) {

		validateApprovedUser();

		List<Child> children = childRepository.findByAdoptionCenterIdAndAvailableStatusAndIsActiveTrue(centerId,
				ChildStatus.AVAILABLE);

		return children.stream().map(child -> {
			ChildResponse response = modelMapper.map(child, ChildResponse.class);

			response.setChildId(child.getId());
			response.setAdoptionCenterId(centerId);
			
			response.setCity(
					child.getAdoptionCenter().getUserDetails().getCity()
			);
			
			response.setAge(

			        Period.between(

			                child.getDateOfBirth(),

			                LocalDate.now()

			        ).getYears()

			);

			return response;
		}).toList();
	}

	@Override
	@Transactional
	public MeetingResponse bookMeeting(Long userId, BookMeetingRequest request) {

		validateApprovedUser();

		// Step 1 : Validate Parent User
		User user = userRepository.findByIdAndRole(userId, Role.PARENT)
				.orElseThrow(() -> new ResourceNotFoundException("Parent not found with ID: " + userId));

		// Step 2 : Get Parent Profile
		ParentProfile parent = parentProfileRepository.findByUserDetailsId(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Parent profile not found."));

		// Step 3 : Get Child
		Child child = childRepository.findById(request.getChildId())
				.orElseThrow(() -> new ResourceNotFoundException("Child not found with ID: " + request.getChildId()));

		// Step 4 : Check Child Availability
		if (!child.getIsActive() || child.getAvailableStatus() != ChildStatus.AVAILABLE) {

			throw new IllegalStateException("Child is not available for adoption.");
		}

		// Step 5 : Prevent Duplicate Pending Request
		boolean alreadyExists = meetingRepository.existsByParentProfileIdAndChildIdAndMeetingStatus(parent.getId(),
				child.getId(), MeetingStatus.PENDING);

		if (alreadyExists) {
			throw new IllegalStateException("You have already requested a meeting for this child.");
		}

		// Step 6 : Get Adoption Center
		AdoptionCenter center = child.getAdoptionCenter();

		// Step 7 : Create Meeting
		Meeting meeting = new Meeting();

		meeting.setParentProfile(parent);
		meeting.setChild(child);
		meeting.setAdoptionCenter(center);

		meeting.setMeetingDate(request.getMeetingDate());
		meeting.setMeetingTime(request.getMeetingTime());

		meeting.setMeetingStatus(MeetingStatus.PENDING);

		meeting.setParentRemarks(request.getRemarks());

		// Step 8 : Save
		meetingRepository.save(meeting);
		
		loggerService.log("INFO", "MEETING_BOOKED", "Meeting booked successfully.", "/api/parent/book-meeting",
				user.getEmail());

		// Step 9 : Create Notification for Center Admin
		notificationService.createNotification(center.getUserDetails(), "New Meeting Request",
				"A new meeting request has been received for child " + child.getChildName() + ".",
				NotificationType.MEETING);

		// Step 10 : Response
		MeetingResponse response = new MeetingResponse();

		response.setMeetingId(meeting.getId());

		response.setChildId(child.getId());
		response.setChildName(child.getChildName());

		response.setAdoptionCenterId(center.getId());
		response.setAdoptionCenterName(center.getCenterName());

		response.setMeetingDate(meeting.getMeetingDate());
		response.setMeetingTime(meeting.getMeetingTime());

		response.setMeetingStatus(meeting.getMeetingStatus());

		response.setCenterRemarks(meeting.getCenterRemarks());

		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public List<MeetingResponse> getScheduledMeetings(Long userId) {

		validateApprovedUser();

		User user = userRepository.findByIdAndRole(userId, Role.PARENT)
				.orElseThrow(() -> new ResourceNotFoundException("Parent not found with ID: " + userId));

		ParentProfile parent = parentProfileRepository
		        .findByUserDetailsId(user.getId())
		        .orElseThrow(() ->
		                new ResourceNotFoundException("Parent profile not found."));

		List<Meeting> meetings = meetingRepository.findByParentProfileId(parent.getId());

		loggerService.log("INFO", "VIEW_MEETINGS", "Parent viewed scheduled meetings.",
				"/parent/" + userId + "/meetings", user.getEmail());

		return meetings.stream().map(meeting -> {

			MeetingResponse response = new MeetingResponse();

			response.setMeetingId(meeting.getId());

			response.setChildId(meeting.getChild().getId());
			response.setChildName(meeting.getChild().getChildName());

			response.setAge(calculateAge(meeting.getChild().getDateOfBirth()));

			response.setAdoptionCenterId(meeting.getAdoptionCenter().getId());

			response.setAdoptionCenterName(meeting.getAdoptionCenter().getCenterName());

			response.setMeetingDate(meeting.getMeetingDate());
			response.setMeetingTime(meeting.getMeetingTime());

			response.setMeetingStatus(meeting.getMeetingStatus());

			if (meeting.getMeetingStatus() == MeetingStatus.PENDING) {

			    response.setCenterRemarks(
			            "Waiting for adoption center approval."
			    );

			}

			else if (meeting.getMeetingStatus() == MeetingStatus.APPROVED) {

			    response.setCenterRemarks(
			            "Please arrive 15 minutes early."
			    );

			}

			else {

			    response.setCenterRemarks(
			            meeting.getCenterRemarks()
			    );

			}

			response.setChildPhoto(
				    meeting.getChild().getChildPhoto()
				);
			return response;

		}).toList();
	}

	private Integer calculateAge(LocalDate dateOfBirth) {

		if (dateOfBirth == null) {
			return null;
		}

		return Period.between(dateOfBirth, LocalDate.now()).getYears();
	}

	@Override
	public String rescheduleMeeting(Long meetingId, RescheduleMeetingRequest request) {

		validateApprovedUser();

		Meeting meeting = meetingRepository.findById(meetingId)
				.orElseThrow(() -> new ResourceNotFoundException("Meeting not found with ID: " + meetingId));

		// Only rejected meetings can be rescheduled
		if (meeting.getMeetingStatus() != MeetingStatus.REJECTED) {
			throw new IllegalStateException("Only rejected meetings can be rescheduled.");
		}

		meeting.setMeetingDate(request.getMeetingDate());
		meeting.setMeetingTime(request.getMeetingTime());

		meeting.setParentRemarks(request.getParentRemarks());

		// Reset workflow
		meeting.setMeetingStatus(MeetingStatus.PENDING);

		// Clear previous rejection reason
		meeting.setCenterRemarks(null);

		meetingRepository.save(meeting);
		loggerService.log("INFO", "MEETING_RESCHEDULED", "Meeting rescheduled successfully.",
				"/api/parent/reschedule-meeting", meeting.getParentProfile().getUserDetails().getEmail());

		// Notify Center Admin
		notificationService.createNotification(
				meeting.getAdoptionCenter().getUserDetails(), "Meeting Rescheduled", "The meeting request for child "
						+ meeting.getChild().getChildName() + " has been rescheduled by the parent.",
				NotificationType.MEETING);

		return "Meeting rescheduled successfully.";
	}

	@Override
	@Transactional
	public String cancelMeeting(Long meetingId) {

	    Meeting meeting = meetingRepository.findById(meetingId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Meeting not found with ID: " + meetingId
	                    ));

	    // Approved meetings cannot be cancelled
	    if (meeting.getMeetingStatus() == MeetingStatus.APPROVED) {

	        throw new IllegalStateException(
	                "Approved meetings cannot be cancelled."
	        );
	    }

	    loggerService.log(
	            "INFO",
	            "MEETING_CANCELLED",
	            "Meeting cancelled successfully.",
	            "/parent/meetings/" + meetingId,
	            meeting.getParentProfile()
	                    .getUserDetails()
	                    .getEmail()
	    );

	    // Remove the ticket from database
	    meetingRepository.delete(meeting);

	    return "Meeting cancelled successfully.";
	}

	@Override
	@Transactional(readOnly = true)
	public ParentProfileResponse getParentProfile(Long userId) {

		ParentProfile parentProfile = parentProfileRepository
		        .findByUserDetailsId(userId)
		        .orElseThrow(() ->
		                new ResourceNotFoundException("Parent profile not found."));
		
		User user = parentProfile.getUserDetails();

		ParentProfileResponse response = new ParentProfileResponse();

		response.setUserId(user.getId());
		response.setUserName(user.getUserName());
		response.setEmail(user.getEmail());
		response.setContactNo(user.getContactNo());
		response.setCity(user.getCity());
		response.setAddress(user.getAddress());
		response.setApprovalStatus(user.getApprovalStatus());

		response.setAge(parentProfile.getAge());
		response.setOccupation(parentProfile.getOccupation());
		response.setAnnualIncome(parentProfile.getAnnualIncome());
		response.setMaritalStatus(parentProfile.getMaritalStatus());

		response.setProfilePhoto(parentProfile.getProfilePhoto());
		response.setHousePhoto(parentProfile.getHousePhoto());
		response.setFamilyPhoto(parentProfile.getFamilyPhoto());
		response.setGender(parentProfile.getGender());
		
		return response;
	}

	@Override
	public String updateParentProfile(
	        Long userId,
	        UpdateParentProfileRequest request) {

	    ParentProfile parentProfile =
	            parentProfileRepository.findById(userId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Parent profile not found."));

	    User user = parentProfile.getUserDetails();

	    // Update User table

	   	    
	    user.setUserName(request.getUserName());
	    user.setContactNo(request.getContactNo());
	    user.setCity(request.getCity());
	    user.setAddress(request.getAddress());

	    // Update Parent Profile table

	    parentProfile.setAge(request.getAge());
	    parentProfile.setGender(request.getGender());
	    parentProfile.setOccupation(request.getOccupation());
	    parentProfile.setAnnualIncome(request.getAnnualIncome());
	    parentProfile.setMaritalStatus(request.getMaritalStatus());
	    
	    userRepository.save(user);
	    parentProfileRepository.save(parentProfile);

	    loggerService.log(
	            "INFO",
	            "PARENT_PROFILE_UPDATED",
	            "Parent profile updated successfully.",
	            "/parent/profile/" + userId,
	            user.getEmail());
	    
	    return "Profile updated successfully.";

	}
	
	@Override
	@Transactional
	public String updateHousePhoto(
	        Long userId,
	        MultipartFile housePhoto) {

	    if (housePhoto == null || housePhoto.isEmpty()) {
	        throw new IllegalArgumentException(
	                "House photo is required."
	        );
	    }

	    ParentProfile parentProfile =
	            parentProfileRepository.findByUserDetailsId(userId)
	                    .orElseThrow(() ->
	                            new ResourceNotFoundException(
	                                    "Parent profile not found."
	                            )
	                    );

	    String fileName = saveParentImage(housePhoto);

	    parentProfile.setHousePhoto(fileName);

	    parentProfileRepository.save(parentProfile);

	    loggerService.log(
	            "INFO",
	            "HOUSE_PHOTO_UPDATED",
	            "Parent house photo updated successfully.",
	            "/parent/profile/" + userId + "/house-photo",
	            parentProfile.getUserDetails().getEmail()
	    );

	    return "House photo updated successfully.";
	}


	@Override
	@Transactional
	public String updateFamilyPhoto(
	        Long userId,
	        MultipartFile familyPhoto) {

	    if (familyPhoto == null || familyPhoto.isEmpty()) {
	        throw new IllegalArgumentException(
	                "Family photo is required."
	        );
	    }

	    ParentProfile parentProfile =
	            parentProfileRepository.findByUserDetailsId(userId)
	                    .orElseThrow(() ->
	                            new ResourceNotFoundException(
	                                    "Parent profile not found."
	                            )
	                    );

	    String fileName = saveParentImage(familyPhoto);

	    parentProfile.setFamilyPhoto(fileName);

	    parentProfileRepository.save(parentProfile);

	    loggerService.log(
	            "INFO",
	            "FAMILY_PHOTO_UPDATED",
	            "Parent family photo updated successfully.",
	            "/parent/profile/" + userId + "/family-photo",
	            parentProfile.getUserDetails().getEmail()
	    );

	    return "Family photo updated successfully.";
	}


	private String saveParentImage(MultipartFile image) {

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

	        Files.createDirectories(uploadPath);

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
	                "Failed to upload parent image.",
	                e
	        );
	    }
	}
	
	
	@Override
	@Transactional
	public String changePassword(
	        Long userId,
	        UpdatePasswordRequest request) {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("User not found."));

	    if (!passwordEncoder.matches(
	            request.getOldPassword(),
	            user.getPassword())) {

	        throw new IllegalArgumentException(
	                "Current password is incorrect.");

	    }

	    user.setPassword(
	            passwordEncoder.encode(request.getNewPassword())
	    );

	    userRepository.save(user);

	    loggerService.log(
	            "INFO",
	            "PASSWORD_CHANGED",
	            "Parent changed password.",
	            "/parent/change-password",
	            user.getEmail());

	    return "Password changed successfully.";
	}
	
	@Override
	public CenterResponse getCenterById(Long centerId) {

	    validateApprovedUser();

	    AdoptionCenter center = adoptionCenterRepository
	            .findById(centerId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Center not found"));

	    CenterResponse response =
	            modelMapper.map(center, CenterResponse.class);

	    response.setCenterId(center.getId());

	    response.setCity(
	            center.getUserDetails().getCity()
	    );

	    response.setContactNo(
	            center.getUserDetails().getContactNo()
	    );

	    response.setEmail(
	            center.getUserDetails().getEmail()
	    );

	    response.setLicenseNumber(
	            center.getLicenseNumber()
	    );

	    response.setIsActive(
	            center.getIsActive()
	    );

	    return response;
	}
	
	@Override
	public ChildResponse getChildById(Long childId) {

	    validateApprovedUser();

	    Child child = childRepository
	            .findById(childId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Child not found."));

	    ChildResponse response =
	            modelMapper.map(child, ChildResponse.class);

	    response.setChildId(child.getId());

	    response.setAdoptionCenterId(
	            child.getAdoptionCenter().getId()
	    );

	    response.setCity(
	    		child.getAdoptionCenter().getUserDetails().getCity()
	    );
	    
	    // Calculate age from DOB
	    if (child.getDateOfBirth() != null) {

	        response.setAge(
	                Period.between(
	                        child.getDateOfBirth(),
	                        LocalDate.now()
	                ).getYears()
	        );

	    }

	    return response;
	}
	
	@Override
	@Transactional
	public String updateProfilePhoto(
	        Long userId,
	        MultipartFile profilePhoto) {

	    if (profilePhoto == null ||
	            profilePhoto.isEmpty()) {

	        throw new IllegalArgumentException(
	                "Profile photo is required."
	        );
	    }

	    ParentProfile parentProfile =
	            parentProfileRepository
	                    .findByUserDetailsId(userId)
	                    .orElseThrow(() ->
	                            new ResourceNotFoundException(
	                                    "Parent profile not found."
	                            )
	                    );

	    String fileName =
	            saveParentImage(profilePhoto);

	    parentProfile.setProfilePhoto(fileName);

	    parentProfileRepository.save(parentProfile);

	    return "Profile photo updated successfully.";
	}
}
