import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class OrderDetailsPage extends BasePage{
    readonly page:Page;
    readonly btnPlaceYourOrder: Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnPlaceYourOrder = page.locator("button#checkoutButton");
    }


    async placeYourOrder()
    {
        await this.waitForGivenTimeout(2000);

        this.clickOnElement(this.btnPlaceYourOrder);
    }
        


}

