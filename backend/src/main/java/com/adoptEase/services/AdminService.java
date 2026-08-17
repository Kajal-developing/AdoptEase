package com.adoptEase.services;

import java.util.List;

import com.adoptEase.dtos.response.ParentResponse;
import com.adoptEase.dtos.request.UpdateAdminProfileRequest;
import com.adoptEase.dtos.response.AdminDashboardResponse;
import com.adoptEase.dtos.response.AdminProfileResponse;
import com.adoptEase.dtos.response.AdoptionCenterResponse;

public interface AdminService {

    // View pending parents
    List<ParentResponse> getPendingParents();

    // View pending centers
    List<AdoptionCenterResponse> getPendingCenters();

    // Approve parent
    String approveParent(Long userId);

    // Reject parent
    String rejectParent(Long userId, String remark);

    // Approve center
    String approveCenter(Long userId);

    // Reject center
    String rejectCenter(Long userId, String remark);
    
    AdminDashboardResponse getDashboard();
    
    AdminProfileResponse getAdminProfile(Long userId);

    AdminProfileResponse updateAdminProfile(
            Long userId,
            UpdateAdminProfileRequest request);
}