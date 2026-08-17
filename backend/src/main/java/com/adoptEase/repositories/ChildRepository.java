package com.adoptEase.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoptEase.entities.Child;
import com.adoptEase.enums.ChildStatus;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
	
	List<Child> findByAdoptionCenterIdAndIsActiveTrue(Long centerId);
	
	List<Child> findByAdoptionCenterIdAndAvailableStatusAndIsActiveTrue(
	        Long centerId,
	        ChildStatus availableStatus);
	
	long countByAvailableStatusAndIsActiveTrue(ChildStatus status);
}
