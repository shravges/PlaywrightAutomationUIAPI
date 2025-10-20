import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class SelectAddressPage extends BasePage{
    readonly page:Page;
    readonly btnContinue: Locator;
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
        this.btnContinue = page.getByText('Continue'); 
        this.btnAddNewAddress = page.locator("button[aria-label='Add a new address']");
        this.txtbxCountry = page.locator("input[placeholder='Please provide a country.']");
        this.txtbxName = page.locator("input[placeholder='Please provide a name.']");
        this.txtbxMobileNumber = page.locator("input[placeholder='Please provide a mobile number.']");
        this.txtbxZipCode = page.locator("input[placeholder='Please provide a ZIP code.']");
        this.txtbxAddress= page.locator("textarea[placeholder='Please provide an address.']");
        this.txtbxCity = page.locator("input[placeholder='Please provide a city.']");
        this.txtbxState = page.locator("input[placeholder='Please provide a state.']");
        this.btnSubmit = page.locator("button#submitButton");
    }

/**
 * This function creates new address
 * @param country 
 * @param personName 
 * @param mobileNumber 
 * @param zipCode 
 * @param address 
 * @param city 
 * @param state 
 */
    async addDeliveryAddress(country:string,personName:string,mobileNumber:string,zipCode:string,address:string,city:string,state:string)
    {
        await this.waitForGivenTimeout(2000);
        
        let totalAddresses: number = await this.page.locator("//mat-table//mat-row").count();
        console.log("Total no. of addresses are  =" +totalAddresses);

        if(totalAddresses === 0)
        {
            //create new address for the delivery
            await this.createNewAddress(country,personName,mobileNumber,zipCode,address,city,state);
            totalAddresses = totalAddresses+1;
        }

        for(let i:number=1;i<=totalAddresses;i++)
        {
            
                let currentAddressName:string = await this.page.locator("((//mat-table//mat-row)["+i+"]//mat-cell)[2]").innerText();
                if(currentAddressName === personName )
                {
                    console.log("Current person for delivery found");
                    await this.page.locator("//mat-table//mat-row["+1+"]//mat-cell[1]/mat-radio-button[starts-with(@id,'mat-radio')]").click();
                    break;
                }
        }
      
        await this.clickOnElement(this.btnContinue);
        console.log("Clicked on checkout button");
    }

    async createNewAddress(country:string,name:string,mobileNumber:string,zipCode:string,address:string,city:string,state:string)
    {
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
    }

}
        




