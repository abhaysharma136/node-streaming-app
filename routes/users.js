import express from 'express';
import { CreateUser, getUserByname } from './helper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router=express.Router();


async function genHashedpassword(password){
    const NO_OF_ROUND=10;
    const salt=await bcrypt.genSalt(NO_OF_ROUND);
    const hashedPassord=await bcrypt.hash(password,salt);
    console.log(salt,hashedPassord);
    return hashedPassord;
}

//Create User 
router.post("/signup", async function(request,response){
    const {username,password}=request.body;

    const UserFromDB=await getUserByname(username);
    console.log(UserFromDB);
    if(UserFromDB){
        response.status(400).send({message:"username allready exists"});
    }else if(password.length<8){
        response.send({message:"password must be atleast 8 characters"});
    }else{const hashedPassword=await genHashedpassword(password);
        console.log(hashedPassword);
        //db.movies.insertOne(data)
        const result=await CreateUser({
            username:username,
            password:hashedPassword,
        });
       
    
        response.send(result);
    }
    
});

router.post("/login", async function(request,response){
    const {username,password}=request.body;

    const UserFromDB=await getUserByname(username);
    console.log(UserFromDB);
    if(!UserFromDB){
        response.status(400).send({message:"Invalid Credentials"});
    }else
    {
       const storedpassword=UserFromDB.password;
       const isPasswordMatch=await bcrypt.compare(password,storedpassword);
       console.log(isPasswordMatch);
       if(isPasswordMatch){
        const token=jwt.sign({id:UserFromDB._id},process.env.SECRET_KEY);
        response.send({message:"Succesfull Login",token:token});
       }
       else{
        response.status(401).send({message:"Invalid Credentials"});
       }
    }
    
});

export const usersRouter=router;


