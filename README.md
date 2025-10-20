"# PlaywrightAutomationUIAPI" 

This project provides an end-to-end automation framework using Playwright with TypeScript for both User Interface (UI) and Application Programming Interface (API) testing

Features:
TypeScript: Provides strong typing for robust and maintainable code.
Playwright: Leverages Playwright's modern capabilities for fast, reliable, and cross-browser testing.
UI Automation: Includes tests for web application flows across multiple browsers (Chromium, Firefox, WebKit).
API Automation: Contains tests for validating API endpoints (GET, POST, PUT, DELETE).
Page Object Model (POM): Implemented for UI tests to enhance code readability and maintainability.
Playwright Test Runner: Utilizes Playwright's built-in test runner for execution and reporting.
HTML Reports: Generates rich, interactive HTML reports for test results.

Prerequisites:
Node.js: (LTS version recommended)
npm (comes with Node.js)

Setup and Installation:
1. Clone the repository
git clone <your-repo-url>
cd <your-project-name>

2. Install dependencies This command installs all necessary Node.js packages, including Playwright and its browser drivers.
npm install

3. Install Playwright browser drivers (if not automatically installed)
npx playwright install

4. Running All Tests:
To execute all UI and API tests:
npx playwright test

Reporting:
An HTML report is generated automatically after a test run.
Viewing the Report
To open the interactive HTML report in your browser: npx playwright show-report

CICD file:
Please refer playwright.yml for details.

What you would do next with more time:
- UI automation for isloated tests for every page.
- UI automation with more data for better test coverage i.e. currently this automation uses payment method as card  - Later all payment methods should be covered in automation.
- More test data coverage for API automation as well.