package com.adoptEase.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.enums.ApprovalStatus;

@Repository
public interface AdoptionCenterRepository extends JpaRepository<AdoptionCenter, Long> {
	List<AdoptionCenter> findByIsActiveTrue();

	List<AdoptionCenter> findByUserDetailsApprovalStatus(ApprovalStatus approvalStatus);

	Optional<AdoptionCenter> findByUserDetailsId(Long userId);
	
	List<AdoptionCenter> findByUserDetailsCityAndUserDetailsApprovalStatusAndIsActiveTrue(
	        String city,
	        ApprovalStatus approvalStatus);
	
}
