package com.fdmgroup.cgt_tracker.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.cgt_tracker.dto.EventDTO;
import com.fdmgroup.cgt_tracker.dto.UserTotalAmountDTO;
import com.fdmgroup.cgt_tracker.model.Asset;
import com.fdmgroup.cgt_tracker.model.AssetType;
import com.fdmgroup.cgt_tracker.model.Event;
import com.fdmgroup.cgt_tracker.model.EventType;
import com.fdmgroup.cgt_tracker.model.User;
import com.fdmgroup.cgt_tracker.repository.EventRepository;
import com.fdmgroup.cgt_tracker.repository.UserRepository;
import com.fdmgroup.cgt_tracker.service.AssetService;
import com.fdmgroup.cgt_tracker.service.EventService;
import com.fdmgroup.cgt_tracker.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/event")
public class EventController {
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	EventRepository eventRepository;

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;

    @Autowired
    AssetService assetService;

    private User getUser() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getUser(username);
    }

    @GetMapping("/")
    public List<EventDTO> getEventsForUser() {
        Set<Event> events = getUser().getEvents();
        List<EventDTO> response = events.stream().map(event -> {
            Asset asset = event.getAsset();
            EventDTO edto = new EventDTO();
            edto.setEventId(event.getEventId());	
            edto.setAssetId(asset.getAssetId());
            edto.setEventType(event.getEventType());
            edto.setQuantity(event.getQuantity());
            edto.setPricePerUnit(event.getPricePerUnit());
            edto.setEventDate(event.getEventDate());
            return edto;
        }).toList();
        return response;
    }

    @PostMapping("/")
    public EventDTO createEvent(@Valid @RequestBody EventDTO eventDTO) {
        User user = getUser();
        Asset asset = assetService.getAsset(eventDTO.getAssetId());

        Event event = new Event();
        event.setUser(user);
        event.setAsset(asset);
        event.setEventType(eventDTO.getEventType());
        event.setQuantity(eventDTO.getQuantity());
        event.setPricePerUnit(eventDTO.getPricePerUnit());
        event.setEventDate(eventDTO.getEventDate());

        event = eventService.createEvent(event);

        EventDTO edto = new EventDTO();
        edto.setAssetId(asset.getAssetId());
        edto.setEventType(event.getEventType());
        edto.setQuantity(event.getQuantity());
        edto.setPricePerUnit(event.getPricePerUnit());
        edto.setEventDate(event.getEventDate());
        return edto;
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable Long id, @Valid @RequestBody EventDTO eventDTO) {
  
        User user = getUser();
        Asset asset = assetService.getAsset(eventDTO.getAssetId());
  
     
        Event existingEvent = eventService.getEventById(id);
 
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

     
        if (!existingEvent.getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Permission Denied.");
        }
        
        existingEvent.setAsset(asset);
        existingEvent.setEventType(eventDTO.getEventType());
        existingEvent.setQuantity(eventDTO.getQuantity());
        existingEvent.setPricePerUnit(eventDTO.getPricePerUnit());
        existingEvent.setEventDate(eventDTO.getEventDate());

        
        existingEvent = eventService.updateEvent(existingEvent);

      
        return ResponseEntity.ok("Event updated successfully.");
    }


    	

    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        User user = getUser();


        Event existingEvent = eventService.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        
        if (!existingEvent.getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Permission Denied");
        }

        
        eventService.deleteEvent(id);
        
        return ResponseEntity.ok("Event deleted successfully");
    }

    
    @GetMapping("/totalAmount")
    public ResponseEntity<UserTotalAmountDTO> getUserTotalAmount(Authentication authentication){
    	List<Event> userEvents = eventRepository.findAllByUsername(authentication.getPrincipal().toString());
		 BigDecimal crytoTotalAmount  = BigDecimal.ZERO;
		 BigDecimal stockTotalAmount  = BigDecimal.ZERO;
    	Map<String, BigDecimal> assetQuantities = new HashMap<>();
    	
    	for(Event event: userEvents) {
    		String assetName = event.getAsset().getAssetName();
    		BigDecimal quantity = event.getQuantity();
    ;
    		
    		if(assetQuantities.containsKey(assetName)) {
    			BigDecimal currentQuantity = assetQuantities.get(assetName);
    			if(event.getEventType() == EventType.BUY) {
    				currentQuantity = currentQuantity.add(quantity);
    				
    				
    				
    			}else if(event.getEventType() == EventType.SELL) {
    				currentQuantity = currentQuantity.subtract(quantity);
    			}
    			assetQuantities.put(assetName, currentQuantity);
    			
    			
    		}else {
    			
    		    if (event.getEventType() == EventType.BUY) {
    		    	assetQuantities.put(assetName, quantity);
                } else if (event.getEventType() == EventType.SELL) {
                	assetQuantities.put(assetName, quantity.negate());
                }
            }
        }
    	
    	for(Map.Entry<String, BigDecimal> entry: assetQuantities.entrySet()) {
    		String assetName = entry.getKey();
    		BigDecimal quantity = entry.getValue();
    		
    		 Event latestEvent = eventRepository.findLatestEventByAssetName(assetName);
    		 
    		 
    		 if(latestEvent.getAsset().getAssetType() == AssetType.CRYPTO) {
    			 
    			 crytoTotalAmount = crytoTotalAmount.add(quantity.multiply(latestEvent.getPricePerUnit()));
    			 
    		 }else if (latestEvent.getAsset().getAssetType() == AssetType.STOCK) 
    		 {
    			 stockTotalAmount = stockTotalAmount.add(quantity.multiply(latestEvent.getPricePerUnit()));
    			
    			 
    		 }
    		
    	}
    	UserTotalAmountDTO dto = new UserTotalAmountDTO();
    	dto.setCrytoTotalAmount(crytoTotalAmount);
    	dto.setStockTotalAmount(stockTotalAmount);
    	dto.setTotalAmount(stockTotalAmount.add(crytoTotalAmount));
    	
    	
    	return ResponseEntity.ok(dto);
    
    }
    
    
}
