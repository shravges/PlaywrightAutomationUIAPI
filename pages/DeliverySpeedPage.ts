import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class DeliverySpeedPage extends BasePage{
    readonly page:Page;
    readonly btnContinue: Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnContinue = page.getByText('Continue'); 
    }

/**
 * This function selects delivery speed/type
 * @param deliveryType : 1 day , fast
 */
    async selectDeliverySpeed(deliveryType:string)
    {
        await this.waitForGivenTimeout(1000);

        let totalDeliveries: number = await this.page.locator("//mat-table//mat-row").count();
        console.log("Total no. types of deliveries are  =" +totalDeliveries);

        for(let i:number=1;i<=totalDeliveries;i++)
        {
            
                let currentDeliveryType:string = await this.page.locator("(//mat-table//mat-row)["+i+"]//mat-cell[4]").innerText();
                if(currentDeliveryType === deliveryType )
                {
                    console.log("Given delivery type found");
                    await this.page.locator("//mat-table//mat-row["+i+"]//mat-cell[1]/mat-radio-button[starts-with(@id,'mat-radio')]").click();
                    break;
                }
        }

        await this.clickOnElement(this.btnContinue);
        console.log("Moved to next page from selec delivery type page");
        
    }

}
        




