package com.fdmgroup.cgt_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.cgt_tracker.model.Asset;
import com.fdmgroup.cgt_tracker.service.AssetService;

@RestController
@RequestMapping("/api/v1/asset")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @GetMapping("/")
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }
}
