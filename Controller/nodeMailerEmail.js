import nodemailer from "nodemailer";
import asynchandler from "express-async-handler";

export let nodemailerEmail = asynchandler(async(data,req,res)=>
{
    const transporter = nodemailer.createTransport
    ({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // by default start in a port 465 and other port bu default is false
        auth:
        {
            user:"lakshyasharmahawkscode@gmail.com",
            pass:" ijdenyvurxnlakln"
        } 
    })

    const info = await transporter.sendMail
    ({
        from: '"Fred Foo 👻" <lakshyasharmahawkscode@gmail.com>',
        to: data.to,
        subject:data.subject,
        text:data.text,
        html:data.html
    })

    console.log("Message sent: %s", info.messageId);
})