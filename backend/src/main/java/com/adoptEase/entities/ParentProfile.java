package com.adoptEase.entities;

import java.math.BigDecimal;

import com.adoptEase.enums.Gender;
import com.adoptEase.enums.MaritalStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "parent_profiles")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"profilePhoto", "housePhoto", "familyPhoto", "userDetails"}, callSuper = true)

public class ParentProfile extends BaseEntity{
	@Column(nullable = false)
	private Integer age;
	@Column(nullable = false, length = 20)
	private String occupation;
	@Enumerated(EnumType.STRING)
	@Column(name = "marital_status")
	private MaritalStatus maritalStatus;
	@Column(name = "annual_income", nullable = false)
	private BigDecimal annualIncome;
	@Column(name = "profile_photo")
	private String profilePhoto;
	@Column(name = "house_photo")
	private String housePhoto;
	@Column(name = "family_photo")
	private String familyPhoto;
	@Enumerated(EnumType.STRING)
	@Column(name = "gender")
	private Gender gender;
	
	/*establish one-to-one association between ParentProfile & User
	 * ParentProfile 1----> 1 UserDetails
	 */
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_profile_id", nullable = false)
	@MapsId //shared PK with users table (parent_id : PK, FK)
	private User userDetails;

	public ParentProfile(Integer age, String occupation, MaritalStatus maritalStatus, BigDecimal annualIncome, 
			String profilePhoto, String housePhoto, String familyPhoto) {
	    this.age = age;
	    this.occupation = occupation;
	    this.maritalStatus = maritalStatus;
	    this.annualIncome = annualIncome;
	    this.profilePhoto = profilePhoto;
	    this.housePhoto = housePhoto;
	    this.familyPhoto = familyPhoto;
	}
	
}
