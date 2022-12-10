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
test.only('Client app login',async({page})=>{
  const expectedProductName="zara coat 3";
  const products=page.locator("//div[@class='card-body']");
  await page.goto("https://www.rahulshettyacademy.com/client");
  await page.locator("//input[@id='userEmail']").type("anshika@gmail.com");
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
  
});