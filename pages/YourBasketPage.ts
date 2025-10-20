import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class YourBasketPage extends BasePage{
    readonly page:Page;
    readonly lnkYourBasket: Locator;
    readonly btnCheckout: Locator;
    
    
   
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.lnkYourBasket = page.getByText('Your Basket');
        this.btnCheckout = page.locator("button#checkoutButton");
       

    }


    async goToYourBasket(): Promise<string[]>
    {
        let productsInBasket =[];
        await this.waitForGivenTimeout(2000);
        await this.clickOnElement(this.lnkYourBasket);
         await this.waitForGivenTimeout(1000);

        let totalProductsInBasket: number = await this.page.locator("//mat-table//mat-row").count();
        console.log("Total products in basket are =" +totalProductsInBasket);

        for(let i:number=1;i<=totalProductsInBasket;i++)
        {
            
                let basketProduct:string = await this.page.locator("((//mat-table//mat-row)["+i+"]//mat-cell)[2]").innerText();
                productsInBasket.push(basketProduct);
        }

        return productsInBasket;

    }



    async checkoutBasket()
    {
        await this.clickOnElement(this.btnCheckout);
        console.log("Clicked on checkout button");
    }





}
        




