package com.adoptEase.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "adoption_centers")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "userDetails", callSuper = true)

public class AdoptionCenter extends BaseEntity{
	@Column(name = "center_name", length = 50, nullable = false)
	private String centerName;
	@Column(name = "license_no", nullable = false, unique = true)
	private String licenseNumber;
	@Column(nullable = false, length = 500)
	private String description;
	private Double latitude;
	private Double longitude;
	@Column(name = "is_active", nullable = false)
	private Boolean isActive;
	private String address;

	private String centerPhoto;
	
	/*establish one-to-one association between AdoptionCenter & User
	 * AdoptionCenter 1----> 1 UserDetails
	 */
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "center_id")
	@MapsId
	private User userDetails;

	public AdoptionCenter(String centerName, String licenseNumber,
			String description, Double latitude, Double longitude, Boolean isActive,
			String address, String centerPhoto) {
		super();
		this.centerName = centerName;
		this.licenseNumber = licenseNumber;
		this.description = description;
		this.latitude = latitude;
		this.longitude = longitude;
		this.isActive = isActive;
		this.address = address;
		this.centerPhoto = centerPhoto;
	}
	
	
}
