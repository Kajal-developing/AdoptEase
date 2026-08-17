package com.adoptEase.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoptEase.entities.ParentProfile;
import com.adoptEase.enums.ApprovalStatus;


@Repository
public interface ParentProfileRepository extends JpaRepository<ParentProfile, Long> {
	List<ParentProfile> findByUserDetailsApprovalStatus(ApprovalStatus approvalStatus);
	
	Optional<ParentProfile> findByUserDetailsId(Long userId);
}