package com.adoptEase.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adoptEase.dtos.request.RaiseTicketRequest;
import com.adoptEase.dtos.request.TicketReplyRequest;
import com.adoptEase.dtos.response.TicketResponse;
import com.adoptEase.services.TicketService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class TicketController {

    private final TicketService ticketService;

    @Operation(summary = "Raise a support ticket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ticket raised successfully"),
            @ApiResponse(responseCode = "404", description = "Parent not found")
    })
    @PostMapping("/parent/{userId}/tickets")
    public ResponseEntity<String> raiseTicket(
            @PathVariable Long userId,
            @Valid @RequestBody RaiseTicketRequest request) {

        return ResponseEntity.ok(
                ticketService.raiseTicket(userId, request));
    }

    @Operation(summary = "Get all tickets raised by parent")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tickets fetched successfully")
    })
    @GetMapping("/parent/{userId}/tickets")
    public ResponseEntity<List<TicketResponse>> getParentTickets(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                ticketService.getParentTickets(userId));
    }

    @Operation(summary = "Get all tickets for adoption center")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tickets fetched successfully")
    })
    @GetMapping("/center/{userId}/tickets")
    public ResponseEntity<List<TicketResponse>> getCenterTickets(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                ticketService.getCenterTickets(userId));
    }

    @Operation(summary = "Reply to ticket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reply sent successfully"),
            @ApiResponse(responseCode = "404", description = "Ticket not found")
    })
    @PutMapping("/center/tickets/{ticketId}/reply")
    public ResponseEntity<String> replyToTicket(
            @PathVariable Long ticketId,
            @Valid @RequestBody TicketReplyRequest request) {

        return ResponseEntity.ok(
                ticketService.replyToTicket(ticketId, request));
    }
}