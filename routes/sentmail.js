import express from 'express';
import  jwt  from 'jsonwebtoken';
import nodemailer from 'nodemailer';


const router=express.Router();

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


//Sent Registration Email
export async function sentRegistrationEmail(receiver){
    var receiver=receiver;
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'abhaysharmajr@gmail.com',
            pass:process.env.PASS
        }
    });
    
    const token=jwt.sign({
        data:'Token Data'
    }, 'ourSecretKey',{expiresIn:'10m'}
    );


    var mailOptions={
        from:'abhaysharmajr@gmail.com',
        to:receiver,
        subject:'Onstream Registration Confirmation',
        text:`Hi! There, You have recently visited our website and entered your email. Please follow the given link to verify your email below.   http://localhost:5000/email/verify/${token} Thanks`,
        // html:"<p><a href=http://localhost:5000/email/verify/${token}></a></p>"
    }
    
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: '+ info.response);
        }
    })
}
router.post("/RegisterConfirmation",async function(request,response){
    const data=request.body.email;
    console.log(data);
    const result=await sentRegistrationEmail(data);

    response.send(result);
});

router.get('/verify/:token',async function(request,response){
    const {token}=request.params;

    //verifying the JWT token
    jwt.verify(token,'ourSecretKey',function(err,decoded){
        if(err){
            console.log(err);
            response.send("Email verification failed, possibly the link is invalid or expired");
        }
        else{
            console.log("email succesfully Registered")
            response.send("Email verified successfully");
        }
    });
});

export const emailRouter=router;
