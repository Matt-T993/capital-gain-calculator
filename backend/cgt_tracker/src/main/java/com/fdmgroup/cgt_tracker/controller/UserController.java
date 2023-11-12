package com.fdmgroup.cgt_tracker.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.cgt_tracker.dto.UserAssetQuantityDTO;
import com.fdmgroup.cgt_tracker.dto.UserDetailDTO;
import com.fdmgroup.cgt_tracker.dto.UserRegisterDTO;
import com.fdmgroup.cgt_tracker.dto.UserTotalAmountDTO;
import com.fdmgroup.cgt_tracker.model.AssetType;
import com.fdmgroup.cgt_tracker.model.Asset;
import com.fdmgroup.cgt_tracker.model.Event;
import com.fdmgroup.cgt_tracker.model.EventType;
import com.fdmgroup.cgt_tracker.model.User;
import com.fdmgroup.cgt_tracker.repository.EventRepository;
import com.fdmgroup.cgt_tracker.repository.UserRepository;
import com.fdmgroup.cgt_tracker.service.AssetService;
import com.fdmgroup.cgt_tracker.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EventRepository eventRepository;
	@Autowired
	private AssetService assetService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody @Valid UserRegisterDTO userRegisterDTO) {
		String email = userRegisterDTO.getEmail();
		String username = userRegisterDTO.getUsername();
		String password = userRegisterDTO.getPassword();
		assert (email != null && username != null && password != null);
		User user = userService.createUser(userRegisterDTO);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("User Exists");
		} else {
			return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
		}
	}

	@GetMapping("/user-data")
	public ResponseEntity<UserDetailDTO> getAuthenticatedUserDetails(Authentication authentication) {
	
		if (authentication == null || !(authentication.getPrincipal() instanceof String)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String username = (String) authentication.getPrincipal();
		UserDetailDTO userDTO = userService.getUserDetailsDTO(username);
		System.out.println(authentication);

		if (userDTO == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		return ResponseEntity.ok(userDTO);
	}
	@PutMapping("/settings")
	public ResponseEntity<UserDetailDTO> updateAuthenticatedUserDetails(Authentication authentication,  @RequestBody UserDetailDTO newUserDTO) {
		if (authentication == null || !(authentication.getPrincipal() instanceof String)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		UserDetailDTO userDTO=userService.getUserDetailsDTO((String) authentication.getPrincipal());

		if (userDTO == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		System.out.println(authentication.getPrincipal() );
		System.out.println("PREVIOUS USER "+userDTO.getUsername());
		System.out.println("NEW USER "+newUserDTO);
		userService.updateUserDetailsDTO(userDTO,newUserDTO);
		
		return ResponseEntity.ok(newUserDTO);
	}
	
	@GetMapping("/user-assets")
	public ResponseEntity<List<UserAssetQuantityDTO>> getUserAssets(Authentication authentication) {
	    List<Event> userEvents = eventRepository.findAllByUsername(authentication.getPrincipal().toString());

	    List<UserAssetQuantityDTO> assetQuantities = new ArrayList<>();
	    
	    Map<String, BigDecimal> assetQuantityMap = new HashMap<>();
    	
    	for(Event event: userEvents) {
    		String assetName = event.getAsset().getAssetName();
    		BigDecimal quantity = event.getQuantity();
    		
    		if(assetQuantityMap.containsKey(assetName)) {
    			BigDecimal currentQuantity = assetQuantityMap.get(assetName);
    			if(event.getEventType() == EventType.BUY) {
    				currentQuantity = currentQuantity.add(quantity);
    				
    			}else if(event.getEventType() == EventType.SELL) {
    				currentQuantity = currentQuantity.subtract(quantity);
    			}
    			assetQuantityMap.put(assetName, currentQuantity);
    			
    		}else {
    			
    		    if (event.getEventType() == EventType.BUY) {
                    assetQuantityMap.put(assetName, quantity);
                } else if (event.getEventType() == EventType.SELL) {
                    assetQuantityMap.put(assetName, quantity.negate());
                }
            }
        }
    	   
	    for (Map.Entry<String, BigDecimal> entry : assetQuantityMap.entrySet()) {
	        String assetName = entry.getKey();
	        BigDecimal quantity = entry.getValue();
	        String assetIdentifier = assetService.getAssetIdentifierByName(assetName); 
	        Event latestEvent = eventRepository.findLatestEventByAssetName(assetName);

	        UserAssetQuantityDTO dto = new UserAssetQuantityDTO();
	        dto.setAssetName(assetName);
	        dto.setAssetIdentifier(assetIdentifier);
	        dto.setQuantity(quantity);
	        dto.setTotalAmount(quantity.multiply(latestEvent.getPricePerUnit()));

	        assetQuantities.add(dto);
	    }

	    return ResponseEntity.ok(assetQuantities);
	}
	
	@GetMapping("/calculate-tax")
	public BigDecimal calculateTax(Authentication authentication) {
		List<Event> allEvents = eventRepository.findAllByUsername(authentication.getPrincipal().toString());
		
		if (!allEvents.isEmpty()) {
			Map<Asset, List<Event>> eventsByAsset = allEvents.stream().collect(Collectors.groupingBy(Event::getAsset));
			BigDecimal total = BigDecimal.ZERO;
			
			for (Asset asset : eventsByAsset.keySet()) {
				BigDecimal subtotal = BigDecimal.ZERO;
			    List<Event> eventsForAsset = eventsByAsset.get(asset);
			    
			    List<Record> records = new ArrayList<>();
			    for (Event event : eventsForAsset) {
					records.add(new Record(event.getEventType(), event.getQuantity(), event.getPricePerUnit()));
			    }
				List<Record> purchases = records.stream().filter(r -> r.type == EventType.BUY).toList();
				List<Record> sales = records.stream().filter(r -> r.type == EventType.SELL).toList();
				
				Iterator<Record> pIter = purchases.iterator();
				Record current = pIter.next(); 
				BigDecimal remaining = current.quantity;

				for (Record sale : sales) {
				    BigDecimal quantity = sale.quantity;
				    while (quantity.compareTo(remaining) > 0) {
				        subtotal = subtotal.add(remaining.multiply(sale.pricePerUnit.subtract(current.pricePerUnit)));
				        quantity = quantity.subtract(remaining);
				        current = pIter.next();
				        remaining = current.quantity;
				    }
				    subtotal = subtotal.add(quantity.multiply(sale.pricePerUnit.subtract(current.pricePerUnit)));
				    remaining = remaining.subtract(quantity);
				    total = total.add(subtotal);
				}  
			}

			User user = userRepository.findByUsername(authentication.getPrincipal().toString()).get();
			BigDecimal incomeTax = incomeTaxCalculator((user.getSalary()).add(total));
			return incomeTax;
		} else {
			User user = userRepository.findByUsername(authentication.getPrincipal().toString()).get();
			BigDecimal incomeTax = incomeTaxCalculator(user.getSalary());		
			return incomeTax;
		}
	}

	// Helper method
	public BigDecimal incomeTaxCalculator(BigDecimal salary) {
	    BigDecimal zero = BigDecimal.ZERO;
	    BigDecimal eighteenThousandTwoHundred = new BigDecimal("18200");
	    BigDecimal fortyFiveThousand = new BigDecimal("45000");
	    BigDecimal oneTwentyThousand = new BigDecimal("120000");
	    BigDecimal oneEightyThousand = new BigDecimal("180000");

	    if (salary.compareTo(eighteenThousandTwoHundred) <= 0) {
	        return zero;
	    } else if (salary.compareTo(fortyFiveThousand) <= 0) {
	        return salary.subtract(eighteenThousandTwoHundred).multiply(new BigDecimal("0.19"));
	    } else if (salary.compareTo(oneTwentyThousand) <= 0) {
	        return new BigDecimal("5092").add(salary.subtract(fortyFiveThousand).multiply(new BigDecimal("0.325")));
	    } else if (salary.compareTo(oneEightyThousand) <= 0) {
	        return new BigDecimal("29467").add(salary.subtract(oneTwentyThousand).multiply(new BigDecimal("0.37")));
	    } else {
	        return new BigDecimal("51667").add(salary.subtract(oneEightyThousand).multiply(new BigDecimal("0.45")));
	    }
	}

	static class Record {
		EventType type;
		BigDecimal quantity;
		BigDecimal pricePerUnit;

		Record(EventType t, BigDecimal q, BigDecimal p) {
			this.type = t;
			this.quantity = q;
			this.pricePerUnit = p;
		}
	}

}
