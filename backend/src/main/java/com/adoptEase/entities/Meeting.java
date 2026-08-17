package com.adoptEase.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import com.adoptEase.enums.MeetingStatus;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "meetings")
@AttributeOverride(name = "id", column = @Column(name = "meeting_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Meeting extends BaseEntity{
	@Column(name = "meeting_date", nullable = false)
	private LocalDate meetingDate;
	@Column(name = "meeting_time", nullable = false)
	private LocalTime meetingTime;
	@Enumerated(EnumType.STRING)
	@Column(name = "meeting_status")
	private MeetingStatus meetingStatus = MeetingStatus.PENDING;
	@Column(name = "parent_remarks", length = 250)
	private String parentRemarks;
	@Column(name = "center_remarks", length = 250)
	private String centerRemarks;
	
	/*establish many-to-one association between Meeting & ParentProfile
	 * Meeting (Many)----> 1 ParentProfile
	 */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_profile_id", nullable = false)
	private ParentProfile parentProfile;
	
	/*
	 * Meeting (Many)----> 1 Child
	 */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "child_id", nullable = false)
	private Child child;

	/*
	 * Meeting (Many)----> 1 AdoptionCenter
	 */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "adoption_center_id", nullable = false)
	private AdoptionCenter adoptionCenter;
	
	
	public Meeting(LocalDate meetingDate, LocalTime meetingTime, MeetingStatus meetingStatus,
			String parentRemarks, String centerRemarks) {
		super();
		this.meetingDate = meetingDate;
		this.meetingTime = meetingTime;
		this.meetingStatus = meetingStatus;
		this.parentRemarks = parentRemarks;
		this.centerRemarks = centerRemarks;
	}

}
