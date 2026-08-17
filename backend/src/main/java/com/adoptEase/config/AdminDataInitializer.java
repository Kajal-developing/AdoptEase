package com.adoptEase.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.adoptEase.entities.User;
import com.adoptEase.enums.ApprovalStatus;
import com.adoptEase.enums.Role;
import com.adoptEase.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        User admin = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .findFirst()
                .orElse(null);

        if (admin == null) {

            admin = new User();

            admin.setUserName("Kajal Nimbekar");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(
                    passwordEncoder.encode("admin123@1")
            );
            admin.setContactNo("9876543210");
            admin.setRole(Role.ADMIN);
            admin.setApprovalStatus(ApprovalStatus.APPROVED);
            admin.setAddress("Pune, Maharashtra");
            admin.setCity("Pune");

            userRepository.save(admin);

            System.out.println("====================================");
            System.out.println("ADMIN ACCOUNT CREATED");
            System.out.println("Email    : admin@gmail.com");
            System.out.println("Password : admin123@1");
            System.out.println("====================================");

        } else {

            admin.setEmail("admin@gmail.com");
            admin.setRole(Role.ADMIN);
            admin.setApprovalStatus(ApprovalStatus.APPROVED);

            // Make sure password is BCrypt encoded
            if (!admin.getPassword().startsWith("$2a$")
                    && !admin.getPassword().startsWith("$2b$")
                    && !admin.getPassword().startsWith("$2y$")) {

                admin.setPassword(
                        passwordEncoder.encode("Admin123@1")
                );
            }

            userRepository.save(admin);

            System.out.println("====================================");
            System.out.println("ADMIN ACCOUNT READY");
            System.out.println("Email    : admin@gmail.com");
            System.out.println("Password : admin123@1");
            System.out.println("====================================");
        }
    }
}