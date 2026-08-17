package com.adoptEase.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoptEase.entities.Meeting;
import com.adoptEase.enums.MeetingStatus;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
	List<Meeting> findByParentProfileId(Long parentId);

    List<Meeting> findByAdoptionCenterId(Long centerId);
    
    List<Meeting> findByAdoptionCenterIdAndMeetingStatus(
            Long centerId,
            MeetingStatus meetingStatus);

    boolean existsByParentProfileIdAndChildIdAndMeetingStatus(
            Long parentId,
            Long childId,
            MeetingStatus meetingStatus);
    
    long countByMeetingStatus(MeetingStatus meetingStatus);
}
