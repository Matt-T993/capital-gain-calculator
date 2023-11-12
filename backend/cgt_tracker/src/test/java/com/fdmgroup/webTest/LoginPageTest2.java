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
public class LoginPageTest2 {

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
		driver.get("http://localhost:5173");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		printUrl();
		// test sign in Link
		WebElement signInLink = driver.findElement(By.xpath("//*[@id=\"root\"]/div/header/nav/a[1]"));
		signInLink.click();
		assertEquals("http://localhost:5173/login", driver.getCurrentUrl());
	}

	@Test
	public void testLoginPageh1Element() throws InterruptedException {
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test h1 title
		WebElement h1titleOfLoginPage = driver.findElement(By.tagName("h1"));
		assertEquals("Capital Gains Calculator", h1titleOfLoginPage.getText());
	}
	
	@Test
	public void testLoginPageh2Element() throws InterruptedException {
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test h2
		WebElement h2Text = driver.findElement(By.tagName("h2"));
		assertEquals("Sign In", h2Text.getText());}
	
	@Test
	public void testLoginPagehRegisterLinkElement() throws InterruptedException {
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test register link
		WebElement registerLink = driver.findElement(By.partialLinkText("register"));
		registerLink.click();
		assertEquals("http://localhost:5173/register", driver.getCurrentUrl());
		Thread.sleep(3000);
		driver.navigate().back();
		Thread.sleep(3000);
		// test forgot password link
		WebElement forgotPasswordLink = driver.findElement(By.partialLinkText("Forgot"));
		forgotPasswordLink.click();
		assertEquals("http://localhost:5173/forgot-password", driver.getCurrentUrl());
		Thread.sleep(3000);
		driver.navigate().back();
		Thread.sleep(3000);}
	
	@Test
	public void testLoginPagehRememberMeElement() throws InterruptedException {
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test the remember me label content
		WebElement rememberMe = driver.findElement(By.id("rememberMe"));
		assertEquals("Remember me", rememberMe.getAccessibleName());
		assertEquals("checkbox", rememberMe.getAttribute("type"));}
	
	@Test
	public void testLoginPagehErrorNotificationsElementText() throws InterruptedException {
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test the login notifications text contents
		List<WebElement> relativeGroups = driver.findElements(By.className("relative"));
		for (WebElement e : relativeGroups) {
			System.out.println("// assert the login notifications:" + e.getText());
		}
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		assertEquals("Invalid Email or Username", relativeGroups.get(0).getText());
		assertEquals("Password is required", relativeGroups.get(1).getText());
	}
	
	@Test
	public void testInputLabelsElement() throws InterruptedException {
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		// test the input label
		List<WebElement> labelsInTheForm = driver.findElements(By.tagName("label"));
		assertEquals("Email or Username:", labelsInTheForm.get(0).getText());
		assertEquals("Password:", labelsInTheForm.get(1).getText());
		// test the input box
		List<WebElement> inputBoxesInTheForm = driver.findElements(By.tagName("input"));
		assertEquals("text", inputBoxesInTheForm.get(0).getAttribute("type"));
		assertEquals("password", inputBoxesInTheForm.get(1).getAttribute("type"));
		assertEquals("Enter your email or username", inputBoxesInTheForm.get(0).getAttribute("placeholder"));
		assertEquals("Enter your password", inputBoxesInTheForm.get(1).getAttribute("placeholder"));

	}

	@Test
	public void testLoginNoUsernameNoPassword() throws InterruptedException {
		// test no username no password input
		System.out.println("Case 1: no username input, no password input");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		Thread.sleep(3000);
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(2,LoginErrorMessages.size());
		assertEquals("Invalid Email or Username",LoginErrorMessages.get(0).getText());
		assertEquals("Password is required", LoginErrorMessages.get(1).getText());
	}

	@Test
	public void testLoginNoPassword() throws InterruptedException {
		// test no password input
		System.out.println("Case 2: no password input");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("emailOrUsername")).sendKeys("user1");
		Thread.sleep(1000);
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(1, LoginErrorMessages.size());
		assertEquals("Password is required",LoginErrorMessages.get(0).getText());
	}

	@Test
	public void testLoginNoUsername() throws InterruptedException {
		// test no username input
		System.out.println("Case 3: no username input");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("password")).sendKeys("password1");
		Thread.sleep(1000);
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(1, LoginErrorMessages.size());
		assertEquals("Invalid Email or Username", LoginErrorMessages.get(0).getText());
	}

	@Test
	public void testLoginWrongUsernameOrPassword1() throws InterruptedException {
		// test username input does not match the database
		System.out.println("Case 4: wrong username input");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("emailOrUsername")).sendKeys("charlieeee");
		driver.findElement(By.name("password")).sendKeys("password1");
		Thread.sleep(1000);
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(0, LoginErrorMessages.size());
		WebElement LoginFailedErrorMessage = driver.findElement(By.className("text-red-700"));
		assertEquals("Login Failed", LoginFailedErrorMessage.getText());
	}
	
	@Test
	public void testLoginWrongUsernameOrPassword2() throws InterruptedException {
		// test password input does not match the database
		System.out.println("Case 5: wrong username input");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("emailOrUsername")).sendKeys("charlie");
		driver.findElement(By.name("password")).sendKeys("password11111");
		Thread.sleep(1000);
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		Thread.sleep(1000);
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(0, LoginErrorMessages.size());
		WebElement LoginFailedErrorMessage = driver.findElement(By.className("text-red-700"));
		assertEquals("Login Failed", LoginFailedErrorMessage.getText());
	}
	
	@Test
	public void testLoginWrongUsernameOrPassword3() throws InterruptedException {
		// test password and username not match the database
		System.out.println("Case 6: wrong username input");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("emailOrUsername")).sendKeys("charlieeee");
		driver.findElement(By.name("password")).sendKeys("password11111");
		Thread.sleep(1000);
		WebElement LoginButton = driver.findElement(By.cssSelector("button.bg-indigo-700"));
		LoginButton.click();
		Thread.sleep(1000);
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(0, LoginErrorMessages.size());
		WebElement LoginFailedErrorMessage = driver.findElement(By.className("text-red-700"));
		assertEquals("Login Failed", LoginFailedErrorMessage.getText());
	}

	@Test
	public void testLoginSuccsessful() throws InterruptedException {
		System.out.println("Case 7: chalie login");
		driver.get("http://localhost:5173/login");
		driver.manage().window().maximize();
		Thread.sleep(3000);
		driver.findElement(By.name("emailOrUsername")).sendKeys("charlie");
		driver.findElement(By.name("password")).sendKeys("password1");
		List<WebElement> LoginErrorMessages = driver.findElements(By.className("text-red-600"));
		assertEquals(0, LoginErrorMessages.size());
		WebElement LoginButton = driver.findElement(By.tagName("button"));
		LoginButton.click();
		Thread.sleep(3000);
		assertEquals("http://localhost:5173/dashboard", driver.getCurrentUrl());
	}

	@AfterEach
	public void destroy() {
		driver.quit();
	}

}
