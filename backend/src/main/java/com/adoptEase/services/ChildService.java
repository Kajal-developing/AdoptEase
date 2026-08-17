package com.adoptEase.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.AddChildRequest;
import com.adoptEase.dtos.request.UpdateChildRequest;
import com.adoptEase.dtos.response.ChildResponse;

public interface ChildService {
	String addChild(
	        Long userId,
	        AddChildRequest request,
	        MultipartFile image
	);

    List<ChildResponse> getChildrenByCenter(Long centerId);

    ChildResponse getChildById(Long childId);

    String updateChild(Long childId, UpdateChildRequest request);

    String deactivateChild(Long childId);
}
