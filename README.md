# Implementation Details:

This project contains automated tests for an online shop using Selenium WebDriver and Mocha.

-   The test uses Selenium WebDriver to automate browser interactions.
-   Mocha is used as the test runner.
-   Chai is used for assertions.
-   The test includes error handling and logging for each step.
-   Waits and timeouts are implemented to handle dynamic page loading.

## Pre-requisites

### Install [Node](https://nodejs.org/en/download/package-manager)

1. Install NVM (Node Version Manager):

    **For MacOS:**

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
    ```

    **For Windows:**

    ```powershell
    # Install fnm (Fast Node Manager)
    winget install Schniz.fnm

    # Set up fnm in your PowerShell profile
    fnm env --use-on-cd | Out-String | Invoke-Expression

    # Install and use Node.js version 20
    fnm use --install-if-missing 20
    ```

2. Install Node.js version 20:
    ```
    nvm install 20
    ```
3. Verify installation:
    - Check Node version: `node -v`
    - Check npm version: `npm -v`

### Download & Install Google Chrome

-   Download and install [Google Chrome](https://www.google.com/chrome/)

### Download & Install Git

-   Download and install [Git](https://git-scm.com/downloads)

## How to run tests

1. Clone the project:

    ```
    git clone [repository]
    ```

    Alternatively, download the zip file and extract it.

2. Install dependencies:

    ```
    npm install
    ```

3. Run test scenarios:
    - For Scenario One: `npx mocha tests/testScenarioOne`
    - For Scenario Two: `npx mocha tests/testScenarioTwo`

## Scenario One: Purchase a Sweatshirt

This scenario tests the process of purchasing a sweatshirt from the men's Hoodies & Sweatshirts section.

### Test Steps:

1. Navigate to the men's Hoodies & Sweatshirts section using the navigation menu.
2. Verify that the displayed number of products matches the selected number of products per page.
3. Select "Frankie Sweatshirt" and open its details.
4. Choose size, color, and quantity for the product.
5. Add the product to the cart and verify that the cart icon updates with the correct quantity.
6. Open the cart and confirm that the added product matches the one selected.
7. Proceed to checkout.
8. Complete the order by filling in shipping information and placing the order.

## Scenario Two: Purchase Women's Pants

This scenario tests the process of purchasing women's pants, including filtering, cart operations, and checkout.

### Test Steps:

1. Navigate to the women's pants section using the navigation menu.
2. Filter the section to show the cheapest products available.
3. Select the cheapest pants and add them to the cart.
4. Add two more products to the cart and verify that the cart icon updates with each addition.
5. Remove a product from the cart.
6. Proceed to checkout.
7. Add a product to the cart from suggested products.
8. Complete the order by filling in shipping information and placing the order.
