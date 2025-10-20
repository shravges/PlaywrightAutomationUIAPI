import {test, expect} from '@playwright/test'
//import data from '../testData/userProductDetails.json' with {type: "json"}
import {LoginPage} from '../../pages/LoginPage'
import {CreateNewAddressPage} from '../../pages/CreateNewAddressPage'
import fs from 'fs'

const commonData = JSON.parse(fs.readFileSync('./testData/userProductDetails.json','utf-8'));
const userAddressData = JSON.parse(fs.readFileSync('./testData/userAddress.json','utf-8'));


test('User adddress validation', async({page}) => {

    
    await page.goto(commonData.juiceShopURL);
    const createNewAddressPage = new CreateNewAddressPage(page);
    
    //await loginPage.loginToJuiceShop(commonData.juiceShopURL, commonData.username, commonData.password);
    await createNewAddressPage.checkAndCreateAddress(userAddressData.country,userAddressData.name,userAddressData.mobileNumber,userAddressData.zipCode,userAddressData.address,userAddressData.city,userAddressData.state);
})