package com.adoptEase.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adoptEase.entities.Ticket;
import com.adoptEase.enums.TicketStatus;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByParentProfileId(Long parentId);

    List<Ticket> findByAdoptionCenterId(Long centerId);

    List<Ticket> findByAdoptionCenterIdAndStatus(Long centerId,
                                                 TicketStatus status);

    long countByStatus(TicketStatus status);
}