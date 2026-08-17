package com.adoptEase.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.adoptEase.entities.User;
import com.adoptEase.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PasswordMigrationRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        List<User> users = userRepository.findAll();

        int updatedCount = 0;

        for (User user : users) {

            String password = user.getPassword();

            if (password != null
                    && !password.startsWith("$2a$")
                    && !password.startsWith("$2b$")
                    && !password.startsWith("$2y$")) {

                user.setPassword(
                        passwordEncoder.encode(password)
                );

                updatedCount++;
            }
        }

        if (updatedCount > 0) {

            userRepository.saveAll(users);

            System.out.println(
                    "BCrypt password migration completed. Users updated: "
                            + updatedCount
            );

        } else {

            System.out.println(
                    "All user passwords are already BCrypt encoded."
            );
        }
    }
}