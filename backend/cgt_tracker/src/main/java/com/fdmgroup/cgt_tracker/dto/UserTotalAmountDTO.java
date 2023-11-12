package com.fdmgroup.cgt_tracker.dto;

import java.math.BigDecimal;

import com.fdmgroup.cgt_tracker.model.AssetType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserTotalAmountDTO {

	
	@NotNull
	private BigDecimal totalAmount;
	
	@NotNull
	private BigDecimal crytoTotalAmount;
	
	@NotNull
	private BigDecimal stockTotalAmount;

}
