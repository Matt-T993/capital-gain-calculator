package com.fdmgroup.cgt_tracker.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity(name = "EVENT")
@Data
@EqualsAndHashCode(of = "eventId")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EVENT_ID", updatable = false, nullable = false)
    private Long eventId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ASSET_ID", nullable = false)
    private Asset asset;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @Column(name = "QUANTITY", precision = 30, scale = 10, nullable = false)
    private BigDecimal quantity;

    @Column(name = "PRICE_PER_UNIT", precision = 30, scale = 10, nullable = false)
    private BigDecimal pricePerUnit;

    @Column(name = "EVENT_DATE", nullable = false)
    private LocalDateTime eventDate;

}
