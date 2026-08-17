package com.adoptEase.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adoptEase.dtos.request.UpdateAdminProfileRequest;
import com.adoptEase.dtos.response.AdminDashboardResponse;
import com.adoptEase.dtos.response.AdminProfileResponse;
import com.adoptEase.dtos.response.AdoptionCenterResponse;
import com.adoptEase.dtos.response.ParentResponse;
import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.entities.ParentProfile;
import com.adoptEase.entities.User;
import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.ChildStatus;
import com.adoptEase.enums.MeetingStatus;
import com.adoptEase.enums.NotificationType;
import com.adoptEase.enums.Role;
import com.adoptEase.enums.TicketStatus;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.AdoptionCenterRepository;
import com.adoptEase.repositories.ChildRepository;
import com.adoptEase.repositories.MeetingRepository;
import com.adoptEase.repositories.ParentProfileRepository;
import com.adoptEase.repositories.TicketRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.services.AdminService;
import com.adoptEase.services.NotificationService;
import com.adoptEase.services.logger.LoggerService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepository;
	private final ChildRepository childRepository;
	private final MeetingRepository meetingRepository;
    private final TicketRepository ticketRepository;
	private final ParentProfileRepository parentProfileRepository;
	private final AdoptionCenterRepository adoptionCenterRepository;
	private final NotificationService notificationService;
	private final LoggerService loggerService;
	
	@Override
	public List<ParentResponse> getPendingParents() {

		// Get all pending parent profiles
		List<ParentProfile> parentProfiles = parentProfileRepository
				.findByUserDetailsApprovalStatus(ApprovalStatus.PENDING);
		
		loggerService.log(
		        "INFO",
		        "VIEW_PENDING_PARENTS",
		        "Admin viewed pending parents.",
		        "/admin/pending-parents",
		        "ADMIN");

		// Convert entities to response DTOs
		return parentProfiles.stream().map(parent -> {

			ParentResponse response = new ParentResponse();

			// User Details
			response.setUserId(parent.getUserDetails().getId());
			response.setUserName(parent.getUserDetails().getUserName());
			response.setEmail(parent.getUserDetails().getEmail());
			response.setContactNo(parent.getUserDetails().getContactNo());
			response.setAddress(parent.getUserDetails().getAddress());
			response.setCity(parent.getUserDetails().getCity());
			response.setApprovalStatus(parent.getUserDetails().getApprovalStatus());

			// Parent Details
			response.setAge(parent.getAge());
			response.setOccupation(parent.getOccupation());
			response.setAnnualIncome(parent.getAnnualIncome());
			response.setMaritalStatus(parent.getMaritalStatus());
			response.setProfilePhoto(parent.getProfilePhoto());
			response.setHousePhoto(parent.getHousePhoto());
			response.setFamilyPhoto(parent.getFamilyPhoto());

			return response;
		}).toList();
	}

	@Override
	public List<AdoptionCenterResponse> getPendingCenters() {

		// Get all pending adoption centers
		List<AdoptionCenter> adoptionCenters = adoptionCenterRepository
				.findByUserDetailsApprovalStatus(ApprovalStatus.PENDING);

		loggerService.log(
		        "INFO",
		        "VIEW_PENDING_CENTERS",
		        "Admin viewed pending centers.",
		        "/admin/pending-centers",
		        "ADMIN");
		
		// Convert entities to response DTOs
		return adoptionCenters.stream().map(center -> {

			AdoptionCenterResponse response = new AdoptionCenterResponse();

			// User Details
			response.setCenterId(center.getUserDetails().getId());
			response.setCenterAdminName(center.getUserDetails().getUserName());
			response.setEmail(center.getUserDetails().getEmail());
			response.setContactNo(center.getUserDetails().getContactNo());
			response.setAddress(center.getUserDetails().getAddress());
			response.setCity(center.getUserDetails().getCity());

			// Adoption Center Details
			response.setCenterName(center.getCenterName());
			response.setLicenseNo(center.getLicenseNumber());
			response.setDescription(center.getDescription());
			response.setLatitude(center.getLatitude());
			response.setLongitude(center.getLongitude());
			response.setIsActive(center.getIsActive());
			response.setCenterPhoto(center.getCenterPhoto());
			
			return response;
		}).toList();
	}

	@Override
	public String approveParent(Long userId) {

		// Find user
		User user = userRepository.findByIdAndRole(userId, Role.PARENT)
		        .orElseThrow(() ->
		                new ResourceNotFoundException("Parent not found with ID: " + userId));
		// Update approval status
		user.setApprovalStatus(ApprovalStatus.APPROVED);

		// Save updated user
		userRepository.save(user);
		
		loggerService.log(
		        "INFO",
		        "PARENT_APPROVED",
		        "Parent approved successfully.",
		        "/admin/approve-parent/" + userId,
		        user.getEmail());
		
		notificationService.createNotification(
		        user,
		        "Registration Approved",
		        "Your parent registration has been approved.",
		        NotificationType.APPROVAL);

		return "Parent approved successfully.";
	}

	@Override
	@Transactional
	public String rejectParent(Long userId, String remark) {

	    User user = userRepository
	            .findByIdAndRole(userId, Role.PARENT)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Parent not found with ID: " + userId
	                    )
	            );

	    user.setApprovalStatus(ApprovalStatus.REJECTED);

	    userRepository.save(user);

	    loggerService.log(
	            "INFO",
	            "PARENT_REJECTED",
	            "Parent request rejected by admin.",
	            "/admin/parents/" + userId + "/reject",
	            user.getEmail()
	    );

	    return "Parent request rejected successfully.";
	}

	@Override
	public String approveCenter(Long userId) {

		// Find user
		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
		        .orElseThrow(() ->
		                new ResourceNotFoundException("Adoption center not found with ID: " + userId));
		
		// Find adoption center
		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Adoption center not found."));

		// Update approval status
		user.setApprovalStatus(ApprovalStatus.APPROVED);

		// Activate center
		center.setIsActive(true);

		// Save changes
		userRepository.save(user);
		adoptionCenterRepository.save(center);
		
		loggerService.log(
		        "INFO",
		        "CENTER_APPROVED",
		        "Adoption center approved successfully.",
		        "/admin/approve-center/" + userId,
		        user.getEmail());
		
		notificationService.createNotification(
		        user,
		        "Registration Approved",
		        "Your adoption center registration has been approved.",
		        NotificationType.APPROVAL);

		return "Adoption center approved successfully.";
	}


	@Override
	public String rejectCenter(
	        Long userId,
	        String remark) {

		// Find user
		User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
		        .orElseThrow(() ->
		                new ResourceNotFoundException("Adoption center not found with ID: " + userId));
		
		// Find adoption center
		AdoptionCenter center = adoptionCenterRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Adoption center not found."));

		// Update approval status
		user.setApprovalStatus(ApprovalStatus.REJECTED);

		// Deactivate center
		center.setIsActive(false);

		// Save changes
		userRepository.save(user);
		adoptionCenterRepository.save(center);
		
		loggerService.log(
		        "INFO",
		        "CENTER_REJECTED",
		        "Adoption center rejected successfully. Remark: " + remark,
		        "/admin/reject-center/" + userId,
		        user.getEmail());
		
		notificationService.createNotification(
		        user,
		        "Registration Rejected",
		        "Your adoption center registration has been rejected.",
		        NotificationType.APPROVAL);

		return "Adoption center rejected successfully.";
	}

	@Override
    public AdminDashboardResponse getDashboard() {

        AdminDashboardResponse response = new AdminDashboardResponse();

        // Parent Statistics
        response.setTotalParents(
                userRepository.countByRole(Role.PARENT));

        // Center Statistics
        response.setTotalCenters(
                userRepository.countByRole(Role.CENTER_ADMIN));

        response.setApprovedCenters(
                userRepository.countByRoleAndApprovalStatus(
                        Role.CENTER_ADMIN,
                        ApprovalStatus.APPROVED));

        response.setPendingCenters(
                userRepository.countByRoleAndApprovalStatus(
                        Role.CENTER_ADMIN,
                        ApprovalStatus.PENDING));

        // Child Statistics
        response.setTotalChildren(
                childRepository.count());

        response.setAvailableChildren(
                childRepository.countByAvailableStatusAndIsActiveTrue(
                        ChildStatus.AVAILABLE));

        // Meeting Statistics
        response.setTotalMeetings(
                meetingRepository.count());

        response.setPendingMeetings(
                meetingRepository.countByMeetingStatus(
                        MeetingStatus.PENDING));

        // Ticket Statistics
        response.setTotalTickets(
                ticketRepository.count());

        response.setOpenTickets(
                ticketRepository.countByStatus(
                        TicketStatus.OPEN));

        loggerService.log(
                "INFO",
                "VIEW_ADMIN_DASHBOARD",
                "Admin viewed dashboard.",
                "/admin/dashboard",
                "ADMIN");
        
        return response;
    }
	
	@Override
	public AdminProfileResponse getAdminProfile(Long userId) {

	    User user = userRepository
	            .findByIdAndRole(userId, Role.ADMIN)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Admin not found with ID: " + userId
	                    )
	            );

	    AdminProfileResponse response =
	            new AdminProfileResponse();

	    response.setUserId(user.getId());
	    response.setUserName(user.getUserName());
	    response.setEmail(user.getEmail());
	    response.setContactNo(user.getContactNo());
	    response.setAddress(user.getAddress());
	    response.setCity(user.getCity());
	    response.setRole(user.getRole());
	    response.setApprovalStatus(user.getApprovalStatus());

	    loggerService.log(
	            "INFO",
	            "VIEW_ADMIN_PROFILE",
	            "Admin viewed profile.",
	            "/admin/profile/" + userId,
	            user.getEmail()
	    );

	    return response;
	}
	
	@Override
	public AdminProfileResponse updateAdminProfile(
	        Long userId,
	        UpdateAdminProfileRequest request) {

	    User user = userRepository
	            .findByIdAndRole(userId, Role.ADMIN)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Admin not found with ID: " + userId
	                    ));

	    // Check if email is being changed
	    if (!user.getEmail().equalsIgnoreCase(request.getEmail())
	            && userRepository.existsByEmail(request.getEmail())) {

	        throw new IllegalArgumentException(
	                "This email is already registered."
	        );
	    }

	    // Update details
	    user.setUserName(request.getUserName());
	    user.setEmail(request.getEmail());
	    user.setContactNo(request.getContactNo());

	    User updatedUser = userRepository.save(user);

	    loggerService.log(
	            "INFO",
	            "ADMIN_PROFILE_UPDATED",
	            "Admin profile updated successfully.",
	            "/admin/profile/" + userId,
	            updatedUser.getEmail()
	    );

	    AdminProfileResponse response =
	            new AdminProfileResponse();

	    response.setUserId(updatedUser.getId());
	    response.setUserName(updatedUser.getUserName());
	    response.setEmail(updatedUser.getEmail());
	    response.setContactNo(updatedUser.getContactNo());
	    response.setAddress(updatedUser.getAddress());
	    response.setCity(updatedUser.getCity());
	    response.setRole(updatedUser.getRole());
	    response.setApprovalStatus(updatedUser.getApprovalStatus());

	    return response;
	}
}
