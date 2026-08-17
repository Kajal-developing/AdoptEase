package com.adoptEase.controllers;

import com.adoptEase.dtos.request.ChatRequest;
import com.adoptEase.dtos.response.ChatResponse;
import com.adoptEase.services.GeminiService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String answer = geminiService.askGemini(request.getQuestion());

        return new ChatResponse(answer);
    }
}