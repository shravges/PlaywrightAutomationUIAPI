import { Page, Locator} from "@playwright/test";

export class BasePage
{
    readonly page:Page;

    constructor(page:Page)
    {
        this.page=page;
    }

    async clickOnElement(locator:Locator): Promise<void>
    {
        await locator.click();
    }

    async clickOnElementBasedOnIndex(locator:Locator, indexValue:number)
    {
        await locator.nth(indexValue).click({force:true});
    }  

    async fillInputValue(locator:Locator, value:string): Promise<void>
    {
        await locator.fill(value, {force:true});
    }

    async fillInputValueOneByOne(locator:Locator, value:string)
    {
        await locator.pressSequentially(value);
    }

    async clearInputField(locator:Locator)
    {
        await locator.clear({force:true});
    }

    async pressGivenKey(locator:Locator, key:string)
    {
        await locator.press(key);
    }

    async waitForElement(locator:Locator)
    {
        await locator.waitFor();
    }

    async waitForElementFirstApperance(locator:Locator)
    {
        //await locator.nth(1).waitFor();
        await locator.nth(0).waitFor();
    }

    async waitForElementByIndexApperance(locator:Locator, indexNumber:number)
    {
        await locator.nth(indexNumber).waitFor();
    }

    async waitForElementWithTimeout(locator:Locator, timeoutNumber:number)
    {
        await locator.waitFor({timeout:timeoutNumber});
    }

    async checkElementVisible(locator:Locator):Promise<boolean>
    {
        return await locator.isVisible();
    }

    async waitForLoad()
    {
        await this.page.waitForLoadState('load');
    }

    async waitForNetworkCallExecution()
    {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForDOMContentLoaded()
    {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForGivenTimeout(timeoutNumber:number)
    {
        await this.page.waitForTimeout(timeoutNumber);
    }

    async waitForGivenURL(url:string)
    {
        await this.page.waitForURL(`**\/${url}`);
    }

    async getElementText(locator:Locator):Promise<string>
    {
        return (await locator.textContent() ?? "");
    }

    async getElementInnerText(locator:Locator):Promise<string>
    {
        return (await locator.innerText() ?? "");
    }

    async getElementCount(locator:Locator):Promise<number>
    {
        return await locator.count();
    }

}
