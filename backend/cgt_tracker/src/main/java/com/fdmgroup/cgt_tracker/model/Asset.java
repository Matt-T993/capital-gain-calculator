package com.fdmgroup.cgt_tracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity(name = "ASSETS")
@Data
@EqualsAndHashCode(of = "assetId")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ASSET_ID", updatable = false, nullable = false)
    private Long assetId;

    @Enumerated(EnumType.STRING)
    private AssetType assetType;

    @Column(name = "ASSET_NAME", nullable = false, length = 50)
    private String assetName;

    @Column(name = "ASSET_IDENTIFIER", nullable = false, length = 8)
    private String assetIdentifier;
}
