package com.adoptEase.entities;

import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.Role;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
public class User extends BaseEntity{
	@Column(name = "user_name", length = 100)
	private String userName;
	@Column(length = 60, nullable = false, unique = true)
	private String email;
	@Column(length = 100, nullable = false)
	private String password;
	@Column(name = "contact_no", length = 15)
	private String contactNo;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Enumerated(EnumType.STRING)
	@Column(name = "approval_status")
	private ApprovalStatus approvalStatus;
	@Column(length = 250)
	private String address;
	@Column(length = 40)
	private String city;
	
	
	public User(String userName, String email, String password, String contactNo, Role role, ApprovalStatus approvalStatus,
			String address, String city) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.contactNo = contactNo;
		this.role = role;
		this.approvalStatus = approvalStatus;
		this.address = address;
		this.city = city;
	}
	
}
