// @ts-check
const { test, expect } = require('@playwright/test');

test('window handle testing', async ({ browser }) => {
  const context=await browser.newContext();
  const page=await context.newPage();
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
  const documentLink=page.locator("a[class*='blinking']");
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await documentLink.click(),
  ]
  )
  const text= await newPage.locator("//p[contains(.,'Please')]").textContent();
  console.log(text); 
  const arrayText=text.split("@");
  console.log(arrayText);
  const domain=arrayText[1].split(" ")[0];
  console.log("Domain is: "+domain);
  await page.locator("//input[@id='username']").type(domain);
  //await page.pause();
  //console.log("the user name is: " +await page.locator("//input[@id='username']").textContent());
  
});
test('Client app login',async({page})=>{
  const mail="anshika@gmail.com";
  const orderHeaderText="Thankyou for the order.";
  const expectedProductName="zara coat 3";
  const products=page.locator("//div[@class='card-body']");
  await page.goto("https://www.rahulshettyacademy.com/client");
  await page.locator("//input[@id='userEmail']").type(mail);
  await page.locator("//input[@id='userPassword']").type("Iamking@000")
  await page.locator("//input[@id='login']").click();
  await page.waitForLoadState('networkidle');
  const titlePage= await page.title();
  console.log(titlePage);
  await page.waitForLoadState('networkidle');
  
  const count=await products.count();
  console.log(count);
  for(let i=0; i<count;i++){
    
    const prodName=await products.nth(i).locator("b").textContent();
    console.log(prodName);
    if(prodName===expectedProductName){
      await products.nth(i).locator("//button[contains(.,'Add')]").click();
      break;
    }
  } 
  await page.locator("[routerlink*='cart']").click();
  //await page.locator("div li").waitFor();
  const bool= page.locator("h3:has-text('zara coat 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("//button[contains(.,'Checkout')]").click();
  //await page.locator("section[class*='ta-results']")
  await page.locator("input[placeholder*='Country']").type("Ind",{delay:100});
  const dropdown=page.locator("section[class*='ta-results']");
  await dropdown.waitFor();
  const optionCount=await dropdown.locator("button").count();
  for(let i=0;i<optionCount;i++){
    const optionName=await dropdown.locator("button").nth(i).textContent();
    console.log(optionName);
    if(optionName === " India"){

      await dropdown.locator("button").nth(i).click();
      break;

    }
  }
  
  await expect(page.locator("//label[contains(.,'anshika')]")).toHaveText(mail);
  await page.locator("//a[contains(.,'Place')]").click();
  await page.locator("//h1").highlight();
  await expect(page.locator("//h1")).toHaveText(orderHeaderText);
  const orderId=await page.locator("label[class*='ng']").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorder']").click();
  page.locator("tbody").waitFor();
  const orderCount=await page.locator("tbody tr").count();
  console.log("No of order: "+orderCount);
  // for (let i=0;i<orderCount;i++){
  //   if()
  // }
});