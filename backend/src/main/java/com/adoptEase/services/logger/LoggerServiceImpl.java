package com.adoptEase.services.logger;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.adoptEase.dtos.request.LogRequest;

@Service
public class LoggerServiceImpl implements LoggerService {

    private final RestTemplate restTemplate;

    public LoggerServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void log(String level,
                    String action,
                    String message,
                    String endpoint,
                    String email) {

    	System.out.println("LoggerService called");
        LogRequest request = new LogRequest();

        request.setServiceName("MainService");
        request.setLogLevel(level);
        request.setAction(action);
        request.setMessage(message);
        request.setEndpoint(endpoint);
        request.setUserEmail(email);

        System.out.println("Sending request to Logger Service...");
        try {

            var response = restTemplate.postForEntity(
                    "http://localhost:5277/api/logs",
                    request,
                    String.class);

            System.out.println("Logger Response: " + response.getStatusCode());

        } catch (Exception ex) {

            System.out.println("Logger Error: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}