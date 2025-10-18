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

    constructor(page:Page)
    {
        super(page);
        this.page=page;
        this.btnDismissPopup = page.getByRole('button', { name: 'Close Welcome Banner' })
        this.lnkAccount = page.getByRole('button', { name: 'Show/hide account menu' });
        this.lnkLogin = page.getByRole('menuitem', { name: 'Go to login page' });
        this.textbxUsername = page.locator("input#email");
        this.txtbxPassword = page.locator("input#password");   
        this.btnLogin = page.getByRole('button', { name: 'Login', exact: true });   
    }


    async loginToJuiceShop(url: string, username:string, password:string)
    {
        await this.page.goto(url);
        //await this.waitForLoad();
        await this.clickOnElement(this.btnDismissPopup);
        await this.clickOnElement(this.lnkAccount);
        await this.clickOnElement(this.lnkLogin);

        await this.fillInputValue(this.textbxUsername, username);
        await this.fillInputValue(this.txtbxPassword, password);
        await this.clickOnElement(this.btnLogin);
    }



}