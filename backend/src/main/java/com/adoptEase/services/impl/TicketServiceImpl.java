package com.adoptEase.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adoptEase.dtos.request.RaiseTicketRequest;
import com.adoptEase.dtos.request.TicketReplyRequest;
import com.adoptEase.dtos.response.TicketResponse;
import com.adoptEase.entities.AdoptionCenter;
import com.adoptEase.entities.ParentProfile;
import com.adoptEase.entities.Ticket;
import com.adoptEase.entities.User;
import com.adoptEase.enums.NotificationType;
import com.adoptEase.enums.Role;
import com.adoptEase.enums.TicketStatus;
import com.adoptEase.exceptions.ResourceNotFoundException;
import com.adoptEase.repositories.AdoptionCenterRepository;
import com.adoptEase.repositories.ParentProfileRepository;
import com.adoptEase.repositories.TicketRepository;
import com.adoptEase.repositories.UserRepository;
import com.adoptEase.services.NotificationService;
import com.adoptEase.services.TicketService;
import com.adoptEase.services.logger.LoggerService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final UserRepository userRepository;
    private final ParentProfileRepository parentProfileRepository;
    private final AdoptionCenterRepository adoptionCenterRepository;
    private final TicketRepository ticketRepository;
    private final NotificationService notificationService;
    private final LoggerService loggerService;

    @Override
    public String raiseTicket(Long userId, RaiseTicketRequest request) {

        User user = userRepository.findByIdAndRole(userId, Role.PARENT)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Parent not found with ID: " + userId));

        ParentProfile parent = parentProfileRepository.findById(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Parent profile not found."));

        // Parent can raise ticket only to his city adoption center
        AdoptionCenter center = adoptionCenterRepository
                .findByUserDetailsCityAndUserDetailsApprovalStatusAndIsActiveTrue(
                        user.getCity(),
                        com.adoptEase.enums.ApprovalStatus.APPROVED)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("No adoption center found."));

        Ticket ticket = new Ticket();

        ticket.setParentProfile(parent);
        ticket.setAdoptionCenter(center);
        ticket.setSubject(request.getSubject());
        ticket.setDescription(request.getDescription());
        ticket.setStatus(TicketStatus.OPEN);

        ticketRepository.save(ticket);
        
        loggerService.log(
                "INFO",
                "TICKET_RAISED",
                "Support ticket raised successfully.",
                "/parent/" + userId + "/tickets",
                user.getEmail());

        notificationService.createNotification(
                center.getUserDetails(),
                "New Ticket",
                "A new support ticket has been raised.",
                NotificationType.TICKET);

        return "Ticket raised successfully.";
    }

    @Override
    @Transactional(readOnly = true)
    public List<TicketResponse> getParentTickets(Long userId) {

        User user = userRepository.findByIdAndRole(userId, Role.PARENT)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Parent not found."));

        ParentProfile parent = parentProfileRepository.findById(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Parent profile not found."));

        List<TicketResponse> tickets = ticketRepository.findByParentProfileId(parent.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();

        loggerService.log(
                "INFO",
                "VIEW_PARENT_TICKETS",
                "Parent viewed ticket history.",
                "/parent/" + userId + "/tickets",
                user.getEmail());

        return tickets;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TicketResponse> getCenterTickets(Long userId) {

        User user = userRepository.findByIdAndRole(userId, Role.CENTER_ADMIN)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Center not found."));

        AdoptionCenter center = adoptionCenterRepository.findById(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Center profile not found."));

        List<TicketResponse> tickets = ticketRepository.findByAdoptionCenterId(center.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();

        loggerService.log(
                "INFO",
                "VIEW_CENTER_TICKETS",
                "Center viewed support tickets.",
                "/center/" + userId + "/tickets",
                user.getEmail());

        return tickets;
    }

    @Override
    public String replyToTicket(Long ticketId, TicketReplyRequest request) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Ticket not found."));

        ticket.setResponse(request.getResponse());
        ticket.setStatus(TicketStatus.RESOLVED);

        ticketRepository.save(ticket);
        
        loggerService.log(
                "INFO",
                "TICKET_REPLIED",
                "Support ticket replied successfully.",
                "/center/tickets/" + ticketId + "/reply",
                ticket.getAdoptionCenter()
                      .getUserDetails()
                      .getEmail());

        notificationService.createNotification(
                ticket.getParentProfile().getUserDetails(),
                "Ticket Updated",
                "Your support ticket has been resolved.",
                NotificationType.TICKET);

        return "Reply sent successfully.";
    }

    private TicketResponse mapToResponse(Ticket ticket) {

        TicketResponse response = new TicketResponse();

        response.setTicketId(ticket.getId());

        response.setParentId(ticket.getParentProfile().getId());
        response.setParentName(ticket.getParentProfile().getUserDetails().getUserName());

        response.setAdoptionCenterId(ticket.getAdoptionCenter().getId());
        response.setAdoptionCenterName(ticket.getAdoptionCenter().getCenterName());

        response.setSubject(ticket.getSubject());
        response.setDescription(ticket.getDescription());
        response.setResponse(ticket.getResponse());
        response.setStatus(ticket.getStatus());

        return response;
    }
}