import asyncHandler from "express-async-handler";
import puppeteer from "puppeteer";

const takeScreenShot = asyncHandler(async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('https://instagram.com');
    const screenshotPath = 'screenshot.png';
  
    await page.screenshot({ path: screenshotPath });

    await browser.close();
  
    return screenshotPath;
});
export default takeScreenShot;
