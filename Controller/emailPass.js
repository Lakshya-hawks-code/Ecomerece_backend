import nodemailer from "nodemailer";
import asynchandler from "express-async-handler";

export let sendemail = asynchandler(async(data,req,res)=>
{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAIL_ID,  // generated ethernal user
          pass: process.env.MP,       // generated ethernal password
        },
      });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Hey 👻" <lakshyasharmahawkscode@gmail.com>', // sender address
          to: "lakshya.sharma9928@gmail.com", // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.html, // html body
        });
      
      
        console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Previous only aviable when sending through an ethernal account
        // console.log("Preview URL: %S",nodemailer.getTestMessageUrl(info));
        // Preview URL : https://ethernal.email/messageWa0....    
})

