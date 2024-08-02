import asynchandler from "express-async-handler";
import puppeteer from "puppeteer";
import hbs from "express-handlebars";
import fs from  "fs";
import path from "path";
const generatePDF = asynchandler(async(req,res)=>
{
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const htmlContent = "<h1>my personal pdf</h1>";
    
    await page.setContent(htmlContent);

    await page.pdf
    ({
        path:'output.pdf',
        format:'A4',
        printBackground:true
    })

    await browser.close(); 
})

export default generatePDF