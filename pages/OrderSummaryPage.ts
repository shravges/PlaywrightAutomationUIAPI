import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class OrderSummaryPage extends BasePage{
    readonly page:Page;
    readonly headerOrderDone: Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.headerOrderDone = page.getByRole("heading", {name: 'Thank you for your purchase!'});
    }

    async validateOrderConfirmed():  Promise<boolean>
    {
        await this.waitForGivenTimeout(2000);
        return await this.headerOrderDone.isVisible();
    }
        
}

