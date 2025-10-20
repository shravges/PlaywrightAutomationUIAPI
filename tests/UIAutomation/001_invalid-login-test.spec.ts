import {test, expect} from '@playwright/test'
import fs from 'fs'
import {LoginPage} from '../../pages/LoginPage'

const commonData = JSON.parse(fs.readFileSync('./testData/userProductDetails.json','utf-8'));
const invalidCredentials = JSON.parse(fs.readFileSync('./testData/invalidUserLogin.json','utf-8'));


// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('Invalid user login - Negative test case', async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginToJuiceShop(commonData.juiceShopURL, invalidCredentials.invalidUserName, invalidCredentials.invalidPassword);
    let errMessage: string = await loginPage.checkInvalidLogin();
    await expect(errMessage).toEqual("Invalid email or password.");
  
})