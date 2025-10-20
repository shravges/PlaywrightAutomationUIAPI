import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class CreateNewAddressPage extends BasePage{
    readonly page:Page;
    readonly btnAccount: Locator;
    readonly lnkOrderPayment: Locator;
    readonly lnkSavedAddress: Locator;
    readonly btnAddNewAddress: Locator;
    readonly txtbxCountry: Locator;
    readonly txtbxName: Locator;
    readonly txtbxMobileNumber: Locator;
    readonly txtbxZipCode: Locator;
    readonly txtbxAddress: Locator;
    readonly txtbxCity: Locator;
    readonly txtbxState: Locator;
    readonly btnSubmit: Locator;

    
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnAccount = page.locator("//button[@id='navbarAccount']//span[text()=' Account ']");
        this.lnkOrderPayment = page.locator("(//div[@class='mat-mdc-menu-content'])[1]//button[contains(@aria-label,'Show Orders and Payment Menu')]//span[contains(text(),' Orders & Payment ')]");
        this.lnkSavedAddress = page.locator("(//div[@class='mat-mdc-menu-content'])[2]//button[contains(@aria-label,'Go to saved address page')]//span[contains(text(),' My saved addresses ')]");
        this.btnAddNewAddress = page.locator("button[aria-label='Add a new address']");
        this.txtbxCountry = page.locator("input[placeholder='Please provide a country.']");
        this.txtbxName = page.locator("input[placeholder='Please provide a name.']");
        this.txtbxMobileNumber = page.locator("input[placeholder='Please provide a mobile number.']");
        this.txtbxZipCode = page.locator("input[placeholder='Please provide a ZIP code.']");
        this.txtbxAddress= page.locator("textarea[placeholder='Please provide an address.']");
        this.txtbxCity = page.locator("input[placeholder='Please provide a city.']");
        this.txtbxState = page.locator("input[placeholder='Please provide a name.']");
        this.btnSubmit = page.locator("button#submitButton");
    }

/**
 * This function checks and creates new address
 * @param country 
 * @param name 
 * @param mobileNumber 
 * @param zipCode 
 * @param address 
 * @param city 
 * @param state 
 */
    async checkAndCreateAddress(country:string,name:string,mobileNumber:string,zipCode:string,address:string,city:string,state:string)
    {
        await this.waitForGivenTimeout(3000);
        await this.clickOnElement(this.btnAccount);
        await this.clickOnElement(this.lnkOrderPayment);
        await this.clickOnElement(this.lnkSavedAddress);

        //check count of existing addresses
        let totalAddresses: number = await this.page.locator("//mat-table//mat-row").count();
        console.log("Total no. of existing addresses are  =" +totalAddresses);
     
        console.log("Creating new address!")
        await this.clickOnElement(this.btnAddNewAddress);

        await this.fillInputValue(this.txtbxCountry, country);
        await this.fillInputValue(this.txtbxName, name);
        await this.fillInputValue(this.txtbxMobileNumber, mobileNumber);
        await this.fillInputValue(this.txtbxZipCode, zipCode);
        await this.fillInputValue(this.txtbxAddress, address);
        await this.fillInputValue(this.txtbxCity, city);
        await this.fillInputValue(this.txtbxState, state);

        await this.clickOnElement(this.btnSubmit);
        totalAddresses = totalAddresses+1;

        if(totalAddresses > 0)
        {
            //delete existing address
            console.log("Existing address present. Deleting them!");
            await this.deleteExistingAddresses(totalAddresses);
        }
    
    }
    
/**
 * This function deletes the addresses
 * @param noOfAddresses 
 */
    async deleteExistingAddresses(noOfAddresses: number)
    {        
        for(let i:number=1;i<=noOfAddresses;i++)
        {
                    await this.page.locator("//mat-table//mat-row["+i+"]//mat-cell[5]/button").click();
        }
        console.log("All addresses deleted")
    }


}

