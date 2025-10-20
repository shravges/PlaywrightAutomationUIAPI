import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class PaymentOptionPage extends BasePage{
    readonly page:Page;
    readonly btnContinue: Locator;
    readonly btnAddNewCard: Locator;
    readonly txtbxNameOnCard: Locator;
    readonly txtbxCardNo: Locator;
    readonly selectDDExpiryMonth: Locator;
    readonly selectDDExpiryYear: Locator;
    readonly btnSubmit: Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnContinue = page.getByText('Continue'); 
        this.btnAddNewCard = page.locator("//mat-expansion-panel/mat-expansion-panel-header/span[@class='mat-content']/mat-panel-title[text()=' Add new card ']");
        this.txtbxNameOnCard = page.locator("(//div[@class='mat-expansion-panel-body']//mat-form-field)[1]//input");
        this.txtbxCardNo = page.locator("(//div[@class='mat-expansion-panel-body']//mat-form-field)[2]//input");
        this.selectDDExpiryMonth = page.locator("(//div[@class='mat-expansion-panel-body']//mat-form-field)[3]//select");
        this.selectDDExpiryYear = page.locator("(//div[@class='mat-expansion-panel-body']//mat-form-field)[4]//select");        
        this.btnSubmit = page.locator("button#submitButton");
    }

/**
 * This function creates new card for payment
 * @param userNameOnCard 
 * @param userCardNumber 
 * @param cardExpiryMonth 
 * @param cardExpiryYear 
 * @param cardNumberEnding 
 */
    async selectPaymentOptionCard(userNameOnCard:string, userCardNumber: string, cardExpiryMonth:string ,cardExpiryYear:string, cardNumberEnding: string)
    {
        await this.waitForGivenTimeout(1000);
       
        //check and click the card
        let totalExistingCards: number = await this.page.locator("//mat-table//mat-row").count();
        console.log("Total cards available  =" +totalExistingCards);

        if(totalExistingCards === 0)
        {
            //create new card
            await this.createNewPaymentCard(userNameOnCard, userCardNumber, cardExpiryMonth, cardExpiryYear);
            totalExistingCards=totalExistingCards+1;
        }

        for(let i:number=1;i<=totalExistingCards;i++)
        {
                let currentCardNumber:string = await this.page.locator("(//mat-table//mat-row)["+i+"]//mat-cell[2]").innerText();
                console.log("Current card =" +currentCardNumber)
                if(currentCardNumber === cardNumberEnding)
                {
                    console.log("Given payment card found");
                    await this.page.locator("//mat-table//mat-row["+i+"]//mat-cell[1]/mat-radio-button[starts-with(@id,'mat-radio')]").click();
                    break;
                }
        }

        await this.clickOnElement(this.btnContinue);
        console.log("Moved to next page from select payment card page");
    }

    async createNewPaymentCard(userNameOnCard:string, userCardNumber: string, cardExpiryMonth:string ,cardExpiryYear:string)
    {
        await this.clickOnElement(this.btnAddNewCard);
        await this.waitForGivenTimeout(1000);
        await this.fillInputValue(this.txtbxNameOnCard, userNameOnCard);
        await this.fillInputValue(this.txtbxCardNo, userCardNumber);
        await this.selectDDExpiryMonth.selectOption(cardExpiryMonth);
        await this.selectDDExpiryYear.selectOption(cardExpiryYear);

        await this.clickOnElement(this.btnSubmit);
        await this.waitForGivenTimeout(1000);
    }



}
        




