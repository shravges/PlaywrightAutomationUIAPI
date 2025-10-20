import { Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../utils/base-page";


export class LoginPage extends BasePage{
    readonly page:Page;
    readonly textbxUsername: Locator;
    readonly txtbxPassword: Locator;
    readonly btnDismissPopup: Locator;
    readonly lnkAccount: Locator;
    readonly lnkLogin: Locator;
    readonly btnLogin: Locator;
    readonly headerAllProducts: Locator;
    readonly lnkAllProducts: Locator;
    readonly btnDismissCookies: Locator;
   
    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnDismissPopup = page.getByRole('button', { name: 'Close Welcome Banner' });
        this.btnDismissCookies = page.getByRole('button', { name: 'dismiss cookie message' });
        this.lnkAccount = page.getByRole('button', { name: 'Show/hide account menu' });
        this.lnkLogin = page.getByRole('menuitem', { name: 'Go to login page' });
        this.textbxUsername = page.locator("input#email");
        this.txtbxPassword = page.locator("input#password");   
        this.btnLogin = page.getByRole('button', { name: 'Login', exact: true });  
        this.headerAllProducts = page.getByText("All Products");
        this.lnkAllProducts = page.locator("//mat-card");

    }


    async loginToJuiceShop(url: string, username:string, password:string)
    {
        await this.page.goto(url);
        //await this.waitForLoad();
        await this.clickOnElement(this.btnDismissPopup);
        await this.clickOnElement(this.btnDismissCookies);
        await this.clickOnElement(this.lnkAccount);
        await this.clickOnElement(this.lnkLogin);

        await this.fillInputValue(this.textbxUsername, username);
        await this.fillInputValue(this.txtbxPassword, password);
        await this.clickOnElement(this.btnLogin);

        await this.waitForGivenTimeout(2000);

    }

    async addProductToBasket(productName: string)
    {
        await this.waitForGivenTimeout(4000);
        await this.headerAllProducts.waitFor({state:'visible'});
      
        let totalProductsCount: number = await this.getElementCount(this.lnkAllProducts);
        console.log("Total products shown on screen=" +totalProductsCount);

        
        for(let i:number=1;i<totalProductsCount;i++)
        {
            let productNameUI: string = await this.page.locator("(//mat-card)["+i+"]//div[@class='mdc-card']//div[@class='item-name']").innerText();
            
            if(productNameUI === productName )
            {
                console.log("Product found "+productNameUI);
                
                await this.page.locator("(//mat-card)["+i+"]//div[@class='mdc-card']//div[@class='basket-btn-container']/button[contains(@aria-label,'Add to Basket')]").click();
                console.log("Product added to basket successfully "+productNameUI);
                break;
            }

        }
        









    }











}