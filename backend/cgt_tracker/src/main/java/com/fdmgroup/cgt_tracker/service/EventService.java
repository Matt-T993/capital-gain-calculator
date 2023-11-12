package com.fdmgroup.cgt_tracker.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fdmgroup.cgt_tracker.dto.EventDTO;
import com.fdmgroup.cgt_tracker.model.Event;
import com.fdmgroup.cgt_tracker.repository.EventRepository;

@Service
public class EventService {
	
	private final EventRepository eventRepository;
	
	public EventService(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}
	
	public Event createEvent(Event e) {
		return eventRepository.save(e);
	}
	public void deleteEvent(Long id) {
		eventRepository.deleteById(id);
	
	}

	public Event updateEvent(Event e) {
		return eventRepository.save(e);
			
	}
	
    public Event getEventById(Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        return eventOptional.orElse(null);
    }
	
	
}
