package com.adoptEase.services;

import java.util.List;

import com.adoptEase.dtos.request.RaiseTicketRequest;
import com.adoptEase.dtos.request.TicketReplyRequest;
import com.adoptEase.dtos.response.TicketResponse;

public interface TicketService {

    // Parent
    String raiseTicket(Long userId, RaiseTicketRequest request);

    List<TicketResponse> getParentTickets(Long userId);

    // Center
    List<TicketResponse> getCenterTickets(Long userId);

    String replyToTicket(Long ticketId, TicketReplyRequest request);
}