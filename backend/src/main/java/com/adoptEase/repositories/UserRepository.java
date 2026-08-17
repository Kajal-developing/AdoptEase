package com.adoptEase.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoptEase.entities.User;
import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.Role;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRoleAndApprovalStatus(Role role, ApprovalStatus approvalStatus);

    Optional<User> findByIdAndRole(Long id, Role role);
    
    long countByRole(Role role);

    long countByRoleAndApprovalStatus(Role role, ApprovalStatus status);
}
