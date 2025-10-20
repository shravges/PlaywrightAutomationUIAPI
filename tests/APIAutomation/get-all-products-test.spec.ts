import {test, expect} from '@playwright/test'

test.skip('Validate Get all products API', async ({request})=>{
        let response = await request.get('https://demo.owasp-juice.shop/rest/products/search?q=');
        let getAllProductsResponse = await response.json();

        console.log("All products received=" +getAllProductsResponse);      

        //validate status is success
        expect(getAllProductsResponse.status).toBe('success');
        //validate resposne code is 200
        expect(response.status()).toBe(200);

})


