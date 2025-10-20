import { test as setup, expect, Locator } from '@playwright/test';
import path from 'path';
import { BasePage } from "../utils/base-page";



setup('authenticate', async ({ page }) => {

    await page.goto("https://demo.owasp-juice.shop/#/");
    
    await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
    await page.getByRole('button', { name: 'dismiss cookie message' }).click();
    await page.getByRole('button', { name: 'Show/hide account menu' }).click();
    await page.getByRole('menuitem', { name: 'Go to login page' }).click();
    
    await page.locator("input#email").fill("shilpasautomation@gmail.com");
    await page.locator("input#password").fill("ravindra12");
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await page.waitForTimeout(2000);
      
    console.log("User landed on juice shop home page successfully");

    await page.context().storageState({ path: "./UserLoginDetails.json"});
});