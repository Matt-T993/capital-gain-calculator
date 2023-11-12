package com.fdmgroup.webTest;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;

import org.openqa.selenium.remote.RemoteWebDriver;

import com.fdmgroup.util.DriverUtilities;

//@SpringBootTest
public class HomePageTest {

	private DriverUtilities driverUtilities;
	private WebDriver driver;

	public void printUrl() {
		String currentUrl = driver.getCurrentUrl();
		String currentTitle = driver.getTitle();
		System.out.println(currentUrl);
		System.out.println(currentTitle);

	}

	@BeforeEach
	public void setUp() {
		System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
		driver = new ChromeDriver();
//		driverUtilities = DriverUtilities.getInstance();
//		driver = driverUtilities.getDriver();
	}

	@Test
	public void testOpenHomePageAndSignInLink() throws InterruptedException {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		printUrl();
	}

	@Test
	public void testSignInLink() throws InterruptedException {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		WebElement signInLink = driver.findElement(By.tagName("a"));
		signInLink.click();
		Thread.sleep(3000);
		printUrl();
	}

	@Test
	public void testGetStartedLink() throws InterruptedException {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		WebElement getStartedLink = driver.findElement(By.xpath("//*[@id=\"root\"]/div/header/nav/a[2]"));
		getStartedLink.click();
		Thread.sleep(3000);
		printUrl();
	}

	@Test
	public void testHeader() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		WebElement headerElement = driver.findElement(By.tagName("h1"));
		assertEquals("Capital Gains Calculator", headerElement.getText());
	}

	@Test
	public void testBodyTexts() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> bodyTextElements = driver.findElements(By.tagName("p"));
		assertEquals(3, bodyTextElements.size());
	}

	@Test
	public void testBodyText1() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> bodyTextElements = driver.findElements(By.tagName("p"));
		assertEquals("Easily keep track of your gains and losses", bodyTextElements.get(0).getText());
	}

	@Test
	public void testBodyText2() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> bodyTextElements = driver.findElements(By.tagName("p"));
		assertEquals("The best cryptocurrency and stock tracker has arrived!", bodyTextElements.get(1).getText());
	}

	@Test
	public void testBodyText3() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> bodyTextElements = driver.findElements(By.tagName("p"));
		assertEquals("Calculate your tax on your capital gains and losses", bodyTextElements.get(2).getText());
	}

	@Test
	public void testLinks() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> linkElement = driver.findElements(By.tagName("a"));
		assertEquals(7, linkElement.size());
	}

	@Test
	public void testListOfLinks() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> listOfLinksElement = driver.findElements(By.cssSelector("ul>li"));
		assertEquals(4, listOfLinksElement.size());
		assertEquals("About", listOfLinksElement.get(0).getText());
		assertEquals("Privacy Policy", listOfLinksElement.get(1).getText());
		assertEquals("Terms and Conditions", listOfLinksElement.get(2).getText());
		assertEquals("Security Policies", listOfLinksElement.get(03).getText());
	}

	@Test
	public void testAboutLink() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> listOfLinksElement = driver.findElements(By.cssSelector("ul>li"));
		listOfLinksElement.get(0).click();
		String currentUrlAbout = driver.getCurrentUrl();
		assertEquals("http://localhost:5173/about", currentUrlAbout);
	}

	@Test
	public void testPrivacyLink() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> listOfLinksElement = driver.findElements(By.cssSelector("ul>li"));
		listOfLinksElement.get(1).click();
		String currentUrlPrivacy = driver.getCurrentUrl();
		assertEquals("http://localhost:5173/privacyPolicy", currentUrlPrivacy);
	}

	@Test
	public void testTermsAndConditionsLink() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> listOfLinksElement = driver.findElements(By.cssSelector("ul>li"));
		listOfLinksElement.get(2).click();
		String currentUrlTerms = driver.getCurrentUrl();
		assertEquals("http://localhost:5173/termsAndConditions", currentUrlTerms);
	}

	@Test
	public void testSecurityPolicyLink() {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		List<WebElement> listOfLinksElement = driver.findElements(By.cssSelector("ul>li"));
		listOfLinksElement.get(3).click();
		String currentUrlSecurityPolicy = driver.getCurrentUrl();
		assertEquals("http://localhost:5173/securityPolicy", currentUrlSecurityPolicy);
	}

	@AfterEach
	public void destroy() {
		driver.quit();
	}

}
