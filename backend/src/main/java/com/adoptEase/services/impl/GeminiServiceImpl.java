package com.adoptEase.services.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.adoptEase.services.GeminiService;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Override
    public String askGemini(String question) {

        Client client = Client.builder()
                .apiKey(apiKey)
                .build();

        String prompt = """
                You are AdoptEase AI, an AI assistant for an adoption management system.

                Your job is to answer questions related to:
                - child adoption
                - adoption procedure
                - adoption eligibility
                - adoption documents
                - adoption centers
                - adoption meetings
                - adoption process
                - general adoption guidance

                Keep answers simple and easy to understand.

                If the question is not related to adoption, reply exactly:

                I can only answer adoption-related questions.

                User Question:
                """ + question;

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.6-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}