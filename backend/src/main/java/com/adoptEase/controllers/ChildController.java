package com.adoptEase.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.adoptEase.dtos.request.AddChildRequest;
import com.adoptEase.dtos.request.UpdateChildRequest;
import com.adoptEase.dtos.response.ChildResponse;
import com.adoptEase.services.ChildService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/center")
@RequiredArgsConstructor
public class ChildController {
	private final ChildService childService;

	@PostMapping(
	        value = "/{userId}/children",
	        consumes = "multipart/form-data"
	)
	public ResponseEntity<String> addChild(
	        @PathVariable Long userId,
	        @RequestPart("child") @Valid AddChildRequest request,
	        @RequestPart(value = "image", required = false) MultipartFile image) {

	    return ResponseEntity.ok(
	            childService.addChild(userId, request, image)
	    );
	}
	    
	@Operation(description = "Get child by ID")
    @GetMapping("/children/{childId}")
    public ResponseEntity<ChildResponse> getChildById(
            @PathVariable Long childId) {

        return ResponseEntity.ok(childService.getChildById(childId));
    }
    
	@Operation(description = "Update child")
	@PutMapping(
	        value = "/children/{childId}",
	        consumes = "multipart/form-data"
	)
	public ResponseEntity<String> updateChild(
	        @PathVariable Long childId,
	        @Valid @ModelAttribute UpdateChildRequest request) {

	    return ResponseEntity.ok(
	            childService.updateChild(childId, request));
	}
    
	@Operation(description = "Delete child by ID")
    @PutMapping("/children/{childId}/deactivate")
    public ResponseEntity<String> deactivateChild(
            @PathVariable Long childId) {

        return ResponseEntity.ok(childService.deactivateChild(childId));
    }
}
