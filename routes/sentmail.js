import express from 'express';
const router=express.Router();

import nodemailer from 'nodemailer';
   export async function sentEmail(receiver){
    var receiver=receiver;
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'abhaysharmajr@gmail.com',
            pass:process.env.PASS
        }
    });
    
    var mailOptions={
        from:'abhaysharmajr@gmail.com',
        to:receiver,
        subject:'password change Email with Link',
        text:'Password sent to Abhay Sharma',
        html:'<p> You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=' + '">link</a> to reset your password</p>'
    }
    
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: '+ info.response);
        }
    })
}
router.post("/sent",async function(request,response){
    const data=request.body.email;
    console.log(data);
    const result=await sentEmail(data);

    response.send(result);
});

export const emailRouter=router;
