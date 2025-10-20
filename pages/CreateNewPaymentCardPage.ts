import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class CreateNewPaymentCardPage extends BasePage{
    readonly page:Page;
    readonly btnAccount: Locator;
    readonly lnkOrderPayment: Locator;
    readonly lnkMyPaymentOptions: Locator;
    readonly btnAddNewCard: Locator;
    readonly txtbxNameOnCard: Locator;
    readonly txtbxCardNo: Locator;
    readonly txtbxExpiryMonth: Locator;
    readonly txtbxExpiryYear: Locator;
    readonly btnSubmit: Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnAccount = page.locator("//button[@id='navbarAccount']//span[text()=' Account ']");
        this.lnkOrderPayment = page.locator("(//div[@class='mat-mdc-menu-content'])[1]//button[contains(@aria-label,'Show Orders and Payment Menu')]//span[contains(text(),' Orders & Payment ')]");
        this.lnkMyPaymentOptions = page.locator("(//div[@class='mat-mdc-menu-content'])[2]//button[contains(@aria-label,'Go to saved payment methods page')]//span[contains(text(),' My Payment Options ')]");
        this.btnAddNewCard = page.locator("mat-expansion-panel mat-panel-title");
        this.txtbxNameOnCard = page.locator("input[placeholder='Please provide a country.']");
        this.txtbxCardNo = page.locator("input[placeholder='Please provide a name.']");
        this.txtbxExpiryMonth = page.locator("input[placeholder='Please provide a mobile number.']");
        this.txtbxExpiryYear = page.locator("input[placeholder='Please provide a ZIP code.']");        
        this.btnSubmit = page.locator("button#submitButton");
    }


    async checkAndCreateNewPaymentCard(userNameOnCard:string, userCardNumber:string ,cardExpiryMonth:string ,cardExpiryYear:string)
    {
        await this.waitForGivenTimeout(1000);
        await this.clickOnElement(this.btnAccount);
        await this.clickOnElement(this.lnkOrderPayment);
        await this.clickOnElement(this.lnkMyPaymentOptions);

        await this.clickOnElement(this.btnAddNewCard);

        await this.fillInputValue(this.txtbxNameOnCard, userNameOnCard);
        await this.fillInputValue(this.txtbxCardNo, userCardNumber);
        await this.fillInputValue(this.txtbxExpiryMonth, cardExpiryMonth);
        await this.fillInputValue(this.txtbxExpiryYear, cardExpiryYear);

        await this.clickOnElement(this.btnSubmit);
    }

 
}

