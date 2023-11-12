package com.fdmgroup.util;

import java.io.FileNotFoundException;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;



public class DriverUtilities {
	// remember 3 rules for Singleton Design Pattern;
	private static DriverUtilities driverUtilities; // Rule 1: private static instance of class
	private WebDriver webDriver;

	private DriverUtilities() {
		// Rule 2:create private constructor
		super();
		
		// TODO Auto-generated constructor stub
	}

	public static DriverUtilities getInstance() {// Rule 3: create a single instance of object
		if (driverUtilities == null) {
			driverUtilities = new DriverUtilities();
		}
		return driverUtilities;
	}

	public WebDriver getDriver() {
		if (webDriver == null) {
			createDriver();
		}
		return webDriver;
	}

	private void createDriver() {
		String driverName=getDriverName();
		switch (driverName) {
		case "google chrome":
			System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
			this.webDriver=new ChromeDriver();
			System.out.println("the broswer is loaded");
			break;
		case "firefox":
			System.setProperty("webDriver.gecko.driver","src/test/resource/geckodriver.exe");
			this.webDriver=new FirefoxDriver();
			break;
		default:
			System.out.println("Broswer is not valid");
			break;
		}
	}

	private String getDriverName() {
		Properties config=new Properties();
		String driverName="";
		try {
			config.load(new FileInputStream("src/test/resources/config.properties"));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for (String key : config.stringPropertyNames()) {
			if(key.equals("browser")) {
				driverName=config.getProperty(key);
			}
		}
		return driverName;
	}

	// this will print the same hashcode because singleton instance:
	// 212628335,212628335
	// by doing this, there will be only one single instance of browser open, so all
	// the tests will run in one file in sequence.
//	public static void main(String[] args) {
//		DriverUtilities obj1=DriverUtilities.getInstance();
//		DriverUtilities obj2=DriverUtilities.getInstance();
//		System.out.println(obj1.hashCode());
//		System.out.println(obj2.hashCode());
//		}

}
