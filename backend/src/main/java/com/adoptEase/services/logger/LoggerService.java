package com.adoptEase.services.logger;

public interface LoggerService {

    void log(String level,
             String action,
             String message,
             String endpoint,
             String email);

}