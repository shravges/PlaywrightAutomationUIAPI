import {test, expect} from '@playwright/test'

const basketData = {"ProductId":24,"BasketId":"6","quantity":1};

test.skip('Validate adding items to basket', async({request})=>{
       let response = await request.post('https://demo.owasp-juice.shop/api/BasketItems/', {
            headers:{
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjMsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJzaGlscGFzYXV0b21hdGlvbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjI0ODdkYzQxZThjNTVkNzZjNDJkNjE2MWQ2NDNlZDdmIiwicm9sZSI6ImN1c3RvbWVyIiwiZGVsdXhlVG9rZW4iOiIiLCJsYXN0TG9naW5JcCI6IjAuMC4wLjAiLCJwcm9maWxlSW1hZ2UiOiIvYXNzZXRzL3B1YmxpYy9pbWFnZXMvdXBsb2Fkcy9kZWZhdWx0LnN2ZyIsInRvdHBTZWNyZXQiOiIiLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNS0xMC0xOSAyMTo1MToxMi4xMDIgKzAwOjAwIiwidXBkYXRlZEF0IjoiMjAyNS0xMC0xOSAyMTo1MToxMi4xMDIgKzAwOjAwIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNzYwOTEwNjkyfQ.MNE_d4lyxsixXZJH01UivzxlCVJvvbv4L4IHJXYu0qaCqSf_5KmMuIFmLH4J_8-HEgUJXvpGXcqRPjPhUCo3s04kZXBlUfqXQQDBb6Fau_rP8PYreICW9YtKnjrcWHS-aIn4dCKzhhQfx-4x86C8UEoaBg3CEq6-NenEcKBiC-w'
            },
            data:{"ProductId":24,"BasketId":"6","quantity":1}
        });
     
        //validate response code to be 201
        expect(response.status()).toBe(200);

})