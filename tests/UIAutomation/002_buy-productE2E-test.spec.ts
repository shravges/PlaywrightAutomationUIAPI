import {test, expect} from '@playwright/test'
//import data from '../testData/userProductDetails.json' with {type: "json"}
import {LoginPage} from '../../pages/LoginPage'
import {YourBasketPage} from '../../pages/YourBasketPage'
import {SelectAddressPage} from '../../pages/SelectAddressPage'
import {DeliverySpeedPage} from '../../pages/DeliverySpeedPage'
import {PaymentOptionPage} from '../../pages/PaymentOptionPage'
import {OrderDetailsPage} from '../../pages/OrderDetailsPage'
import {OrderSummaryPage} from '../../pages/OrderSummaryPage'
import {CreateNewAddressPage} from '../../pages/CreateNewAddressPage'
import fs from 'fs'

const commonData = JSON.parse(fs.readFileSync('./testData/userProductDetails.json','utf-8'));
const userAddressData = JSON.parse(fs.readFileSync('./testData/userAddress.json','utf-8'));
const userPaymentCardData = JSON.parse(fs.readFileSync('./testData/userPaymentCard.json','utf-8'));

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('E2E product purchase test', async ({page}) => {

    const loginPage = new LoginPage(page);
    const yourBasketPage = new YourBasketPage(page);
    const selectAddressPage = new SelectAddressPage(page);
    const deliverySpeedPage = new DeliverySpeedPage(page);
    const paymentOptionPage = new PaymentOptionPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);

    await loginPage.loginToJuiceShop(commonData.juiceShopURL, commonData.username, commonData.password);
    await loginPage.addProductToBasket(commonData.product); 

    let basketItems: string[] = await yourBasketPage.goToYourBasket();
    console.log("Items in basket are =" +basketItems);
    await yourBasketPage.checkoutBasket();

    await selectAddressPage.addDeliveryAddress(userAddressData.country,userAddressData.name,userAddressData.mobileNumber,userAddressData.zipCode,userAddressData.address,userAddressData.city,userAddressData.state);
    
    await deliverySpeedPage.selectDeliverySpeed(commonData.deliveryType);

    await paymentOptionPage.selectPaymentOptionCard(userPaymentCardData.userNameOnCard, userPaymentCardData.userCardNumber, userPaymentCardData.cardExpiryMonth ,userPaymentCardData.cardExpiryYear, commonData.cardNumber);

    await orderDetailsPage.placeYourOrder();

    let orderStatus: boolean = await orderSummaryPage.validateOrderConfirmed();
    console.log("Order status =" +orderStatus);
    await expect(orderStatus).toBeTruthy();
});




