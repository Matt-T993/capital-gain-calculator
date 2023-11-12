package com.fdmgroup.cgt_tracker;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.fdmgroup.cgt_tracker.dto.UserRegisterDTO;
import com.fdmgroup.cgt_tracker.model.Asset;
import com.fdmgroup.cgt_tracker.model.AssetType;
import com.fdmgroup.cgt_tracker.model.Event;
import com.fdmgroup.cgt_tracker.model.EventType;
import com.fdmgroup.cgt_tracker.model.User;
import com.fdmgroup.cgt_tracker.repository.AssetRepository;
import com.fdmgroup.cgt_tracker.repository.EventRepository;
import com.fdmgroup.cgt_tracker.repository.UserRepository;
import com.fdmgroup.cgt_tracker.service.UserService;

@Component
public class DatabaseLoader implements ApplicationRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private AssetRepository assetService;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EventRepository eventRepository;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		loadTestUserData();
		loadTestStocks();
		loadTestCrypto();
		addDummyEventsForCharlie();
	}

	private void loadTestUserData() {
		UserRegisterDTO userDTO1 = new UserRegisterDTO();
		userDTO1.setUsername("charlie");
		userDTO1.setEmail("charlie@example.com");
		userDTO1.setPassword("password1");
		User charlie = userService.createUser(userDTO1);
		charlie.setSalary(new BigDecimal("75000"));
		userRepository.save(charlie);

		UserRegisterDTO userDTO2 = new UserRegisterDTO();
		userDTO2.setUsername("dave");
		userDTO2.setEmail("dave@example.com");
		userDTO2.setPassword("password2");
		User dave = userService.createUser(userDTO2);
		dave.setSalary(new BigDecimal("95000"));
		userRepository.save(dave);
	}

	private void loadTestStocks() {
		String[] names = { "1414 DEGREES LIMITED", "ADALTA LIMITED", "AURORA ENERGY METALS LIMITED", "ALTERRA LIMITED",
				"ALGORAE PHARMACEUTICALS LIMITED", "ONE CLICK GROUP LIMITED", "MORELLA CORPORATION LIMITED",
				"1ST GROUP LIMITED", "THRIVE TRIBE TECHNOLOGIES LIMITED", "29METALS LIMITED", "LIFE360 INC.",
				"AMAERO INTERNATIONAL LTD" };
		String[] identifiers = { "14D", "1AD", "1AE", "1AG", "1AI", "1CG", "1MC", "1ST", "1TT", "29M", "360", "3DA"};

		for (int i = 0; i < names.length && i < identifiers.length; i++) {
			Asset asset = new Asset();
			asset.setAssetName(names[i]);
			asset.setAssetType(AssetType.STOCK);
			asset.setAssetIdentifier(identifiers[i]);
			assetService.save(asset);
		}

		System.out.println("Loaded " + Math.min(names.length, identifiers.length) + " stock details");
	}
	
	private void loadTestCrypto() {
		String[] names = { "Bitcoin", "Ethereum", "DogeCoin","Tether", "BNB", "Cardano", "Solana", "Toncoin" };
		String[] identifiers = { "BTC", "ETH", "DGC", "USDT", "BNB", "ADA", "SOL", "TON" };

		for (int i = 0; i < names.length && i < identifiers.length; i++) {
			Asset asset = new Asset();
			asset.setAssetName(names[i]);
			asset.setAssetType(AssetType.CRYPTO);
			asset.setAssetIdentifier(identifiers[i]);
			assetService.save(asset);
		}

		System.out.println("Loaded " + Math.min(names.length, identifiers.length) + " crypto details");
	}
	
	private void addDummyEventsForCharlie() {
	    Optional<User> charlie = userRepository.findById(1L);
	    LocalDateTime now = LocalDateTime.now();
	    
	    List<Asset> allAssets = assetService.findAll();
	    Map<String, List<Object[]>> assetEventsMap = new HashMap<>();

        for (Asset asset : allAssets) {
            assetEventsMap.put(asset.getAssetIdentifier(), Arrays.asList(
                new Object[]{EventType.BUY, new BigDecimal("100"), new BigDecimal("10.00"), now.minusDays(20)},
                new Object[]{EventType.SELL, new BigDecimal("50"), new BigDecimal("15.00"), now.minusDays(10)}
            ));
        }
	    

        for (Map.Entry<String, List<Object[]>> entry : assetEventsMap.entrySet()) {
            Asset asset = assetService.findByAssetIdentifier(entry.getKey());

            for (Object[] eventDetail : entry.getValue()) {
                EventType type = (EventType) eventDetail[0];
                BigDecimal quantity = (BigDecimal) eventDetail[1];
                BigDecimal price = (BigDecimal) eventDetail[2];
                LocalDateTime eventDate = (LocalDateTime) eventDetail[3];

                Event event = new Event();
                event.setUser(charlie.get());
                event.setAsset(asset);
                event.setEventType(type);
                event.setQuantity(quantity);
                event.setPricePerUnit(price);
                event.setEventDate(eventDate);

                eventRepository.save(event);
            }
        }
	}



	
}
