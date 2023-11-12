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
public class RegisterPageTest3 {

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
	public void testHomePageAndRegisterFlow() throws InterruptedException {
		driver.get("http://localhost:5173/");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		printUrl();
		// test register Link
		WebElement getStartedLink = driver.findElement(By.cssSelector(
				"#root > div > header > nav > a.font-semibold.p-1\\.5.px-4.sm\\:px-8.bg-purple-500.rounded-lg.transition-colors.duration-300.hover\\:bg-purple-600"));
		getStartedLink.click();
		assertEquals("http://localhost:5173/register", driver.getCurrentUrl());
	}

	@Test
	public void testRegisterPageh1Element() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test h1 title
		WebElement h1titleOfLoginPage = driver.findElement(By.tagName("h1"));
		assertEquals("Capital Gains Calculator", h1titleOfLoginPage.getText());
	}

	@Test
	public void testRegisterPageh2Element() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test h2
		WebElement h2Text = driver.findElement(By.tagName("h2"));
		assertEquals("Sign Up", h2Text.getText());
	}

	@Test
	public void testLoginPagehRegisterLinkElement() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test login link
		WebElement loginLink = driver.findElement(By.partialLinkText("Login"));
		loginLink.click();
		assertEquals("http://localhost:5173/login", driver.getCurrentUrl());
		Thread.sleep(3000);
	}

	@Test
	public void testAcceptCheckbox() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		WebElement acceptBox = driver.findElement(By.id("accept-disclaimer"));
		assertEquals("checkbox", acceptBox.getAttribute("type"));
	}

	@Test
	public void testLabelElementsText() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		List<WebElement> labelTexts = driver.findElements(By.tagName("label"));
		assertEquals(5, labelTexts.size());
		assertEquals("Email Address:", labelTexts.get(0).getText());
		assertEquals("Username:", labelTexts.get(1).getText());
		assertEquals("Password:", labelTexts.get(2).getText());
		assertEquals("Confirm password:", labelTexts.get(3).getText());
		assertEquals("Accept Disclaimer", labelTexts.get(4).getText());
	}

	@Test
	public void testInputPlaceholer() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		List<WebElement> labelTexts = driver.findElements(By.tagName("input"));
		assertEquals(5, labelTexts.size());
		assertEquals("user@domain", labelTexts.get(0).getAttribute("placeholder"));
		assertEquals("Username", labelTexts.get(1).getAttribute("placeholder"));
		assertEquals("password", labelTexts.get(2).getAttribute("placeholder"));
		assertEquals("confirm password", labelTexts.get(3).getAttribute("placeholder"));
		assertEquals("checkbox", labelTexts.get(4).getAttribute("type"));
	}

	@Test
	public void testErrorNotificationsElementText() throws InterruptedException {
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		WebElement registerButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		registerButton.click();
		Thread.sleep(3000);
		List<WebElement> registerErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(5, registerErrorMessages.size());
		assertEquals("Must be a valid email", registerErrorMessages.get(0).getText());
		assertEquals("Username must be letters or digits only", registerErrorMessages.get(1).getText());
		assertEquals("Weak", registerErrorMessages.get(2).getText());
		assertEquals("Password must be at least 8 characters, contain an uppercase, lowercase, number",
				registerErrorMessages.get(3).getText());
		assertEquals("Password doesn't match", registerErrorMessages.get(4).getText());
		WebElement checkBoxErrorMessage = driver.findElement(By.className("text-red-700"));
		assertEquals("You must accept the disclaimer to register.", checkBoxErrorMessage.getText());
	}

	@Test
	public void testWringEmailFormat() throws InterruptedException {
		// test wrong email format
		System.out.println("Case 1: wrong email format");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("email")).sendKeys("email??");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		List<WebElement> registerErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(2, registerErrorMessages.size());
		assertEquals("Must be a valid email", registerErrorMessages.get(0).getText());
		assertEquals("Weak", registerErrorMessages.get(1).getText());
	}

	@Test
	public void testWrongUsernameFormat() throws InterruptedException {
		// test wrong username format
		System.out.println("Case 2: wrong username format");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("username")).sendKeys("user@wrong");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		List<WebElement> registerErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(2, registerErrorMessages.size());
		assertEquals("Username must be letters or digits only", registerErrorMessages.get(0).getText());
		assertEquals("Weak", registerErrorMessages.get(1).getText());
	}

	@Test
	public void testWrongPasswordFormat1() throws InterruptedException {
		// test wrong password format
		System.out.println("Case 2-1-1: wrong username format:too short<4");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("da");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		WebElement passwordErrorMessage = driver.findElement(By.cssSelector("p.text-red-600"));
		WebElement passwordLevel = driver.findElement(By.tagName("span"));
		assertEquals("Weak", passwordLevel.getText());
		assertEquals("Password must be at least 8 characters, contain an uppercase, lowercase, number",
				passwordErrorMessage.getText());
	}

	@Test
	public void testWrongPasswordFormatTooShort2() throws InterruptedException {
		// test wrong password format
		System.out.println("Case 2-1-2: wrong username format:4<too short<6");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("davrd");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		WebElement passwordErrorMessage = driver.findElement(By.cssSelector("p.text-red-600"));
		WebElement passwordLevel = driver.findElement(By.tagName("span"));
		assertEquals("Fair", passwordLevel.getText());
		assertEquals("Password must be at least 8 characters, contain an uppercase, lowercase, number",
				passwordErrorMessage.getText());
	}

	@Test
	public void testWrongPasswordFormatTooShort3() throws InterruptedException {
		// test wrong password format
		System.out.println("Case 2-1-2: wrong username format:6<too short<8");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("davrgdr");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		WebElement passwordErrorMessage = driver.findElement(By.cssSelector("p.text-red-600"));
		WebElement passwordLevel = driver.findElement(By.tagName("span"));
		assertEquals("Good", passwordLevel.getText());
		assertEquals("Password must be at least 8 characters, contain an uppercase, lowercase, number",
				passwordErrorMessage.getText());
	}

	@Test
	public void testWrongPasswordFormat2() throws InterruptedException {
		// test wrong password format
		System.out.println("Case 2-2: wrong username format:loger than 8, but no uppercase");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("dafff45745");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		WebElement passwordErrorMessage = driver.findElement(By.cssSelector("p.text-red-600"));
		WebElement passwordLevel = driver.findElement(By.tagName("span"));
		assertEquals("Strong", passwordLevel.getText());
		assertEquals("Password must be at least 8 characters, contain an uppercase, lowercase, number",
				passwordErrorMessage.getText());
	}

	@Test
	public void testWrongPasswordFormat3() throws InterruptedException {
		// test wrong password format
		System.out.println("Case 2-3: wrong username format:loger than 8, but no lowercase");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("BFGNR45745");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		WebElement passwordErrorMessage = driver.findElement(By.cssSelector("p.text-red-600"));
		WebElement passwordLevel = driver.findElement(By.tagName("span"));
		assertEquals("Strong", passwordLevel.getText());
		assertEquals("Password must be at least 8 characters, contain an uppercase, lowercase, number",
				passwordErrorMessage.getText());
	}

	@Test
	public void testWrongConfirmPasswordFormat() throws InterruptedException {
		// test confirmation password don't match
		System.out.println("Case 3: password dontmatch");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("BFGfs45745");
		driver.findElement(By.name("confirmPassword")).sendKeys("BFGfs45");
		driver.findElement(By.tagName("body")).click();
		Thread.sleep(3000);
		WebElement passwordErrorMessage = driver.findElement(By.cssSelector("p.text-red-600"));
		WebElement passwordLevel = driver.findElement(By.tagName("span"));
		assertEquals("Strong", passwordLevel.getText());
		assertEquals("Password doesn't match", passwordErrorMessage.getText());
	}

	@Test
	public void testRegisterSuccess() throws InterruptedException {
		// test register success
		System.out.println("Case 4: password dontmatch");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("email")).sendKeys("user@new.com");
		driver.findElement(By.name("username")).sendKeys("userNew");
		driver.findElement(By.name("password")).sendKeys("BFGfs45745");
		driver.findElement(By.name("confirmPassword")).sendKeys("BFGfs45745");
		WebElement registerButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		driver.findElement(By.id("accept-disclaimer")).click();
		registerButton.click();
		Thread.sleep(3000);
		List<WebElement> registerErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(0, registerErrorMessages.size());
		assertEquals("http://localhost:5173/login", driver.getCurrentUrl());
	}

	@Test
	public void testRegisterUserAlreadyExistsError() throws InterruptedException {
		// test user already exists
		System.out.println("Case 5:user already exists");
		driver.get("http://localhost:5173/register");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("email")).sendKeys("charlie@example.com");
		driver.findElement(By.name("username")).sendKeys("charlie");
		driver.findElement(By.name("password")).sendKeys("NewUser123");
		driver.findElement(By.name("confirmPassword")).sendKeys("NewUser123");
		WebElement registerButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		driver.findElement(By.id("accept-disclaimer")).click();
		registerButton.click();
		Thread.sleep(3000);
		List<WebElement> registerErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(0, registerErrorMessages.size());
		assertEquals("http://localhost:5173/register", driver.getCurrentUrl());
		WebElement registerFailedBecauseUserExistsError = driver.findElement(By.className("text-red-700"));
		assertEquals("Registration Failed : Response Error", registerFailedBecauseUserExistsError.getText());
	}

	@AfterEach
	public void destroy() {
		driver.quit();
	}

}
