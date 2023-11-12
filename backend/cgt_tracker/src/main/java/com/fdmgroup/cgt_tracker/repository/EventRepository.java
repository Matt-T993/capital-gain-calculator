package com.fdmgroup.cgt_tracker.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fdmgroup.cgt_tracker.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM EVENT e WHERE e.user.username = :username")
	List<Event> findAllByUsername(String username);
    
    @Query("SELECT e FROM EVENT e WHERE e.asset.assetName = :assetName AND e.eventDate = (SELECT MAX(e2.eventDate) FROM EVENT e2 WHERE e2.asset.assetName = :assetName)")
    Event findLatestEventByAssetName(String assetName);
}
