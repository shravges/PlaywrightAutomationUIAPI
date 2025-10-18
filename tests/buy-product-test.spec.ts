import {test} from '@playwright/test'
import data from '../testData/userProductDetails.json' with {type: "json"}
import {LoginPage} from '../pages/LoginPage'
import fs from 'fs'

const commonData = JSON.parse(fs.readFileSync('./testData/userProductDetails.json','utf-8'));

test('E2E product purchase test', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.loginToJuiceShop(commonData.juiceShopURL, commonData.username, commonData.password);

});