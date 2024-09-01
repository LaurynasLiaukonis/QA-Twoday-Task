import { expect } from "chai";
import { Browser, Builder, By, until, Key } from "selenium-webdriver";

/**
 * Test suite for Online Shop - Scenario One
 * This suite tests the process of purchasing a product from the men's Hoodies & Sweatshirts section
 */
describe("Online Shop Test - Scenario One", function () {
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
	 * Step 1: Navigate to the men's Hoodies & Sweatshirts section
	 */
	it("Step 1: Using navigation menu, find mens Hoodies & Sweatshirts section", async function () {
		try {
			await driver.get("https://magento.softwaretestingboard.com/");
			await driver.findElement(By.id("ui-id-5")).click();
			await driver
				.findElement(By.xpath("//a[text()='Hoodies & Sweatshirts']"))
				.click();
		} catch (error) {
			console.log("Step 1 failed: ", error);
		}
	});

	/**
	 * Step 2: Verify the number of displayed products matches the expected count
	 */
	it("Step 2: Check/Assert that the displayed number of jackets matches the selected number of jackets displayed per page", async function () {
        try {
            let products = await driver.wait(
                until.elementsLocated(
                    By.xpath("//li[contains(@class, 'product-item')]")
                ),
                10000
            );

            let toolbarAmountElement = await driver.wait(
                until.elementLocated(
                    By.xpath("(//span[@class='toolbar-number'])[2]")
                ),
                10000
            );

            let expectedProductCount = parseInt(
                await toolbarAmountElement.getText()
            );

            let actualProductCount = products.length;

            // Assert that the actual count matches the expected count
            expect(actualProductCount).to.equal(expectedProductCount);
        } catch (error) {
            console.log("Step 2 failed: ", error);
        }
    });
	
	/**
	 * Step 3: Select and open details for "Frankie Sweatshirt"
	 */
	it("Step 3: Select 'Frankie Sweatshirt' and open its details", async function () {
		try {
			let frankieSweatshirt = await driver.findElement(
				By.linkText("Frankie Sweatshirt")
			);
			await frankieSweatshirt.click();
		} catch (error) {
			console.log("Step 3 failed: ", error);
		}
	});

	/**
	 * Step 4: Select size, color, and quantity for the product
	 */
	it("Step 4: Select size, colour and quantity.", async function () {
		try {
			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-size-143-item-168")
					),
					15000
				)
				.click();
			await driver
				.wait(
					until.elementLocated(
						By.id("option-label-color-93-item-53")
					),
					15000
				)
				.click();
			let quantityInput = await driver.findElement(By.id("qty"));
			await quantityInput.clear();
			await quantityInput.sendKeys("2");
		} catch (error) {
			console.log("Step 4 failed: ", error);
		}
	});

	/**
	 * Step 5: Add product to cart and verify cart icon update
	 */
	it("Step 5: Add product to cart and check that cart icon is updated with product quantity.", async function () {
		try {
			await driver
				.wait(
					until.elementLocated(By.id("product-addtocart-button")),
					10000
				)
				.click();

			const cartLoadingFinished = async () => {
				const element = await driver.findElement(
					By.css(".counter-number, ._block-content-loading")
				);
				const className = await element.getAttribute("class");
				return !className.includes("_block-content-loading");
			};

			await driver.wait(
				cartLoadingFinished,
				10000,
				"Loading did not finish within 10 seconds"
			);

			let checkoutCartQuantity = await driver
				.findElement(By.className("counter-number"))
				.getText();
			let expectedQuantity = "2";

			// Assert that the product quantity is correct
			expect(checkoutCartQuantity).to.equal(expectedQuantity);
		} catch (error) {
			console.log("Step 5 failed: ", error);
		}
	});

	/**
	 * Step 6: Open cart and verify the added product
	 */
	it("Step 6: Open cart and check if product match the one You added to the cart.", async function () {
		try {
			await driver
				.wait(until.elementLocated(By.css("a.action.showcart")), 10000)
				.click();

			let cartProductName = await driver
				.wait(
					until.elementLocated(
						By.css(".minicart-items .product-item-name")
					),
					10000
				)
				.getText();

			let expectedCartProductName = "Frankie Sweatshirt";

			// Assert that the product name is correct
			expect(cartProductName).to.equal(expectedCartProductName);
		} catch (error) {
			console.log("Step 6 failed: ", error);
		}
	});

	/**
	 * Step 7: Proceed to checkout
	 */
	it("Step 7: Proceed to checkout", async function () {
		try {
			await driver.findElement(By.id("top-cart-btn-checkout")).click();

			async function isCheckoutPageLoaded(driver) {
				try {
					const loadingMask = await driver.findElements(
						By.css(".loading-mask")
					);
					const stepContent = await driver.findElements(
						By.css(".step-content")
					);

					// Page is loaded when loading mask is gone and step content is present
					return loadingMask.length === 0 && stepContent.length > 0;
				} catch (error) {
					console.log(
						`Error checking page load status: ${error.message}`
					);
					return false;
				}
			}

			await driver.wait(
				async () => isCheckoutPageLoaded(driver),
				15000,
				"Checkout page did not load within 15 seconds"
			);
		} catch (error) {
			console.log("Step 7 failed: ", error);
		}
	});

	/**
	 * Step 8: Complete the order
	 */
	it("Step 8: Complete the order.", async function () {
		try {
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
