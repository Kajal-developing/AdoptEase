package com.adoptEase.entities;

import java.time.LocalDate;

import com.adoptEase.enums.ChildStatus;
import com.adoptEase.enums.Gender;

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
@Table(name = "children")
@Getter
@Setter
@ToString(exclude = "adoptionCenter", callSuper = true)
@NoArgsConstructor
public class Child extends BaseEntity{
	@Column(name = "child_name", length = 40, nullable = false)
	private String childName;
	@Column(nullable = false)
	private LocalDate dateOfBirth;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@Column(name = "health_status", length = 100, nullable = false)
	private String healthStatus;
	@Column(nullable = false, length = 500)
	private String description;
	@Column(name = "child_photo")
	private String childPhoto;
	@Enumerated(EnumType.STRING)
	@Column(name = "available_status")
	private ChildStatus availableStatus;
	@Column(name = "is_active", nullable = false)
	private Boolean isActive;
	
	/*establish many-to-one association between Child & AdoptionCenter
	 * Child (Many)----> 1 AdoptionCenter
	 */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "adoption_center_id", nullable = false)
	private AdoptionCenter adoptionCenter;
	
	public Child(String childName, LocalDate dateOfBirth, Gender gender, String healthStatus, String description,
			ChildStatus availableStatus, Boolean isActive) {
		super();
		this.childName = childName;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.healthStatus = healthStatus;
		this.description = description;
		this.availableStatus = availableStatus;
		this.isActive = isActive;
	}
	
	
}
