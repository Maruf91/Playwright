// @ts-check
const { test, expect,request } = require('@playwright/test');
const loginPayload={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayload={orders: [{country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
let token;
let orderId;
test.beforeAll(async ()=>
{
    // Login API
    const apiContext=  await request.newContext();
    const loginResponse =await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload 
    
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson=await loginResponse.json();
    token=loginResponseJson.token;
    console.log("Token is:-> "+token);

    //Order API
    const orderResponse=await apiContext.post(" https://www.rahulshettyacademy.com/api/ecom/order/create-order",
    {

        data: orderPayload,
        headers: {
                    'Authorization':token,
                    'Content-Type':'application/json'
                 }
    })
    const orderResponseJson=await orderResponse.json();
    console.log(orderResponseJson);
    orderId=orderResponseJson.orders[0];
    console.log("Order id from order API is: "+orderId);

});


test('Client app login',async({page})=>{


    //Login API
    page.addInitScript(value =>{

        window.localStorage.setItem('token',value)

    },token);
    await page.goto("https://www.rahulshettyacademy.com/client/");
    const mail="anshika@gmail.com";
    const orderHeaderText="Thankyou for the order.";
    const expectedProductName="zara coat 3";
    //const products=page.locator("//div[@class='card-body']");
    // await page.goto("https://www.rahulshettyacademy.com/client");
    // await page.locator("//input[@id='userEmail']").type(mail);
    // await page.locator("//input[@id='userPassword']").type("Iamking@000")
    // await page.locator("//input[@id='login']").click();
    // await page.waitForLoadState('networkidle');

    //***************API Call*************/
    
    
    // const titlePage= await page.title();
    // console.log(titlePage);
    // await page.waitForLoadState('networkidle');
    
    // const count=await products.count();
    // console.log(count);
    // for(let i=0; i<count;i++){
      
    //   const prodName=await products.nth(i).locator("b").textContent();
    //   console.log(prodName);
    //   if(prodName===expectedProductName){
    //     await products.nth(i).locator("//button[contains(.,'Add')]").click();
    //     break;
    //   }
    // } 
    // await page.locator("[routerlink*='cart']").click();
    // //await page.locator("div li").waitFor();
    // const bool= page.locator("h3:has-text('zara coat 3')").isVisible();
    // expect(bool).toBeTruthy();
    // await page.locator("//button[contains(.,'Checkout')]").click();
    // //await page.locator("section[class*='ta-results']")
    // await page.locator("input[placeholder*='Country']").type("Ind",{delay:100});
    // const dropdown=page.locator("section[class*='ta-results']");
    // await dropdown.waitFor();
    // const optionCount=await dropdown.locator("button").count();
    // for(let i=0;i<optionCount;i++){
    //   const optionName=await dropdown.locator("button").nth(i).textContent();
    //   console.log(optionName);
    //   if(optionName === " India"){
  
    //     await dropdown.locator("button").nth(i).click();
    //     break;
  
    //   }
    // }
    
    // await expect(page.locator("//label[contains(.,'anshika')]")).toHaveText(mail);
    // await page.locator("//a[contains(.,'Place')]").click();
    // await page.locator("//h1").highlight();
    // await expect(page.locator("//h1")).toHaveText(orderHeaderText);
    // orderId=await page.locator("label[class*='ng']").textContent();

    await page.locator("button[routerlink*='myorder']").click();
    await page.locator("tbody").waitFor();
    const orderIdDisplayRows=page.locator("tbody tr");
    console.log("No of order: "+await orderIdDisplayRows.count());
     for (let i=0;i<await orderIdDisplayRows.count();i++){
        const rowOrderId=await orderIdDisplayRows.locator("th").nth(i).textContent();
        console.log("Order is diplaying on OrderPage: "+rowOrderId);
        
       if(orderId.includes(rowOrderId)){
        console.log("Order id is found on OrderPage");

       }
     }
     
  });