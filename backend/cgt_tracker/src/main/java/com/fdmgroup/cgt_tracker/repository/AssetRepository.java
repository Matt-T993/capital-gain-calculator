package com.fdmgroup.cgt_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.cgt_tracker.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
	Asset findByAssetName(String assetName);
	
	Asset findByAssetIdentifier(String assetIdentifier); 

}
