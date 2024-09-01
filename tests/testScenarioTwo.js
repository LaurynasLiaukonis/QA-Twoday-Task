import { expect } from "chai";
import { Browser, Builder, By, until, Key } from "selenium-webdriver";

/**
 * Test suite for Online Shop - Scenario Two
 * This suite tests the process of purchasing women's pants, including filtering, cart operations, and checkout
 */
describe("Online Shop Test - Scenario Two", function () {
	let driver;
	this.timeout(120000);

	// Set up the WebDriver instance before running the tests
	before(async function () {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		driver.manage().window().maximize();
	});

	// Clean up and close the browser after the tests are done
	after(async function () {
		if (driver) {
			await driver.quit();
		}
	});

	/**
	 * Step 1: Navigate to the women's pants section
	 */
	it("Step 1: Using navigation menu, find women pants section. ", async function () {
		try {
			await driver.get("https://magento.softwaretestingboard.com/");
			await driver.findElement(By.id("ui-id-4")).click();
			await driver.findElement(By.xpath("//a[text()='Pants']")).click();
		} catch (error) {
			console.log("Step 1 failed: ", error);
		}
	});

	/**
	 * Step 2: Filter products by price (lowest to highest)
	 */
	it("Step 2: Filter section to show the cheapest products available. ", async function () {
		try {
			await driver.wait(
				until.elementLocated(By.css(".sorter-options")),
				5000
			);
			await driver
				.findElement(By.css(".sorter-options"))
				.sendKeys("Price");
		} catch (error) {
			console.log("Step 2 failed: ", error);
		}
	});

	/**
	 * Step 3: Select the cheapest pants and add them to the cart
	 */
	it("Step 3: Select the cheapest pants and add them to the cart. ", async function () {
		try {
			await driver
				.wait(
					until.elementLocated(By.css(".product-item:first-child")),
					10000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-size-143-item-172")
					),
					10000
				)
				.click();
			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-color-93-item-49")
					),
					10000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(By.id("product-addtocart-button")),
					10000
				)
				.click();
		} catch (error) {
			console.log("Step 3 failed: ", error);
		}
	});

	/**
	 * Step 4: Add two more products to the cart and verify cart icon updates
	 */
	it("Step 4: Add 2 more products to the cart. Check that cart icon is updated with each product. ", async function () {
		try {
			let expectedCartQuantity = 2;

			async function getCartQuantity() {
				return Number(
					await driver
						.findElement(By.className("counter-number"))
						.getText()
				);
			}

			const cartLoadingFinished = async () => {
				const element = await driver.findElement(
					By.css(".counter, ._block-content-loading")
				);
				const className = await element.getAttribute("class");

				return !className.includes("_block-content-loading");
			};

			await driver.wait(
				cartLoadingFinished,
				10000,
				"Loading did not finish within 10 seconds"
			);

			// Add first additional product
			await driver
				.wait(
					until.elementLocated(
						By.xpath("//img[@alt='Emma Leggings']")
					),
					5000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-size-143-item-172")
					),
					10000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-color-93-item-57")
					),
					10000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(By.id("product-addtocart-button")),
					10000
				)
				.click();

			await driver.wait(
				cartLoadingFinished,
				10000,
				"Loading did not finish within 10 seconds"
			);

			// Assert that the cart quantity is correct
			expect(await getCartQuantity()).to.equal(expectedCartQuantity);
			expectedCartQuantity++;

			// Add second additional product
			await driver
				.wait(
					until.elementLocated(
						By.xpath("//img[@alt='Ida Workout Parachute Pant']")
					),
					5000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-size-143-item-171")
					),
					10000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-color-93-item-50")
					),
					10000
				)
				.click();

			await driver
				.wait(
					until.elementLocated(By.id("product-addtocart-button")),
					10000
				)
				.click();

			await driver.wait(
				cartLoadingFinished,
				10000,
				"Loading did not finish within 10 seconds"
			);

			// Assert that the updated cart quantity is correct
			expect(await getCartQuantity()).to.equal(expectedCartQuantity);
		} catch (error) {
			console.log("Step 4 failed: ", error);
		}
	});

	/**
	 * Step 5: Remove a product from the cart
	 */
	it("Step 5: Remove product from the cart.  ", async function () {
		try {
			await driver.findElement(By.css(".showcart")).click();
			await driver.wait(
				until.elementLocated(
					By.xpath("//span[@class='product-image-wrapper'][1]")
				),
				10000
			);
			await driver
				.findElement(By.xpath("//a[@title='Remove item'][1]"))
				.click();
			await driver.wait(
				until.elementIsVisible(
					driver.findElement(By.id("modal-content-44"))
				),
				10000
			);

			let confirmButton = await driver.findElement(
				By.css("button.action-primary.action-accept")
			);
			await driver.wait(until.elementIsVisible(confirmButton), 10000);
			await driver.wait(until.elementIsEnabled(confirmButton), 10000);

			await confirmButton.click();

		} catch (error) {
			console.log("Step 5 failed: ", error);
		}
	});

	/**
	 * Step 6: Proceed to checkout
	 */
	it("Step 6: Proceed to checkout.  ", async function () {
		try {
			await driver.sleep(1000);

			await driver
				.wait(
					until.elementLocated(
						By.xpath("//a[@class='action viewcart']")
					),
					10000
				)
				.click();


		} catch (error) {
			console.log("Step 6 failed: ", error);
		}
	});

	/**
	 * Step 7: Add a product from suggested products to the cart
	 */
	it("Step 7: Add product to the cart from suggested products. ", async function () {
		try {
			await driver
				.findElement(
					By.xpath("//button[@class='action tocart primary']")
				)
				.click();

			await driver.sleep(5000);

			await driver
				.findElement(
					By.xpath("//button[@data-role='proceed-to-checkout']")
				)
				.click();
		} catch (error) {
			console.log("Step 7 failed: ", error);
		}
	});

	/**
	 * Step 8: Complete the order
	 */
	it("Step 8: Complete the order. ", async function () {
		try {
			await driver.wait(
				until.elementLocated(
					By.xpath("//img[@title='Karmen Yoga Pant']")
				),
				20000
			);

			await driver
				.findElement(By.id("customer-email"))
				.sendKeys("test@gmail.com");
			await driver.findElement(By.name("firstname")).sendKeys("Jonas");
			await driver.findElement(By.name("lastname")).sendKeys("Jonaitis");
			await driver
				.findElement(By.name("street[0]"))
				.sendKeys("123 Unnamed Street");
			await driver.findElement(By.name("city")).sendKeys("Washington");

			let stateProvinceDropdown = await driver.findElement(
				By.name("region_id")
			);

			await stateProvinceDropdown.click();
			await stateProvinceDropdown.sendKeys("Florida");
			await stateProvinceDropdown.sendKeys(Key.ENTER);

			await driver.findElement(By.name("postcode")).sendKeys("12348");
			await driver
				.findElement(By.name("telephone"))
				.sendKeys("783337896");

			await driver
				.wait(
					until.elementLocated(
						By.xpath(
							"//input[@type='radio' and @value='flatrate_flatrate']"
						)
					),
					10000
				)
				.click();

			// Wait for updates after selecting the shipping method
			await driver.sleep(1000);

			await driver
				.findElement(By.css("button[data-role='opc-continue']"))
				.click();

			// Wait for updated after proceeding with the checkout
			await driver.sleep(5000);

			await driver
				.findElement(
					By.xpath("//button[@class='action primary checkout']")
				)
				.click();

			// Wait for checkout to succeed
			await driver.wait(
				until.elementLocated(By.css("div.checkout-success")),
				20000
			);
		} catch (error) {
			console.log("Step 8 failed: ", error);
		}
	});
});
