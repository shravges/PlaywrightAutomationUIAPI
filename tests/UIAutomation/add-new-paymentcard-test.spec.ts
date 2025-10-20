import {test, expect} from '@playwright/test'
//import data from '../testData/userProductDetails.json' with {type: "json"}
import {LoginPage} from '../../pages/LoginPage'
import {CreateNewPaymentCardPage} from '../../pages/CreateNewPaymentCardPage'
import fs from 'fs'

const commonData = JSON.parse(fs.readFileSync('./testData/userProductDetails.json','utf-8'));
const userPaymentCardData = JSON.parse(fs.readFileSync('./testData/userPaymentCard.json','utf-8'));


test.skip('Add new payment card validation', async({page}) => {

    const loginPage = new LoginPage(page);
    const createNewPaymentCardPage = new CreateNewPaymentCardPage(page);
    
    await loginPage.loginToJuiceShop(commonData.juiceShopURL, commonData.username, commonData.password);
    await createNewPaymentCardPage.checkAndCreateNewPaymentCard(userPaymentCardData.userNameOnCard,userPaymentCardData.userCardNumber,userPaymentCardData.cardExpiryMonth,userPaymentCardData.cardExpiryYear);
})