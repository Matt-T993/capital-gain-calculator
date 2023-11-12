package com.fdmgroup.cgt_tracker.dto;


import java.math.BigDecimal;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserAssetQuantityDTO {



	@NotNull
    private String assetName;
	
	@NotNull
	private String assetIdentifier;
	
	@Positive
	@NotNull
    private BigDecimal quantity;
	
	@Positive
	@NotNull
    private BigDecimal totalAmount;
    
}
