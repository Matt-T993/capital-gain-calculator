package com.fdmgroup.cgt_tracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fdmgroup.cgt_tracker.model.Asset;
import com.fdmgroup.cgt_tracker.repository.AssetRepository;

@Service
public class AssetService {

	private final AssetRepository assetRepository;
	
	public AssetService(AssetRepository assetRepository) {
		this.assetRepository = assetRepository;
	}
	
	public List<Asset> getAllAssets() {
		return assetRepository.findAll();
	}
	
	public Asset getAsset(long id) {
		return assetRepository.getReferenceById(id);
	}
	
	public void createAsset(Asset a) {
		assetRepository.save(a);
	}
	
	public String getAssetIdentifierByName(String assetName) {
	    Asset asset = assetRepository.findByAssetName(assetName);
	    if (asset != null) {
	        return asset.getAssetIdentifier();
	    }
	    return null; 
	}
}
