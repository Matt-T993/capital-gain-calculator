package com.fdmgroup.cgt_tracker.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fdmgroup.cgt_tracker.model.EventType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EventDTO {
	
	private Long eventId;

	@NotNull
	private Long assetId;

	@NotNull
	private EventType eventType;

	@Positive
	@NotNull
	private BigDecimal quantity;

	@Positive
	@NotNull
	private BigDecimal pricePerUnit;

	@NotNull
	private LocalDateTime eventDate;
}
